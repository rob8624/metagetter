"use client";
import * as React from "react";
import { useEffect } from "react";

import { CalendarIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { Calendar } from "../../ui/calendar";
import { Input } from "../../ui/input";

import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";


function formatDate(date) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date) {
  return !isNaN(date.getTime());
}

function toExifFormat(date) {
  if (!(date instanceof Date) || isNaN(date)) return "";

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  return `${yyyy}:${mm}:${dd} ${hh}:${min}:${ss}`;
}

export function Calendar28({
  placeholder,
  imageDate,
  props: { value: propsvalue, onChange, name, onBlur, ref },
}) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(new Date(imageDate));
  const [month, setMonth] = React.useState(new Date(imageDate));
  const [value, setValue] = React.useState(formatDate(date));
  const [originalTime, setOriginalTime] = React.useState(null);

  useEffect(() => {
    if (imageDate) {
      setOriginalTime(imageDate.split("T")[1]);
    }
    console.log(imageDate);
  }, [imageDate]);

  // const applyTime = (e) => {
  //   const userDate = new Date(e.target.value);
  //   const [hours, minutes, seconds] = originalTime.split(":").map(Number);
  //   userDate.setHours(hours, minutes, seconds, 0);

  //   if (isValidDate(userDate)) {
  //     setDate(userDate);
  //     setMonth(userDate);
  //     onChange(toExifFormat(userDate));
  //   }
  // };

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={value}
          propvalue={value}
          placeholder={placeholder}
          className="bg-background pr-10 dark:text-white"
        
        />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(selectedDate) => {
                if (selectedDate && originalTime) {
                  const [h, m, s] = originalTime.split(":").map(Number);
                  selectedDate.setHours(h, m, s, 0);
                  if (isValidDate(selectedDate)) {
                  setDate(selectedDate);
                  setValue(formatDate(selectedDate));
                  setMonth(selectedDate);
                  onChange(toExifFormat(selectedDate))
                };
                }
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
