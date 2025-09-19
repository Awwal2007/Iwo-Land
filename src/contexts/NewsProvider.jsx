
import React, { useState, useEffect } from 'react';

import {NewsContext} from '../contexts/NewsContext'
import { toast } from 'sonner';

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [singleNews, setSingleNews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("accessToken");  

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);


      // Example: Replace with your own API endpoint or key
      const response = await fetch(
        `${baseUrl}/news`
      );

      if (!response.ok) throw new Error('Failed to fetch news');

      const data = await response.json();
      setNews(data.news || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createNews = async (newArticle) => {
    try {
      setCreating(true);
      setError(null);

      const response = await fetch(`${baseUrl}/news`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: newArticle,
      });

      if (!response.ok) throw new Error('Failed to create news');

      const created = await response.json();
      console.log(created);
      
      if(created.status === "success"){
        toast.success(created.message);
      }
      // Update state immediately (optimistic UI)
      setNews((prev) => [created, ...prev]);
    } catch (err) {
      setError(err.message);
      console.log(err);      
    }finally{
      setCreating(false);
    }
  };

  const deleteNews = async (id) => {
    try {
      setError(null);

      const response = await fetch(`${baseUrl}/news/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete news');

      const data = await response.json();
      if(data.status === "success"){
        toast.success(data.message);
      }

      // Optimistically remove from state
      setNews((prev) => prev.filter(item => item._id !== id));
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const getNewsById = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/news/${id}`);
      const data = await res.json();

      if (data.status === 'success') {
        setSingleNews(data.news);
      } else {
        setSingleNews(null);
      }
    } catch (error) {
      console.error('Error fetching single news:', error);
      setSingleNews(null);
    }
  };


  // Fetch news on mount
  useEffect(() => {
    fetchNews();
  }, []);


  const value = {
    news, 
    loading, 
    creating, 
    error, 
    fetchNews, 
    createNews,
    deleteNews,
    getNewsById,
    singleNews
  }
  // Optional: also expose fetchNews so you can manually refresh
  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  );
};
