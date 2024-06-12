/// <reference types="react" />
import React from "react";
import { ReactElement, ReactNode, InputHTMLAttributes } from "react";
interface DropdownItem<TValue = undefined> {
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
}
interface DropdownProps<TValue> {
    items: DropdownItem<TValue>[];
    containerWidth?: number | string;
    onSelect?: (value: TValue, option: DropdownItem<TValue>) => void;
    children: (params: {
        onClick: () => void;
        isOpen: boolean;
    }) => ReactElement;
    className?: string;
    renderOption?: (option: DropdownItem<TValue>) => ReactNode;
    closeOnScroll?: boolean;
}
declare const Dropdown: <TValue>({ items, containerWidth, onSelect, children, className, renderOption, closeOnScroll }: DropdownProps<TValue>) => React.ReactElement;
declare const DefaultInput: ({ value, mounted, ...rest }: InputProps) => React.JSX.Element;
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    mounted?: boolean;
}
export { DropdownItem, DropdownProps, Dropdown, DefaultInput };
