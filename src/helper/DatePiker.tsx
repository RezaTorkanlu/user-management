'use client'

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { formatDate } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react'


const DatePiker = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
     <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? formatDate(date, "PPP") : "Select Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
  )
}

export default DatePiker