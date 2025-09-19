import React, { useState, useEffect } from 'react';
import './css/Admin.css';
import { useNews } from '../hooks/useNews';

const Admin = () => {
  const [events, setEvents] = useState([]);
  const [imagePreviews, setImagePreviews] = useState({});
  const [expandedRows, setExpandedRows] = useState({});
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    description: '',
    mainImage: null,
    image1: null,
    image2: null,
    image3: null,
  });

  const {
    createNews,
    fetchNews,
    deleteNews, 
    loading,
    creating,
    news
  } = useNews();

  // Fetch news when component mounts
  useEffect(() => {
    fetchNews();
  }, []);

  // Keep local events list synced with news from the hook
  useEffect(() => {
    setEvents(news);
  }, [news]);

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {
      setNewEvent((prev) => ({ ...prev, [name]: file }));
      setImagePreviews((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
    }
  };


  const addEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newEvent.title);
    formData.append('date', newEvent.date);
    formData.append('description', newEvent.description);
    if (newEvent.mainImage) formData.append('mainImage', newEvent.mainImage);
    if (newEvent.image1) formData.append('image1', newEvent.image1);
    if (newEvent.image2) formData.append('image2', newEvent.image2);
    if (newEvent.image3) formData.append('image3', newEvent.image3);

    await createNews(formData);
    setNewEvent({ title: '', date: '', description: '', mainImage: null, image1: null, image2: null, image3: null, });
    fetchNews();
  };

  const removeEvent = async (id) => {
    await deleteNews(id);
    fetchNews();
  };



  const toggleExpand = (id, field) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: !prev[id]?.[field],
      },
    }));
  };

  const truncate = (text, length) => {
    if (!text) return '';
    return text.length > length ? text.slice(0, length) + '...' : text;
  };

  return (
    <div className="admin-container">
      <h1>Admin - Manage Events</h1>

      <form onSubmit={addEvent} className="event-form">
        <div>
          <label htmlFor="title">**Title</label>
          <input
          required
          type="text"
          name="title"
          placeholder="Title"
          value={newEvent.title}
          onChange={handleChange}
        />
        </div>
        <div>
          <label htmlFor="date">**Date</label>
          <input
          type="date"
          name="date"
          value={newEvent.date}
          onChange={handleChange}
          required
        />
        </div>
        <div>
          <label htmlFor="description">**Description</label>
          <textarea
          name="description"
          placeholder="Description"
          value={newEvent.description}
          onChange={handleChange}
          required
        ></textarea>
        </div>
        <div>
          <label htmlFor="mainImage">**Main Image</label>
          <input
            name="mainImage"
            type="file"
            accept="image/*"
            onChange={handleImage}
            required
          />
        </div>
        <div className="preview-row">
          {imagePreviews.mainImage && <img src={imagePreviews.mainImage} alt='mainImage' className="preview" />}
          {imagePreviews.image1 && <img src={imagePreviews.image1} alt='image1' className="preview" />}
          {imagePreviews.image2 && <img src={imagePreviews.image2} alt='image2' className="preview" />}
          {imagePreviews.image3 && <img src={imagePreviews.image3} alt='image3' className="preview" />}
        </div>

        <div>
          <label htmlFor="image1">Image 1</label>
          <input name="image1" type="file" accept="image/*" onChange={handleImage} required />
        </div>
        <div>
          <label htmlFor="image2">Image 2</label>
          <input name="image2" type="file" accept="image/*" onChange={handleImage} required />
        </div>
        <div>
          <label htmlFor="image3">Image 3</label>
          <input name="image3" type="file" accept="image/*" onChange={handleImage} required />
        </div>
        <button disabled={creating} type="submit">
          {creating ? 'Adding Event...' : 'Add Event'}
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="events-table">
          <thead>
            <tr>
              <th>Main Image</th>
              <th>Title</th>
              <th>Date</th>
              <th>Description</th>
              <th>Extra Images</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev) => (
              <tr key={ev._id}>
                <td>
                  <img src={ev.mainImage} alt={ev.title} className="thumb" />
                </td>
                <td>
                  {expandedRows[ev._id]?.title ? ev.title : truncate(ev.title, 20)}
                  {ev?.title && ev.title.length > 20 && (
                    <span
                      className="read-more"
                      onClick={() => toggleExpand(ev._id, 'title')}
                    >
                      {expandedRows[ev._id]?.title ? ' Show less' : ' Show more'}
                    </span>
                  )}
                </td>
                <td>{new Date(ev.date).toLocaleDateString()}</td>
                <td>
                  {expandedRows[ev._id]?.description ? ev.description : truncate(ev.description, 50)}
                  {ev?.description && ev.description.length > 50 && (
                    <span
                      className="read-more"
                      onClick={() => toggleExpand(ev._id, 'description')}
                    >
                      {expandedRows[ev._id]?.description ? ' Show less' : ' Show more'}
                    </span>
                  )}
                </td>
                <td>
                  {ev.image1 && <img src={ev.image1} alt={ev.title} className="thumb" />}
                  {ev.image2 && <img src={ev.image2} alt={ev.title} className="thumb" />}
                  {ev.image3 && <img src={ev.image3} alt={ev.title} className="thumb" />}
                </td>
                <td>
                  <button onClick={() => removeEvent(ev._id)}>🗑 Delete</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      )}
    </div>
  );
};

export default Admin;
