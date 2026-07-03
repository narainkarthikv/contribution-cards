import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterDropdownOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  ariaLabel: string;
  listboxLabel: string;
  options: FilterDropdownOption[];
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  prefixPlaceholder?: string;
  className?: string;
  menuClassName?: string;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = React.memo(
  ({
    ariaLabel,
    listboxLabel,
    options,
    value,
    onChange,
    prefix,
    prefixPlaceholder,
    className,
    menuClassName,
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
    const listboxId = useId();

    const selectedIndex = options.findIndex((option) => option.value === value);
    const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : options[0];

    const closeDropdown = useCallback(() => {
      setIsOpen(false);
      triggerRef.current?.focus();
    }, []);

    const moveOptionFocus = useCallback(
      (nextIndex: number) => {
        const optionCount = options.length;
        if (!optionCount) return;
        const normalizedIndex = (nextIndex + optionCount) % optionCount;
        optionRefs.current[normalizedIndex]?.focus();
      },
      [options.length]
    );

    const selectOption = useCallback(
      (nextValue: string) => {
        onChange(nextValue);
        closeDropdown();
      },
      [closeDropdown, onChange]
    );

    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    useEffect(() => {
      if (!isOpen) return;
      const focusIndex = selectedIndex >= 0 ? selectedIndex : 0;
      optionRefs.current[focusIndex]?.focus();
    }, [isOpen, selectedIndex]);

    const handleTriggerKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>) => {
        switch (event.key) {
          case 'ArrowDown':
          case 'ArrowUp':
          case 'Enter':
          case ' ':
            event.preventDefault();
            setIsOpen(true);
            break;
          case 'Escape':
            if (isOpen) {
              event.preventDefault();
              closeDropdown();
            }
            break;
        }
      },
      [closeDropdown, isOpen]
    );

    const handleOptionKeyDown = useCallback(
      (
        event: React.KeyboardEvent<HTMLButtonElement>,
        index: number,
        optionValue: string
      ) => {
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            moveOptionFocus(index + 1);
            break;
          case 'ArrowUp':
            event.preventDefault();
            moveOptionFocus(index - 1);
            break;
          case 'Home':
            event.preventDefault();
            moveOptionFocus(0);
            break;
          case 'End':
            event.preventDefault();
            moveOptionFocus(options.length - 1);
            break;
          case 'Enter':
          case ' ':
            event.preventDefault();
            selectOption(optionValue);
            break;
          case 'Escape':
            event.preventDefault();
            closeDropdown();
            break;
          case 'Tab':
            setIsOpen(false);
            break;
        }
      },
      [closeDropdown, moveOptionFocus, options.length, selectOption]
    );

    return (
      <div
        className={`relative w-full sm:w-auto ${className ?? ''}`.trim()}
        ref={dropdownRef}>
        <button
          ref={triggerRef}
          type='button'
          onClick={() => setIsOpen((previous) => !previous)}
          onKeyDown={handleTriggerKeyDown}
          aria-label={ariaLabel}
          aria-expanded={isOpen}
          aria-haspopup='listbox'
          aria-controls={listboxId}
          className='group flex h-10 w-full items-center justify-between gap-3 rounded-md border border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] px-4 py-0 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--color-action-default)_35%,var(--color-border-primary))] hover:bg-[color-mix(in_srgb,var(--color-surface-secondary)_85%,var(--color-action-default)_15%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-default)] sm:min-w-56'>
          <span className='flex min-w-0 items-center gap-2'>
            {prefix || prefixPlaceholder ? (
              <span
                className={`hidden text-xs sm:inline ${
                  prefix
                    ? 'text-[var(--color-text-secondary)]'
                    : 'pointer-events-none select-none text-transparent'
                }`}>
                {prefix ?? prefixPlaceholder}
              </span>
            ) : null}
            <span className='truncate font-semibold text-[var(--color-text-primary)]'>
              {selectedOption?.label ?? ''}
            </span>
          </span>
          <ChevronDown
            size={16}
            className={`flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <ul
            id={listboxId}
            role='listbox'
            aria-label={listboxLabel}
            className={`absolute left-0 top-full z-50 mt-2 max-h-72 w-full overflow-y-auto rounded-md border border-[var(--color-border-primary)] bg-[var(--color-surface-primary)] p-1 shadow-2xl shadow-black/30 sm:min-w-56 ${menuClassName ?? ''}`.trim()}>
            {options.map((option, index) => {
              const isSelected = option.value === value;
              return (
                <li key={option.value} role='option' aria-selected={isSelected}>
                  <button
                    ref={(node) => {
                      optionRefs.current[index] = node;
                    }}
                    type='button'
                    onClick={() => selectOption(option.value)}
                    onKeyDown={(event) =>
                      handleOptionKeyDown(event, index, option.value)
                    }
                    className={`flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-default)] ${
                      isSelected
                        ? 'bg-[color-mix(in_srgb,var(--color-action-default)_12%,transparent_88%)] text-[var(--color-action-default)]'
                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]'
                    }`}>
                    <span
                      className={`inline-flex w-4 justify-center ${
                        isSelected
                          ? 'text-[var(--color-action-default)]'
                          : 'text-transparent'
                      }`}
                      aria-hidden='true'>
                      &#10003;
                    </span>
                    <span className='truncate'>{option.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
);

FilterDropdown.displayName = 'FilterDropdown';
