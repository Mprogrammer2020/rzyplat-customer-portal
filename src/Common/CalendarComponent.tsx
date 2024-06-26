import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
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
    setStartTime(`${currentHour}:${currentMinute}`);

    // Setting end time to 23:59:59 of the current date
    setEndTime('23:59');

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
      setStartTime(`${currentHour}:${currentMinute}`);

      // Setting end time to 23:59:59 of the selected date
      setEndTime('23:59:59');
    }
   
    
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
        <div className='under-date'>
          {/* <p className='selected-date-time'>Selected Date: <span>{selectedDate.toDateString()}</span></p> */}
          <p className='selected-date-time position-relative me-2'>
            <img src={require("../assets/images/up-icon.svg").default} className="up-icon" alt="icons" />
            <span>{startTime}</span>
            <img src={require("../assets/images/up-icon.svg").default} className="down-icon" alt="icons" />
          </p> -
          <p className='selected-date-time position-relative ms-2'>
            <img src={require("../assets/images/up-icon.svg").default} className="up-icon" alt="icons" />
            <span>{endTime}</span>
            <img src={require("../assets/images/up-icon.svg").default} className="down-icon" alt="icons" />
          </p>
        </div>
        <Button className='apply-btn' onClick={(e) => {onClose(); setIsDatePickerOpen(false);}}>APPLY</Button>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
