import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import customFetch from "../../hooks/customFetch";
import fetchGenres from "../../hooks/fetchGenres";

const Explore = () => {
  const { mediaType } = useParams();
  const [pageNum, setPageNum] = useState(1);
  const { data } = customFetch(
    `/discover/${mediaType}?include_video=false&language=en-US&page=${pageNum}`
  );
  const { data: genres } = fetchGenres(`/genre/${mediaType}/list?language=en`);
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

  if (!genres) return;

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
            <select className="w-full p-2 rounded-lg text-sm">
              <option hidden>Select Genres</option>
              {genres.genres.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <select className="w-full p-2 rounded-lg text-sm">
              <option hidden>Sort By</option>
              <option value="popularity_desc">Popularity Desc</option>
              <option value="popularity_asc">Popularity Asc</option>
              <option value="vote_average_desc">Rating Desc</option>
              <option value="vote_average_asc">Rating Asc</option>
              <option value="release_date_desc">Release Date Desc</option>
              <option value="release_date_asc">Release Date Asc</option>
              <option value="title_desc">Title (A-Z)</option>
            </select>
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 py-5">
          {results.map((item) => (
            <Link
              key={item.id}
              to={`/${mediaType}/${item.id}`}
              className="rounded-md overflow-hidden group"
            >
              <img
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                alt={item.title}
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

export default Explore;
