import React, { useState } from 'react';
import './App.css';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [date, setDate] = useState(new Date());
 
  const addEvent = (event) => {
     setEvents([...events, event]);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay(); 
  };

  const renderDays = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(date);
    const firstDayOfMonth = getFirstDayOfMonth(date);
  
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="calendar-cell empty">
          <div className="calendar-day empty"></div>
          <div className="events-list"></div>
        </div>
      );
    }
  
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = events.filter(
        (event) =>
          event.date === `${date.getFullYear()}-${date.getMonth() + 1}-${day}`
      );
      
      
      days.push(
        <div key={day} className="calendar-cell">
          <div className="calendar-day" onClick={() => handleDateClick(day)}>
            {day}
          </div>
          <div className="events-list">
            {dayEvents.length > 0 && (
              dayEvents.map((event, index) => (
                <div key={index} className="event">
                  {event.title}
                </div>
              ))
            )}
          </div>
        </div>
      );
    }
  
    return days;
  };
  
  

  const handlePrevMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() - 1);
    setDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + 1);
    setDate(newDate);
  };

  const handleDateClick = (day) => {
    setNewEvent({
      ...newEvent,
      date: `${date.getFullYear()}-${date.getMonth() + 1}-${day}`,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
 };

 const handleAddEvent = () => {
  const { title, date } = newEvent;
  const dateObj = new Date(date);

  if (title && dateObj) {
    setEvents([...events, { title, date }]);
    setNewEvent({ title: '', date: '' });
  }
};


  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h1>
          {date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}
        </h1>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">{renderDays()}</div>
      <div className="event-form">
        <h2>Add Event</h2>
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          value={newEvent.date}
          onChange={handleChange}
        />
        <button onClick={handleAddEvent}>Add Event</button>
      </div>
    </div>
  );
};

export default Calendar;
