import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = { Authorization: TMDB_TOKEN };

export const useFetch = async (url: string, params?: string) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });

    if (!data) {
      throw new Error("Error fetching data from API.");
    }

    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
