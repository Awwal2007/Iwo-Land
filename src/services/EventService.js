import axios from 'axios';

const API_URL = import.meta.env;

export const getEvents = () => axios.get(`${API_URL}/events`);
export const createEvent = (formData) => axios.post(`${API_URL}/events`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteEvent = (id) => axios.delete(`${API_URL}/events/${id}`);
export const updateEvent = (id, formData) => axios.put(`${API_URL}/events/${id}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
