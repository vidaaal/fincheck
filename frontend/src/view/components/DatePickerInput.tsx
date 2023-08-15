import { CrossCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { cn } from "../../app/utils/cn";
import { formatDate } from "../../app/utils/formatDate";
import { DatePicker } from "./DatePicker";
import { Popover } from "./Popover";

interface DatePickerInputInputProps {
  error?: string;
  className?: string
  onChange?(date: Date): void
  value?: Date
}

export function DatePickerInput({ className, error, onChange, value }: DatePickerInputInputProps) {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date())

  function handleDateChange(date: Date) {
    setSelectedDate(date)
    onChange?.(date)
  }

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button
            type="button"
            className={cn(`w-full bg-white rounded-lg border border-gray-500
            px-3 h-[52px] text-gray-700 focus:border-gray-800
            transition-all outline-none text-left relative pt-4`,
              error && '!border-red-900',
              className
            )}
          >
            <span className="absolute text-gray-700 text-xs left-[13px] top-2 pointer-events-none">
              Data
            </span>

            <span>
              {formatDate(selectedDate)}
            </span>
          </button>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
          />
        </Popover.Content>

      </Popover.Root>

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900 ">
          <CrossCircledIcon />

          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  )
}
