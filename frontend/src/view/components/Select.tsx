import * as RdxSelect from '@radix-ui/react-select';
import { ChevronDownIcon, ChevronUpIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { cn } from '../../app/utils/cn';
import { useState } from 'react';

interface SelectProps {
  className?: string;
  placeholder?: string;
  error?: string;
  options: {
    value: string
    label: string
  }[]
  onChange?(value: string): void;
  value?: string;
}

export function Select({ className, placeholder, error, options, onChange, value }: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(value ?? '')

  function handleSelect(value: string) {
    setSelectedValue(value)
    onChange?.(value)
  }

  return (
    <div>
      <div className="relative">
        <label
          className={cn(
            `absolute z-10 top-1/2 -translate-y-1/2 left-[13px] text-gray-700 pointer-events-none`,
            selectedValue && `text-xs top-2 transition-all translate-y-0`
          )}
        >
          {placeholder}
        </label>

        <RdxSelect.Root onValueChange={handleSelect} value={value}>
          <RdxSelect.Trigger
            className={cn(`w-full bg-white rounded-lg border border-gray-500
            px-3 h-[52px] text-gray-800 focus:border-gray-800
            transition-all outline-none text-left relative pt-4`,
              error && '!border-red-500',
              className
            )}
          >
            <RdxSelect.Value />

            <RdxSelect.Icon className="absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronDownIcon className="w-6 h-6 text-gray-800" />
            </RdxSelect.Icon>
          </RdxSelect.Trigger>



          <RdxSelect.Portal>
            <RdxSelect.Content className="z-[99] overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]">
              <RdxSelect.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default">
                <ChevronUpIcon />
              </RdxSelect.ScrollUpButton>

              <RdxSelect.Viewport className="p-2">
                {options.map(option => (
                  <RdxSelect.Item
                    key={option.value}
                    value={option.value}
                    className="p-2 text-gray-800 text-sm data-[state=checked]:font-bold
              outline-none data-[highlighted]:bg-gray-50 rounded-lg transition-colors"
                  >
                    <RdxSelect.ItemText>{option.label}</RdxSelect.ItemText>
                  </RdxSelect.Item>
                ))}
              </RdxSelect.Viewport>

              <RdxSelect.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default">
                <ChevronDownIcon />
              </RdxSelect.ScrollDownButton>
            </RdxSelect.Content>
          </RdxSelect.Portal>
        </RdxSelect.Root>
      </div>

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900 ">
          <CrossCircledIcon />

          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  )
}
