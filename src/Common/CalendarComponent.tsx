import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarComponent: React.FC<{ onClose: () => void, initialDate: Date | null }> = ({ onClose, initialDate }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(true);

  useEffect(() => {
    const now = new Date();
    setSelectedDate(now);

    // Setting start time to current time
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();
    setStartTime(`${currentHour}:${currentMinute}:${currentSecond}`);

    // Setting end time to 23:59:59 of the current date
    setEndTime('23:59:59');

    setIsDatePickerOpen(true); // Open date picker when component mounts
  }, []);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);

      // Setting start time to current time
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentSecond = now.getSeconds();
      setStartTime(`${currentHour}:${currentMinute}:${currentSecond}`);

      // Setting end time to 23:59:59 of the selected date
      setEndTime('23:59:59');
    }
    setIsDatePickerOpen(false);
    onClose()
  };

  return (
    <div className="calendar-modal">
      <DatePicker 
        selected={selectedDate} 
        onChange={handleDateChange} 
        dateFormat="yyyy/MM/dd"
        open={isDatePickerOpen}
        onClickOutside={() => setIsDatePickerOpen(false)} // Close on outside click
      />
      {selectedDate && (
        <div>
          <p>Selected Date: {selectedDate.toDateString()}</p>
          <p>Start Time: {startTime}</p>
          <p>End Time: {endTime}</p>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
