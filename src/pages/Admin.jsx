import React, { useState, useEffect } from 'react';
import { getEvents, createEvent, deleteEvent } from '../services/EventService';
import './css/Admin.css';

const Admin = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '', image: null });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const res = await getEvents();
    setEvents(res.data);
  };

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setNewEvent({ ...newEvent, image: e.target.files[0] });
  };

  const addEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newEvent.title);
    formData.append('date', newEvent.date);
    formData.append('description', newEvent.description);
    if (newEvent.image) formData.append('image', newEvent.image);

    await createEvent(formData);
    setNewEvent({ title: '', date: '', description: '', image: null });
    loadEvents();
  };

  const removeEvent = async (id) => {
    await deleteEvent(id);
    loadEvents();
  };

  return (
    <div className="admin-container">
      <h1>Admin - Manage Events</h1>
      <form onSubmit={addEvent} className="event-form">
        <input type="text" name="title" placeholder="Title" value={newEvent.title} onChange={handleChange} />
        <input type="date" name="date" value={newEvent.date} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={newEvent.description} onChange={handleChange}></textarea>
        <input  type="file" onChange={handleImage} />
        <button type="submit">Add Event</button>
      </form>

      <table className="events-table">
        <thead>
          <tr>
            <th>Image</th><th>Title</th><th>Date</th><th>Description</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(ev => (
            <tr key={ev._id}>
              <td><img src={ev.mainImage} alt={ev.title} className="thumb" /></td>
              <td>
                <img src={ev.image1} alt="" />
                <img src={ev.image2} alt="" />
                <img src={ev.image3} alt="" />
              </td>
              <td>{ev.title}</td>
              <td>{ev.date}</td>
              <td>{ev.description}</td>
              <td>
                <button onClick={() => removeEvent(ev._id)}>🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
