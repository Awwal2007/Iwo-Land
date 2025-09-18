
import React, { useState, useEffect } from 'react';

import {NewsContext} from '../contexts/NewsContext'

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      setError(null);

      const response = await fetch(`${baseUrl}/news`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newArticle),
      });

      if (!response.ok) throw new Error('Failed to create news');

      const created = await response.json();
      console.log(created);
      
      // Update state immediately (optimistic UI)
      setNews((prev) => [created, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch news on mount
  useEffect(() => {
    fetchNews();
  }, []);

  // Optional: also expose fetchNews so you can manually refresh
  return (
    <NewsContext.Provider value={{ news, loading, error, fetchNews, createNews }}>
      {children}
    </NewsContext.Provider>
  );
};
