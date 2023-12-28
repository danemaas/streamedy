import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import fetchGenres from "../../hooks/fetchGenres";
import {
  JsonMovieResponse,
  JsonSeriesResponse,
  Movie,
  TVSeries,
} from "../../types";
import { sortMovies, sortSeries } from "../../utils/functions";
import { useFetch } from "../../utils/api";
import noPoster from "../../assets/no-poster.png";

const SORT_DATA = [
  {
    sortName: "Popularity Desc",
    sortValue: "popularity.desc",
  },
  {
    sortName: "Popularity Asc",
    sortValue: "popularity.asc",
  },
  {
    sortName: "Rating Desc",
    sortValue: "vote_average.desc",
  },
  {
    sortName: "Rating Asc",
    sortValue: "vote_average.asc",
  },
  {
    sortName: "Release Date Desc",
    sortValue: "release_date.desc",
  },
  {
    sortName: "Release Date Asc",
    sortValue: "release_date.asc",
  },
  {
    sortName: "Title (A-Z)",
    sortValue: "original_title.desc" || "original_name.desc",
  },
];

const Explore = <T extends Movie | TVSeries>() => {
  const { mediaType } = useParams();
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState<string>("");
  const [genre, setGenre] = useState<string>();
  const [sortedData, setSortedData] = useState<T[]>();

  const { data: genres } = fetchGenres(
    `/genre/${mediaType}/list?language=en&with_genres=action`
  );

  const handleNextPage = () => {
    if (pageNum < totalPages) {
      setPageNum((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNum > 1) {
      setPageNum((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const handleSort = () => {
      if (mediaType === "movie") {
        const sortedArray = sortMovies({
          array: sortedData as Movie[],
          sortBy: sortBy!,
        });
        setSortedData(sortedArray as T[]);
      } else {
        const sortedArray = sortSeries({
          array: sortedData as TVSeries[],
          sortBy: sortBy!,
        });
        setSortedData(sortedArray as T[]);
      }
    };

    handleSort();
  }, [sortBy]);

  useEffect(() => {
    const fetchData = async () => {
      let endpoint = `/discover/${mediaType}?include_video=false&language=en-US&page=${pageNum}`;

      if (genre !== undefined) {
        endpoint += `&with_genres=${genre}`;
      }

      try {
        const res: JsonMovieResponse | JsonSeriesResponse = await useFetch(
          endpoint
        );

        const { page, total_pages, results } = res;
        setPageNum(page);
        setTotalPages(total_pages);
        setSortedData(
          mediaType === "movie" ? (results as T[]) : (results as T[])
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [mediaType, genre, pageNum]);

  return (
    <section className="bg-black text-white min-h-screen">
      <div className="py-20 container mx-auto px-5 lg:px-0">
        <div className="flex flex-col items-start justify-center md:flex-row md:justify-between md:items-center mb-5 gap-3 md:gap-0">
          <h2 className="font-semibold text-2xl w-fit">
            Explore{" "}
            {mediaType === "movie" ? (
              <span className="text-[#389FDD]">Movies</span>
            ) : (
              <span className="text-[#389FDD]">TV Shows</span>
            )}
          </h2>
          <div className="w-full md:w-fit flex flex-col md:flex-row gap-2 text-black">
            <select
              className="w-full p-2 rounded-lg text-sm"
              onChange={(e) => setGenre(e.target.value)}
            >
              <option hidden>Select Genres</option>
              {genres &&
                genres.genres.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
            <select
              className="w-full p-2 rounded-lg text-sm"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option hidden>Sort By</option>
              {SORT_DATA.map((item) => (
                <option key={item.sortName} value={item.sortValue}>
                  {item.sortName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 py-5">
          {sortedData &&
            sortedData.map((item) => (
              <Link
                key={item.id}
                to={`/${mediaType}/${item.id}`}
                className="rounded-md overflow-hidden group"
              >
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/original${item.poster_path}`
                      : noPoster
                  }
                  alt={(item as Movie).title || (item as TVSeries).name}
                  className="group-hover:scale-105 group-hover:opacity-85 transition-all duration-300"
                />
              </Link>
            ))}
        </div>
        <div className="w-full flex items-center justify-center gap-5">
          <button
            disabled={pageNum === 1}
            onClick={() => handlePrevPage()}
            className="border-2 border-[#389FDD] px-5 py-2 rounded-md hover:bg-[#389FDD] hover:text-black transition-all duration-300"
          >
            Prev
          </button>
          <button
            disabled={pageNum === totalPages}
            onClick={() => handleNextPage()}
            className="border-2 border-[#389FDD] px-5 py-2 rounded-md hover:bg-[#389FDD] hover:text-black transition-all duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Explore;
