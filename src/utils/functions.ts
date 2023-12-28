import { Movie, TVSeries } from "../types";

export const sortMovies = ({
  array,
  sortBy,
}: {
  array: Movie[];
  sortBy: string;
}): Movie[] | null => {
  if (!array) return null;

  const copy = [...array];

  switch (sortBy.split(".")[0]) {
    case "popularity":
      if (sortBy.split(".")[1] === "desc") {
        copy.sort((a, b) => b.popularity - a.popularity);
      } else {
        copy.sort((a, b) => a.popularity - b.popularity);
      }
      break;
    case "vote_average":
      if (sortBy.split(".")[1] === "desc") {
        copy.sort((a, b) => b.vote_average - a.vote_average);
      } else {
        copy.sort((a, b) => a.vote_average - b.vote_average);
      }
      break;
    case "release_date":
      if (sortBy.split(".")[1] === "desc") {
        copy.sort((a, b) => b.release_date.localeCompare(a.release_date));
      } else {
        copy.sort((a, b) => a.release_date.localeCompare(b.release_date));
      }
      break;
    case "original_title":
      copy.sort((a, b) => a.original_title.localeCompare(b.original_title));
      break;
    default:
      break;
  }

  return copy;
};

export const sortSeries = ({
  array,
  sortBy,
}: {
  array: TVSeries[];
  sortBy: string;
}): TVSeries[] | null => {
  if (!array) return null;

  const copy = [...array];

  switch (sortBy.split(".")[0]) {
    case "popularity":
      if (sortBy.split(".")[1] === "desc") {
        copy.sort((a, b) => b.popularity - a.popularity);
      } else {
        copy.sort((a, b) => a.popularity - b.popularity);
      }
      break;
    case "vote_average":
      if (sortBy.split(".")[1] === "desc") {
        copy.sort((a, b) => b.vote_average - a.vote_average);
      } else {
        copy.sort((a, b) => a.vote_average - b.vote_average);
      }
      break;
    case "release_date":
      if (sortBy.split(".")[1] === "desc") {
        copy.sort((a, b) => b.first_air_date.localeCompare(a.first_air_date));
      } else {
        copy.sort((a, b) => a.first_air_date.localeCompare(b.first_air_date));
      }
      break;
    case "original_title":
      copy.sort((a, b) => a.original_name.localeCompare(b.original_name));
      break;
    default:
      break;
  }

  return copy;
};
