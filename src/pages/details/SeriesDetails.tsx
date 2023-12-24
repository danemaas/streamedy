import { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { PlayIcon } from "lucide-react";

import fetchSeriesDetails from "../../hooks/fetchSeriesDetails";
import noPoster from "../../assets/no-poster.png";
import SeriesModal from "./SeriesModal";

type SeriesDetailsProps = {
  mediaType: string | undefined;
  id: string | undefined;
};

const SeriesDetails = ({ mediaType, id }: SeriesDetailsProps) => {
  const [showSeries, setShowSeries] = useState(false);
  const { data } = fetchSeriesDetails(`/${mediaType}/${id}?language=en-US`);

  const toggleShowSeries = () => {
    setShowSeries(false);
  };

  if (!data) return;

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-5">
      {showSeries && (
        <SeriesModal
          id={id}
          seasons={data.number_of_seasons}
          episodes={data.number_of_episodes}
          toggler={toggleShowSeries}
        />
      )}
      <div className="w-full md:max-w-[400px] flex-1 md:flex-[.5] h-full md:max-h-[900px] rounded-lg overflow-hidden">
        <img
          src={
            data && data.poster_path
              ? `https://image.tmdb.org/t/p/original${data.poster_path}`
              : noPoster
          }
          alt={data.name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="flex md:flex-[.5] flex-col items-start justify-center">
        <h2 className="text-xl font-bold">
          {data.name} <span>({data.first_air_date.split("-")[0]})</span>
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
            onClick={() => setShowSeries(!showSeries)}
            className="flex items-center gap-1 group"
          >
            <PlayIcon className="group-hover:text-[#389FDD] transition-all duration-300" />
            <p className="w-fit relative">
              Watch Series
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
            {data.status}
          </li>
          <li>
            <p>Seasons:</p>
            {data.number_of_seasons}
          </li>
          <li>
            <p>Episodes:</p>
            {data.number_of_episodes}
          </li>
          <li>
            <p>Runtime:</p>
            {data.last_episode_to_air.runtime}m
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SeriesDetails;
