import { useState, useEffect } from 'react';

export function useFetch(url, method = 'GET') {
  const [response, setResponse] = useState({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      setResponse({ data: null, loading: true, error: null });

      try {
        const res = await fetch(`${url}&api_key=${import.meta.env.VITE_APP_APIKEY}`, { method });
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json(); 
        setResponse({ data, loading: false, error: null });
      } catch (error) {
        setResponse({ data: null, loading: false, error: error?.message });
      }
    };

    fetchData();
  }, [url, method]); //re-fecth on url changes

  return response;
}
