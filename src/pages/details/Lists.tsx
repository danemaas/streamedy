import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import customFetch from "../../hooks/customFetch";
import noPoster from "../../assets/no-poster.png";

type SimilarListProps = {
  mediaType: string | undefined;
  id: string | undefined;
  type: string;
};

const Lists = ({ mediaType, id, type }: SimilarListProps) => {
  const containerRef = useRef(null);
  const { data } = customFetch(
    `/${mediaType}/${id}/${type}?language=en-US&page=1`
  );
  const { results } = data;

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
    <div className="min-h-[25vh]">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-xl md:text-2xl capitalize font-semibold">
            {type === "similar"
              ? mediaType === "movie"
                ? "Similar Movies"
                : "Similar TV Shows"
              : "Recommendations"}
          </h2>
        </div>
        <div className="relative">
          <div
            ref={containerRef}
            className="grid grid-flow-col gap-3 overflow-x-hidden pb-5"
          >
            {results.map((result) => (
              <Link
                to={`/${mediaType}/${result.id}`}
                key={result.id}
                className="bg-[#389FDD] w-[150px] h-[200px] lg:w-[200px] lg:h-[300px] rounded-md overflow-hidden hover:opacity-80"
              >
                <img
                  src={
                    result.poster_path
                      ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                      : noPoster
                  }
                  alt={result.title}
                  className="w-full h-full object-cover object-center scale-100 hover:scale-105 transition-all duration-200"
                />
              </Link>
            ))}
          </div>
          <div className="absolute text-[#389FDD] w-full flex justify-between items-center -translate-y-[8rem] lg:-translate-y-[11rem]">
            <button
              onClick={() => scrollState("left")}
              className="bg-transparent hover:bg-black/70 rounded-full flex items-center justify-center ms-1 p-1"
            >
              <ChevronLeft size={30} />
            </button>
            <button
              onClick={() => scrollState("right")}
              className="bg-transparent hover:bg-black/70 rounded-full flex items-center justify-center me-1 p-1"
            >
              <ChevronRight size={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lists;
