import { Link, useParams } from "react-router-dom";

import customFetch from "../../hooks/customFetch";
import noPoster from "../../assets/no-poster.png";
import { useState } from "react";
import { Movie, TVSeries } from "../../types";

const SearchResults = () => {
  const [pageNum, setPageNum] = useState(1);
  const [mediaType, setMediaType] = useState("movie");
  const { query } = useParams();
  const { data } = customFetch(
    `/search/${mediaType}?query=${query}&language=en-US&page=${pageNum}`
  );
  const { results, total_pages } = data;

  const handleNextPage = () => {
    if (data && pageNum < total_pages) {
      setPageNum((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (data && pageNum > 1) {
      setPageNum((prev) => prev - 1);
    }
  };

  return (
    <section className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-5 lg:px-0 py-20">
        <div className="flex flex-col md:flex-row items-start justify-center">
          <h2>Search Results for &apos;{query}&apos;</h2>
          <div className="w-full flex items-center justify-center gap-3 bg-white rounded-lg text-black my-3">
            <button
              className={`w-full m-[1px] rounded-lg ${
                mediaType === "movie"
                  ? "bg-[#389FDD] text-white"
                  : "bg-transparent"
              }`}
              onClick={() => setMediaType("movie")}
            >
              Movies
            </button>
            <button
              className={`w-full m-[1px] rounded-lg ${
                mediaType === "tv"
                  ? "bg-[#389FDD] text-white"
                  : "bg-transparent"
              }`}
              onClick={() => setMediaType("tv")}
            >
              TV Shows
            </button>
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 py-5">
          {results.map((result) => (
            <Link
              to={`/${mediaType}/${result.id}`}
              key={result.id}
              className="rounded-lg overflow-hidden"
            >
              <img
                src={
                  result.poster_path
                    ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                    : noPoster
                }
                alt={(result as Movie).title || (result as TVSeries).name}
                className=""
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
            disabled={pageNum === total_pages}
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

export default SearchResults;
