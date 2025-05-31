"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDate } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

type DatePikerProps = {
  onChange?: (date: Date) => void;
  selectedDate?: Date | undefined;
};

const DatePiker = ({ onChange, selectedDate }: DatePikerProps) => {
  const [date, setDate] = useState<Date | undefined>(selectedDate);
  
  const handleDateChange = (newDate: Date|undefined) => {
    setDate(newDate);
    if (newDate) {
      onChange?.(newDate);
    }
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? formatDate(date , "P") : "Select Date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePiker;
