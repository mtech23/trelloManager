// src/hooks/usePost.js
import { useState } from 'react';
import { base_url } from './base_url';

export const usePost = (url, initialData = null) => {
  const [ApiData, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const LogoutData = localStorage.getItem('login');

  const post = async (postData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(base_url + url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LogoutData}`
        },
        body: JSON.stringify(postData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { ApiData, loading, error, post };
};



export const useGet = (url, initialData = null, idData = '') => {
  const [ApiData, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const LogoutData = localStorage.getItem('login');
  const [isTriggered, setIsTriggered] = useState(false);

  const get = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(base_url + url + idData, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LogoutData}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };



  return { ApiData, loading, error, get };
};
