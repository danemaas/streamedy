import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

//local imports
import Tabs from "../../components/Tabs";
import customFetch from "../../hooks/customFetch";
import noPoster from "../../assets/no-poster.png";
import { Movie, TVSeries } from "../../types";

type MovieListProps = {
  title: string;
};

const MovieList = ({ title }: MovieListProps) => {
  const containerRef = useRef(null);
  const [option, setOption] = useState("movie");
  const { data } =
    title === "trending"
      ? customFetch(`/${title}/${option}/day?language=en-US`)
      : customFetch(`/${option}/${title}?language=en-US&page=1`);
  const { results } = data;

  const toggleOption = (item: string) => {
    setOption(item);
  };

  const scrollState = (dir: string) => {
    const container = containerRef.current as HTMLDivElement | null;
    if (container) {
      const scrollAmount =
        dir === "left"
          ? container.scrollLeft - (container.offsetWidth + 10)
          : container.scrollLeft + (container.offsetWidth + 10);

      container.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-[35vh] lg:min-h-[45vh] bg-black">
      <div className="container mx-auto px-5 xl:px-0 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-xl md:text-2xl capitalize">
            {title.split("_").join(" ")}
          </h2>
          <Tabs option={option} toggleOption={toggleOption} />
        </div>
        <div className="relative">
          <div
            ref={containerRef}
            className="grid grid-flow-col gap-3 overflow-x-hidden pb-5"
          >
            {results.map((result) => (
              <Link
                to={`/${option}/${result.id}`}
                key={result.id}
                className="bg-[#389FDD] w-[150px] h-[200px] lg:w-[200px] lg:h-[300px] rounded-md overflow-hidden hover:opacity-80"
              >
                <img
                  src={
                    result.poster_path
                      ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                      : noPoster
                  }
                  alt={(result as Movie).title || (result as TVSeries).name}
                  className="w-full h-full object-cover object-center scale-100 hover:scale-105 transition-all duration-200"
                />
              </Link>
            ))}
          </div>

          <button
            onClick={() => scrollState("left")}
            className="bg-transparent hover:bg-black/70 rounded-full flex items-center justify-center ms-1 p-1 absolute left-0 -translate-y-[8rem] lg:-translate-y-[11rem] text-[#389FDD]"
          >
            <ChevronLeft size={30} />
          </button>
          <button
            onClick={() => scrollState("right")}
            className="bg-transparent hover:bg-black/70 rounded-full flex items-center justify-center me-1 p-1 absolute right-0 -translate-y-[8rem] lg:-translate-y-[11rem] text-[#389FDD]"
          >
            <ChevronRight size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
