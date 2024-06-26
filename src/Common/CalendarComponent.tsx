import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarComponent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');

  console.log("--------------------")

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const now = new Date();
      setSelectedDate(date);

      // Setting start time to current time
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentSecond = now.getSeconds();
      setStartTime(`${currentHour}:${currentMinute}:${currentSecond}`);

      // Setting end time to 23:59:59 of the selected date
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      setEndTime('23:59:59');
    }
  };

  return (
    <div className="calendar-modal">
      <button className="close-button" onClick={onClose}>Close</button>
      <h2>Select a date</h2>
      <DatePicker 
        selected={selectedDate} 
        onChange={handleDateChange} 
        dateFormat="yyyy/MM/dd" 
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
