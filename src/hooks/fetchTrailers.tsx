import { useEffect, useState } from "react";
import { useFetch } from "../utils/api";
import { MovieTrailerResponse } from "../types";

const fetchTrailers = (url: string) => {
  const [data, setData] = useState<MovieTrailerResponse>();
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

export default fetchTrailers;
