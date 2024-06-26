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
    if (initialDate) {
      setSelectedDate(initialDate);
      // Setting start time to 00:00:00 of the initial date
      setStartTime('00:00');
      // Setting end time to 23:59:59 of the initial date
      setEndTime('23:59');
    } else {
      const now = new Date();
      setSelectedDate(now);
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      setStartTime(`${currentHour}:${currentMinute}`);
      setEndTime('23:59');
    }

    setIsDatePickerOpen(true); // Open date picker when component mounts
  }, [initialDate]);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      setStartTime(`${currentHour}:${currentMinute}`);
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
        onClickOutside={() => {setIsDatePickerOpen(false); onClose()}} // Close on outside click
      />
      {selectedDate && (
        <div>
          <div className='under-date'>
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
          <Button className='apply-btn' onClick={() => { onClose(); setIsDatePickerOpen(false); }}>APPLY</Button>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
