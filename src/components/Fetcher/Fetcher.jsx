import React, { useState, useEffect } from "react";

export const Fetcher = ({ className, children, artist }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //

  // const url = `https://concerts-artists-events-tracker.p.rapidapi.com/artist?name=${artist}&page=1`;
  const url = "https://jsonplaceholder.typicode.com/comments";
  const options = {
    method: "GET",
    url: "https://concerts-artists-events-tracker.p.rapidapi.com/artist",
    params: {
      name: { artist },
      page: "1",
    },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "concerts-artists-events-tracker.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, options);
        console.log(response);

        if (response.ok) {
          const result = await response.json();

          setData(result);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className={className}>
      <h1>Data from API: {process.env.REACT_APP_RAPID_API_KEY}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Fetcher;
