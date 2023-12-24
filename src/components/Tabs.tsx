type TapsProps = {
  option: string;
  toggleOption: (item: string) => void;
};

const Tabs = ({ option, toggleOption }: TapsProps) => {
  return (
    <div className="bg-white w-fit p-1 rounded-lg flex items-center justify-between gap-1">
      <button
        onClick={() => toggleOption("movie")}
        className={`text-sm px-3 py-1 rounded-md ${
          option === "movie"
            ? "bg-[#389FDD] text-white transition-all duration-300"
            : "bg-transparent text-black transition-all duration-300"
        } `}
      >
        Movies
      </button>
      <button
        onClick={() => toggleOption("tv")}
        className={`text-sm px-3 py-1 rounded-md ${
          option === "tv"
            ? "bg-[#389FDD] text-white transition-all duration-300"
            : "bg-transparent text-black transition-all duration-300"
        } `}
      >
        TV Shows
      </button>
    </div>
  );
};

export default Tabs;
