import { Link, useLocation } from "react-router-dom";

type MenuModalProps = {
  isToggle: boolean;
  toggleMenu: () => void;
};

const MenuModal = ({ isToggle, toggleMenu }: MenuModalProps) => {
  const location = useLocation().pathname.split("/")[2];

  return (
    <div
      className={`bg-black text-white absolute left-0 right-0 block md:hidden ${
        isToggle
          ? "translate-y-0 opacity-100 origin-top transition-all duration-300"
          : "-translate-y-52 opacity-0 origin-bottom transition-all duration-300"
      }`}
    >
      <nav className="w-full max-w-[500px] mx-auto">
        <ul className="flex justify-center items-center flex-col gap-2 p-10">
          <li
            onClick={() => toggleMenu()}
            className={`relative font-bold hover:text-[#389FDD] px-5 py-2 group ${
              location === "movie" ? "text-[#389FDD]" : ""
            }`}
          >
            <span
              className={`absolute w-full h-full top-0 left-0 -z-[1] border-b-2 border-b-[#38a9dd] rounded-lg  group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 ${
                location === "movie"
                  ? "scale-100 translate-y-0"
                  : "scale-0 translate-y-[50px]"
              }`}
            ></span>
            <Link to="/explore/movie">Movies</Link>
          </li>
          <li
            onClick={() => toggleMenu()}
            className={`relative font-bold hover:text-[#389FDD] px-5 py-2 group ${
              location === "tv" ? "text-[#389FDD]" : ""
            }`}
          >
            <span
              className={`absolute w-full h-full top-0 left-0 -z-[1] border-b-2 border-b-[#38a9dd] rounded-lg  group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 ${
                location === "tv"
                  ? "scale-100 translate-y-0"
                  : "scale-0 translate-y-[50px]"
              }`}
            ></span>
            <Link to="/explore/tv">TV Shows</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MenuModal;
