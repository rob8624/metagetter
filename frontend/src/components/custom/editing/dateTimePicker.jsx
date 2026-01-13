"use client"
import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "../../ui/button"
import { Calendar } from "../../ui/calendar"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../ui/popover"


 /**
 * DatePicker component for selecting date and time for an image.
 *
 * @param {Object} props - Component props
 * @param {string} props.imageDate - Initial date in ISO format (YYYY-MM-DDTHH:MM:SS), used to pre-fill the picker
 * @param {string} [props.value] - Current value of the field (from RHF)
 * @param {Function} [props.onChange] - Function to call when date/time changes (from RHF field)
 * @param {Function} [props.onBlur] - Function to call when field loses focus (from RHF field)
 * @param {string} [props.name] - Field name in RHF
 * @param {boolean} [props.disabled] - Optional, disables input while saving or pending
 */



export function DatePicker({ imageDate, props }) {
  const { onChange } = props;

  /** @type {boolean} - Whether the date picker popover is currently open */
  const [open, setOpen] = React.useState(false);

  /** @type {string} - Currently selected date in ISO format (YYYY-MM-DD) */
  const [date, setDate] = React.useState("");

  /** @type {string} - Currently selected time in HH:MM:SS format */
  const [time, setTime] = React.useState("");

  
  
  
  
  /**
 * Initialize the date and time state from the `imageDate` prop on first render
 * or whenever `imageDate` changes.
 *
 * Splits the ISO string `YYYY-MM-DDTHH:MM:SS` into:
 *   - `initialDate` (YYYY-MM-DD)
 *   - `initialTime` (HH:MM:SS)
 *
 * Then updates the `date` and `time` state so the picker is pre-filled.
 */
React.useEffect(() => {
  if (!imageDate) return;

  const [initialDate, initialTime] = imageDate.split("T");
  setDate(initialDate);
  setTime(initialTime);
}, [imageDate]);

  

  

/**
   * Updates local state and notifies RHF / backend with EXIF-formatted datetime
   *
   * @param {string} newDate - Date in YYYY-MM-DD format
   * @param {string} newTime - Time in HH:MM:SS format
   */
  const updateRHF = (newDate, newTime) => {
  setDate(newDate);
  setTime(newTime);

  // Converts to EXIF format for backend
  const [year, month, day] = newDate.split("-");
  const [hour, minute, second] = newTime.split(":");
  const exifFormatted = `${year}:${month}:${day} ${hour}:${minute}:${second}`;
  onChange(exifFormatted); // send to RHF / backend in correct format
};

  return (
    <div className="flex gap-4">
      {/* Date picker */}
      <div className="flex flex-col gap-3">
        <Label htmlFor="date-picker" className="px-1">Date</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-32 justify-between font-normal"
            >
              {date ? date : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date ? new Date(date) : undefined}
              captionLayout="dropdown"
              onSelect={(selectedDate) => {
                if (!selectedDate) return
                // Keep the original time when updating the date
                const newDate = selectedDate.toISOString().split("T")[0];
                updateRHF(newDate, time);
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Time picker */}
      <div className="flex flex-col gap-3">
        <Label htmlFor="time-picker" className="px-1">Time</Label>
        <Input
          type="time"
          id="time-picker"
          step="1"
          value={time}
          onChange={(e) => updateRHF(date, e.target.value)}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  )
}