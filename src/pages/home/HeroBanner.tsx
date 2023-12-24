import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//local imports
import customFetch from "../../hooks/customFetch";
import Loading from "../../components/Loading";

const HeroBanner = () => {
  const [searchInput, setSearchInput] = useState("");
  const [background, setBackground] = useState("");
  const nav = useNavigate();

  const { data, loading } = customFetch("/movie/upcoming");

  useEffect(() => {
    if (data && data.results.length > 0) {
      const bgImage =
        data.results[Math.floor(Math.random() * data.results.length)]
          .backdrop_path;
      const imageUrl = "https://image.tmdb.org/t/p/original" + bgImage;

      setBackground(imageUrl);
    }
  }, [data]);

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchInput.length > 0) {
      nav(`/search/${searchInput}`);
    }
  };

  const handleSearchBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (searchInput.length > 0) {
      nav(`/search/${searchInput}`);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="relative bg-black/50 z-100">
      <div className="absolute -z-[9999] w-full h-[500px] md:h-[700px] xl:h-[900px] opacity-60 overflow-hidden">
        <img
          src={background}
          alt="upcoming movie image"
          className="w-full h-full bg-black bg-blend-overlay object-cover object-center"
        />
      </div>
      <div className="absolute -z-10 bottom-0 w-full h-[250px] bg-gradient-to-b from-[#00000000] to-black"></div>
      <div className="container mx-auto">
        <div className="px-5 xl:px-0 h-[500px] md:h-[700px] xl:h-[900px] flex flex-col justify-center items-center gap-5">
          <p className="text-white text-2xl lg:text-4xl 2xl:text-5xl font-bold">
            Stream to your hearts content
          </p>
          <p className="text-white text-base lg:text-xl text-center">
            Dive into a world of endless entertainment! Millions of movies, TV
            shows, and captivating personalities are waiting for you. Explore
            now!
          </p>
          <div className="w-full max-w-[500px] flex items-center p-1 bg-white rounded-md group">
            <input
              type="text"
              placeholder="Search for a movies/tv shows..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyUp={handleSearch}
              className="w-full outline-none p-1"
            />
            <button
              onClick={handleSearchBtn}
              className="bg-[#389FDD] p-1 rounded-e-md text-white hover:bg-[#38a9dd]"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
