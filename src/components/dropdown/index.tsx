import clsx from 'clsx';
import React, {
  ReactElement,
  ReactNode,
  UIEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  InputHTMLAttributes,
} from 'react';
import { useClickAway } from '~/hooks/use-click-away';
import { getMenuPositionClassName } from './utils';
import _debounce from 'lodash/debounce';

export interface DropdownItem<TValue = undefined> {
  label: string;
  iconBefore?: ReactNode;
  iconAfter?: ReactNode;
  items?: DropdownItem<TValue>[];
  itemsContainerWidth?: number | string;
  value?: TValue;
  onSelect?: () => void;
  disabled?: boolean;
  className?: string;
  selected?: boolean;
  renderInput?: (props: InputProps) => React.ReactNode;
  debounce?: number;
  maxHeight?: number;
}

export interface DropdownProps<TValue> {
  items: DropdownItem<TValue>[];
  containerWidth?: number | string;
  onSelect?: (value: TValue, option: DropdownItem<TValue>) => void;
  children: (params: { onClick: () => void; isOpen: boolean }) => ReactElement;
  className?: string;
  renderOption?: (option: DropdownItem<TValue>) => ReactNode;
  closeOnScroll?: boolean;
  closeOnSelect?: boolean;
  maxHeight?: number;
}

export const Dropdown = <TValue,>({
  items,
  containerWidth = 300,
  onSelect,
  children,
  className,
  renderOption,
  closeOnScroll = true,
  closeOnSelect = true,
  maxHeight,
}: DropdownProps<TValue>): React.ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [menuPositionClassName, setMenuPositionClassName] = useState<string>('');
  const [dropdownIsOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = useCallback(() => setDropdownOpen(state => !state), []);
  const closeDropdown = useCallback(() => setDropdownOpen(false), []);

  const childrenProps = useMemo(() => {
    return {
      isOpen: dropdownIsOpen,
      onClick: toggleDropdown,
    };
  }, [dropdownIsOpen, toggleDropdown]);

  const handleSelect = useCallback(
    (item: DropdownItem<TValue>) => {
      if (item.disabled) {
        return;
      }

      if (item.onSelect) {
        item.onSelect();
      } else if (item.value !== undefined && onSelect) {
        onSelect(item.value, item);
      }
      if (closeOnSelect) {
        closeDropdown();
      }
    },
    [closeDropdown, onSelect, closeOnSelect],
  );

  useClickAway(containerRef, closeDropdown);

  const scrollListener = useCallback(
    (e: Event) => {
      const el = e.target as HTMLElement | null;
      if (!el?.classList?.contains('rnd__menu')) {
        closeDropdown();
      }
    },
    [closeDropdown],
  );

  useEffect(() => {
    if (dropdownIsOpen && closeOnScroll) {
      document.addEventListener('scroll', scrollListener, true);
    }
    return () => {
      document.removeEventListener('scroll', scrollListener, true);
    };
  }, [dropdownIsOpen]);

  const rootMenuRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    if (dropdownIsOpen && rootMenuRef.current) {
      setMenuPositionClassName(getMenuPositionClassName(rootMenuRef.current));
    }
    return () => {
      if (dropdownIsOpen) {
        setMenuPositionClassName('');
      }
    };
  }, [dropdownIsOpen]);

  return (
    <div className={clsx('rnd', className)} ref={containerRef}>
      {children(childrenProps)}
      {dropdownIsOpen && (
        <ul
          className={`rnd__root-menu rnd__menu ${menuPositionClassName}`}
          ref={rootMenuRef}
          style={{ minWidth: containerWidth }}
        >
          {items.map((item, index) => (
            <Option
              maxHeight={maxHeight}
              {...item}
              key={index}
              option={item}
              onSelect={handleSelect}
              renderOption={renderOption}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export const DefaultInput = ({ value, mounted, ...rest }: InputProps) => {
  return (
    <input
      style={{
        maxWidth: '100%',
      }}
      value={value}
      {...rest}
      type="text"
      placeholder="Search..."
      className="rnd__search"
      autoFocus
    />
  );
};

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  mounted?: boolean;
}

interface OptionProps<TValue> {
  option: DropdownItem<TValue>;
  onSelect: (item: DropdownItem<TValue>) => void;
  renderOption?: (option: DropdownItem<TValue>) => React.ReactNode;
  renderInput?: (props: InputProps) => React.ReactNode;
  debounce?: number;
  maxHeight?: number;
  closeDebounce?: number;
}

const Option = <TValue,>({
  option,
  onSelect,
  renderOption,
  renderInput,
  debounce = 100,
  maxHeight = undefined,
  closeDebounce = 1000,
}: OptionProps<TValue>): React.ReactElement => {
  const items = option.items;
  const hasSubmenu = items && items.length > 0;
  const itemsContainerWidth = option.itemsContainerWidth ?? 150;
  const [menuPositionClassName, setMenuPositionClassName] = useState<string>('');
  const [submenuIsOpen, setSubmenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [, setRenderTrigger] = useState(false);

  const filteredList = useMemo(
    () =>
      (searchValue
        ? items?.filter(item =>
            item.label.trim().toLowerCase().includes(searchValue.trim().toLowerCase()),
          )
        : items) ?? [],
    [items, searchValue],
  );

  const handleClick = useCallback(
    (e: UIEvent) => {
      if (hasSubmenu) return;

      e.stopPropagation();
      onSelect(option);
      setSearchValue('');
    },
    [hasSubmenu, onSelect, option],
  );

  const submenuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!submenuIsOpen && searchValue) {
      setSearchValue('');
    }
  }, [submenuIsOpen]);

  useEffect(() => {
    const submenuElement = submenuRef.current;

    const observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const isHTMLElement = entry.target instanceof HTMLElement;
        if (isHTMLElement) {
          setSubmenuOpen(entry.target.offsetWidth > 0);
          setMenuPositionClassName(getMenuPositionClassName(entry.target));
        }
      });
    });

    if (submenuElement) {
      observer.observe(submenuElement);
    }

    return () => {
      if (submenuElement) {
        observer.unobserve(submenuElement);
      }
    };
  }, []);

  const iconAfter = option.iconAfter ? option.iconAfter : hasSubmenu ? chevronNode : null;

  const _handleChange = (value: string) => {
    setSearchValue(value);
    debounceFilter();
  };

  const removeHoverClassTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (element: HTMLElement) => {
    const alreadyHoveredElements =
      element?.parentElement?.querySelectorAll('.rnd__option--hover') ?? [];

    const input = element.querySelector('.rnd__search') as HTMLInputElement | null;

    if (input) {
      setTimeout(() => {
        try {
          input.focus();
        } catch {}
      }, 25);
    }

    alreadyHoveredElements.forEach(el => {
      if (el !== element) {
        el.classList.remove('rnd__option--hover');
      }
    });

    if (removeHoverClassTimeoutRef.current) {
      clearTimeout(removeHoverClassTimeoutRef.current);
      removeHoverClassTimeoutRef.current = null;
    }
    element.classList.add('rnd__option--hover');
  };

  const handleMouseLeave = (element: HTMLElement) => {
    removeHoverClassTimeoutRef.current = setTimeout(() => {
      element.classList.remove('rnd__option--hover');
    }, closeDebounce);
  };

  const debounceFilter = useMemo(
    () => _debounce(() => setRenderTrigger(prev => !prev), debounce),
    [debounce],
  );

  const maxHeightStyle = useMemo(() => {
    if (!maxHeight) {
      return {};
    }

    return { maxHeight: `${maxHeight}px`, overflowY: 'auto' } as any;
  }, [maxHeight]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        setSubmenuOpen(false);
        setSearchValue('');
      }

      if (hasSubmenu) {
        return;
      }

      if (e.key === 'Enter' || e.key === 'NumpadEnter' || e.which === 13) {
        if (filteredList.length) {
          onSelect(filteredList[0]);
          setSearchValue('');
        }
      }
    },
    [filteredList, onSelect],
  );

  return (
    <li
      className={clsx('rnd__option', option.className, {
        'rnd__option--disabled': option.disabled,
        'rnd__option--with-menu': hasSubmenu,
      })}
      onMouseEnter={e => {
        handleMouseEnter(e.currentTarget);
      }}
      onMouseLeave={e => {
        handleMouseLeave(e.currentTarget);
      }}
      onMouseDown={handleClick}
      onKeyUp={handleClick}
    >
      {hasSubmenu && (
        <ul
          className={clsx(`rnd__menu rnd__submenu ${menuPositionClassName}`, {
            'rnd__submenu--opened': submenuIsOpen,
          })}
          ref={submenuRef}
          style={{ ...maxHeightStyle }}
        >
          {renderInput &&
            renderInput({
              value: searchValue,
              onChange: e => _handleChange(e.currentTarget.value),
              onKeyDown: handleKeyDown,
              mounted: submenuIsOpen,
            })}

          {filteredList.map((item, index) => (
            <Option
              key={`${item.label}_${index}`}
              option={item}
              onSelect={onSelect}
              renderOption={renderOption}
              renderInput={renderInput}
            />
          ))}
        </ul>
      )}
      {renderOption && renderOption(option)}
      {!renderOption && (
        <>
          {option.iconBefore && (
            <div className="rnd__option-icon rnd__option-icon--left">{option.iconBefore}</div>
          )}
          <p
            style={{
              width: itemsContainerWidth,
            }}
            className="rnd__option-label"
          >
            {option.label}
          </p>
          {iconAfter && <div className="rnd__option-icon rnd__option-icon--right">{iconAfter}</div>}
        </>
      )}
    </li>
  );
};

const chevronNode = (
  <div
    style={{
      border: '5px solid currentColor',
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      borderTopColor: 'transparent',
      width: 0,
      height: 0,
    }}
  />
);
