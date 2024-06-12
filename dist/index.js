'use strict';

var React = require('react');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}function clsx(){for(var e,t,f=0,n="";f<arguments.length;)(e=arguments[f++])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}

var defaultEvents = ['mousedown', 'touchstart'];
function useClickAway(ref, onClickAway, events) {
    if (events === void 0) { events = defaultEvents; }
    var savedCallback = React.useRef(onClickAway);
    React.useEffect(function () {
        savedCallback.current = onClickAway;
    }, [onClickAway]);
    React.useEffect(function () {
        function handler(event) {
            var el = ref.current;
            if (el && !el.contains(event.target)) {
                savedCallback.current(event);
            }
        }
        events.forEach(function (eventName) {
            document.addEventListener(eventName, handler);
        });
        return function () {
            events.forEach(function (eventName) {
                document.removeEventListener(eventName, handler);
            });
        };
    }, [events, ref]);
}

function getMenuPositionClassName(element) {
    var rect = element.getBoundingClientRect();
    var isBottomOverflow = rect.bottom > window.innerHeight && rect.top > rect.height;
    var isLeftOverflow = rect.left < 0;
    var isRightOverflow = rect.right > window.innerWidth;
    var isTopOverflow = rect.top < 0;
    var className = clsx({
        'rnd__menu--top': isBottomOverflow,
        'rnd__menu--bottom': isTopOverflow,
        'rnd__menu--right': isLeftOverflow,
        'rnd__menu--left': isRightOverflow,
    });
    return className;
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */

function isObject$2(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject$2;

/** Detect free variable `global` from Node.js. */

var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal$1;

var freeGlobal = _freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$2 = freeGlobal || freeSelf || Function('return this')();

var _root = root$2;

var root$1 = _root;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now$1 = function() {
  return root$1.Date.now();
};

var now_1 = now$1;

/** Used to match a single whitespace character. */

var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex$1(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

var _trimmedEndIndex = trimmedEndIndex$1;

var trimmedEndIndex = _trimmedEndIndex;

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim$1(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

var _baseTrim = baseTrim$1;

var root = _root;

/** Built-in value references. */
var Symbol$2 = root.Symbol;

var _Symbol = Symbol$2;

var Symbol$1 = _Symbol;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag$1(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

var _getRawTag = getRawTag$1;

/** Used for built-in method references. */

var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}

var _objectToString = objectToString$1;

var Symbol = _Symbol,
    getRawTag = _getRawTag,
    objectToString = _objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag$1(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

var _baseGetTag = baseGetTag$1;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */

function isObjectLike$1(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike$1;

var baseGetTag = _baseGetTag,
    isObjectLike = isObjectLike_1;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol$1(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

var isSymbol_1 = isSymbol$1;

var baseTrim = _baseTrim,
    isObject$1 = isObject_1,
    isSymbol = isSymbol_1;

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber$1(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject$1(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject$1(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var toNumber_1 = toNumber$1;

var isObject = isObject_1,
    now = now_1,
    toNumber = toNumber_1;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

var debounce_1 = debounce;

var _debounce = /*@__PURE__*/getDefaultExportFromCjs(debounce_1);

var Dropdown = function (_a) {
    var items = _a.items, _b = _a.containerWidth, containerWidth = _b === void 0 ? 300 : _b, onSelect = _a.onSelect, children = _a.children, className = _a.className, renderOption = _a.renderOption, _c = _a.closeOnScroll, closeOnScroll = _c === void 0 ? true : _c;
    var containerRef = React.useRef(null);
    var _d = React.useState(''), menuPositionClassName = _d[0], setMenuPositionClassName = _d[1];
    var _e = React.useState(false), dropdownIsOpen = _e[0], setDropdownOpen = _e[1];
    var toggleDropdown = React.useCallback(function () { return setDropdownOpen(function (state) { return !state; }); }, []);
    var closeDropdown = React.useCallback(function () { return setDropdownOpen(false); }, []);
    var childrenProps = React.useMemo(function () {
        return {
            isOpen: dropdownIsOpen,
            onClick: toggleDropdown,
        };
    }, [dropdownIsOpen, toggleDropdown]);
    var handleSelect = React.useCallback(function (item) {
        if (item.disabled) {
            return;
        }
        if (item.onSelect) {
            item.onSelect();
        }
        else if (item.value !== undefined && onSelect) {
            onSelect(item.value, item);
        }
        closeDropdown();
    }, [closeDropdown, onSelect]);
    useClickAway(containerRef, closeDropdown);
    var scrollListener = React.useCallback(function (e) {
        var _a;
        var el = e.target;
        if (!((_a = el === null || el === void 0 ? void 0 : el.classList) === null || _a === void 0 ? void 0 : _a.contains('rnd__menu'))) {
            closeDropdown();
        }
    }, [closeDropdown]);
    React.useEffect(function () {
        if (dropdownIsOpen && closeOnScroll) {
            document.addEventListener('scroll', scrollListener, true);
        }
        return function () {
            document.removeEventListener('scroll', scrollListener, true);
        };
    }, [dropdownIsOpen]);
    var rootMenuRef = React.useRef(null);
    React.useLayoutEffect(function () {
        if (dropdownIsOpen && rootMenuRef.current) {
            setMenuPositionClassName(getMenuPositionClassName(rootMenuRef.current));
        }
        return function () {
            if (dropdownIsOpen) {
                setMenuPositionClassName('');
            }
        };
    }, [dropdownIsOpen]);
    return (React.createElement("div", { className: clsx('rnd', className), ref: containerRef },
        children(childrenProps),
        dropdownIsOpen && (React.createElement("ul", { className: "rnd__root-menu rnd__menu ".concat(menuPositionClassName), style: { width: containerWidth }, ref: rootMenuRef }, items.map(function (item, index) { return (React.createElement(Option, __assign({ key: index, option: item, onSelect: handleSelect, renderOption: renderOption }, item))); })))));
};
var DefaultInput = function (_a) {
    var value = _a.value, mounted = _a.mounted, rest = __rest(_a, ["value", "mounted"]);
    var inputRef = React.useRef(null);
    React.useEffect(function () {
        if (mounted && inputRef.current) {
            setTimeout(function () {
                inputRef.current.focus();
            }, 10);
        }
    }, [mounted]);
    return (React.createElement("input", __assign({ style: {
            maxWidth: '100%',
        }, value: value }, rest, { ref: inputRef, type: "text", placeholder: "Search...", className: "rnd__search" })));
};
var Option = function (_a) {
    var _b;
    var option = _a.option, onSelect = _a.onSelect, renderOption = _a.renderOption, renderInput = _a.renderInput, _c = _a.debounce, debounce = _c === void 0 ? 100 : _c;
    var items = option.items;
    var hasSubmenu = !!items;
    var itemsContainerWidth = (_b = option.itemsContainerWidth) !== null && _b !== void 0 ? _b : 150;
    var _d = React.useState(''), menuPositionClassName = _d[0], setMenuPositionClassName = _d[1];
    var _e = React.useState(false), submenuIsOpen = _e[0], setSubmenuOpen = _e[1];
    var _f = React.useState(''), searchValue = _f[0], setSearchValue = _f[1];
    var handleClick = React.useCallback(function (e) {
        if (hasSubmenu)
            return;
        e.stopPropagation();
        onSelect(option);
    }, [hasSubmenu, onSelect, option]);
    var submenuRef = React.useRef(null);
    React.useEffect(function () {
        var submenuElement = submenuRef.current;
        var observer = new ResizeObserver(function (entries) {
            entries.forEach(function (entry) {
                var isHTMLElement = entry.target instanceof HTMLElement;
                if (isHTMLElement) {
                    setSubmenuOpen(entry.target.offsetWidth > 0);
                    setMenuPositionClassName(getMenuPositionClassName(entry.target));
                }
            });
        });
        if (submenuElement) {
            observer.observe(submenuElement);
        }
        return function () {
            if (submenuElement) {
                observer.unobserve(submenuElement);
            }
        };
    }, []);
    var iconAfter = hasSubmenu ? chevronNode : option.iconAfter;
    var _handleChange = function (value) {
        var _value = value.trim();
        setSearchValue(_value);
    };
    var debounceFn = React.useCallback(_debounce(_handleChange, debounce), []);
    var filteredList = React.useMemo(function () {
        var _a;
        return (_a = (searchValue
            ? items === null || items === void 0 ? void 0 : items.filter(function (item) {
                return item.label.trim().toLowerCase().includes(searchValue.trim().toLowerCase());
            })
            : items)) !== null && _a !== void 0 ? _a : [];
    }, [items, searchValue]);
    return (React.createElement("li", { className: clsx('rnd__option', option.className, {
            'rnd__option--disabled': option.disabled,
            'rnd__option--with-menu': hasSubmenu,
        }), onMouseDown: handleClick, onKeyUp: handleClick },
        hasSubmenu && (React.createElement("ul", { className: clsx("rnd__menu rnd__submenu ".concat(menuPositionClassName), {
                'rnd__submenu--opened': submenuIsOpen,
            }), ref: submenuRef, style: { width: itemsContainerWidth } },
            renderInput &&
                renderInput({ value: searchValue, onChange: function (e) { return debounceFn(e.currentTarget.value); }, mounted: submenuIsOpen }),
            filteredList.map(function (item, index) { return (React.createElement(Option, { key: index, option: item, onSelect: onSelect, renderOption: renderOption })); }))),
        renderOption && renderOption(option),
        !renderOption && (React.createElement(React.Fragment, null,
            option.iconBefore && (React.createElement("div", { className: "rnd__option-icon rnd__option-icon--left" }, option.iconBefore)),
            React.createElement("p", { className: "rnd__option-label" }, option.label),
            iconAfter && React.createElement("div", { className: "rnd__option-icon rnd__option-icon--right" }, iconAfter)))));
};
var chevronNode = (React.createElement("div", { style: {
        border: '5px solid currentColor',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        width: 0,
        height: 0,
    } }));

exports.DefaultInput = DefaultInput;
exports.Dropdown = Dropdown;
//# sourceMappingURL=index.js.map
