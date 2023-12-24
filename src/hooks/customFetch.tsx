import { useEffect, useState } from "react";
import { useFetch } from "../utils/api";
import { JsonMovieResponse } from "../types";

const INITIAL_DATA = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

const customFetch = (url: string) => {
  const [data, setData] = useState<JsonMovieResponse>(INITIAL_DATA);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    useFetch(url)
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((err) => {
        setLoading(false);
        console.error(`Error fetching data: ${err}`);
      });
  }, [url]);

  return { data, loading };
};

export default customFetch;
