import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url) {
      setError(new Error("URL is required"));
      return;
    }
    const fetchData = async () => {
      setLoading(true);

      try {
        const req = await fetch(url);
        if (!req.ok) {
          throw new Error("Not found :( ");
        }
        const data = await req.json();
        setData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
