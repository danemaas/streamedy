import { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { PlayIcon } from "lucide-react";

import fetchMovieDetails from "../../hooks/fetchMovieDetails";
import noPoster from "../../assets/no-poster.png";
import TrailerModal from "./TrailerModal";
import WatchModal from "./WatchModal";

type MovieDetailsProps = {
  mediaType: string | undefined;
  id: string | undefined;
};

const MovieDetails = ({ mediaType, id }: MovieDetailsProps) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [showMovie, setShowMovie] = useState(false);
  const { data } = fetchMovieDetails(`/${mediaType}/${id}?language=en-US`);

  const toggleShowTrailer = () => {
    setShowTrailer(false);
  };

  const toggleShowMovie = () => {
    setShowMovie(false);
  };

  if (!data) return;

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-5">
      {showTrailer && (
        <TrailerModal
          mediaType={mediaType}
          id={id}
          toggler={toggleShowTrailer}
        />
      )}
      {showMovie && (
        <WatchModal mediaType={mediaType} id={id} toggler={toggleShowMovie} />
      )}
      <div className="w-full md:max-w-[400px] flex-1 md:flex-[.5] h-full md:max-h-[900px] rounded-lg overflow-hidden">
        <img
          src={
            data && data.poster_path
              ? `https://image.tmdb.org/t/p/original${data.poster_path}`
              : noPoster
          }
          alt={data.title}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="flex md:flex-[.5] flex-col items-start justify-center">
        <h2 className="text-xl font-bold">
          {data.title} <span>({data.release_date.split("-")[0]})</span>
        </h2>
        <p className="text-slate-400 text-sm italic mb-3">
          &apos;{data.tagline}&apos;
        </p>
        <ul className="flex items-center gap-2 mb-5">
          {data.genres.map((item) => (
            <li key={item.id} className="bg-[#38aedd] p-1 rounded-md text-sm">
              {item.name}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-5 mb-5">
          <div className="w-16 font-bold">
            <CircularProgressbar
              value={data.vote_average}
              maxValue={10}
              text={data.vote_average.toString()}
              styles={buildStyles({
                pathColor:
                  data.vote_average < 5
                    ? "red"
                    : data.vote_average < 7
                    ? "orange"
                    : "green",
              })}
            />
          </div>
          <button
            onClick={() => setShowTrailer(!showTrailer)}
            className="flex items-center gap-1 group"
          >
            <PlayIcon className="group-hover:text-[#389FDD] transition-all duration-300" />
            <p className="w-fit relative">
              Watch Trailer
              <span className="absolute bottom-0 left-0 w-[0] border-b-2 border-b-[#389FDD] group-hover:w-full transition-all duration-300"></span>
            </p>
          </button>
          <button
            onClick={() => setShowMovie(!showMovie)}
            className="flex items-center gap-1 group"
          >
            <PlayIcon className="group-hover:text-[#389FDD] transition-all duration-300" />
            <p className="w-fit relative">
              Watch Movie
              <span className="absolute bottom-0 left-0 w-[0] border-b-2 border-b-[#389FDD] group-hover:w-full transition-all duration-300"></span>
            </p>
          </button>
        </div>
        <div className="mb-5">
          <p className="text-lg font-semibold">Overview:</p>
          <p>{data.overview}</p>
        </div>
        <ul className="flex items-center gap-5">
          <li>
            <p>Status:</p>
            <p className="text-slate-300 text-sm">{data.status}</p>
          </li>
          <li>
            <p>Release Date:</p>
            <p className="text-slate-300 text-sm">{data.release_date}</p>
          </li>
          <li>
            <p>Runtime:</p>
            <p className="text-slate-300 text-sm">{data.runtime}m</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MovieDetails;
