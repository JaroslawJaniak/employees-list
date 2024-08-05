import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setIsLoading(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Błąd pobierania danych");
        }
        return response.json();
      })
      .then((data) => {
       
          setData(data);
          setError(false);
          setIsLoading(false);
       
      })
      .catch((error) => {
        setError(true);
        setErrorStatus(error);
        setIsLoading(false);
      });
  }, []);

  return { data, isLoading, error };
};
