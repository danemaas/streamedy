import { useEffect, useState } from "react";
import { useFetch } from "../utils/api";
import { JsonMovieResponse, JsonSeriesResponse } from "../types";

const INITIAL_DATA: JsonMovieResponse | JsonSeriesResponse = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

const customFetch = (url: string) => {
  const [data, setData] = useState(INITIAL_DATA);
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
