import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, LayoutGrid, XSquare } from "lucide-react";

//local imports
import logo from "../assets/logo.svg";
import SearchModal from "./SearchModal";
import MenuModal from "./MenuModal";

const Header = () => {
  const [searchToggle, setSearchToggle] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hide, setHide] = useState(false);
  const location = useLocation().pathname.split("/")[2];

  const controlNavbar = () => {
    if (window.scrollY > 30) {
      if (window.scrollY > lastScrollY && !menuToggle) {
        setHide(true);
      } else {
        setHide(false);
      }
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const toggleSearch = () => {
    setSearchToggle(!searchToggle);
    setMenuToggle(false);
  };

  const toggleMenu = () => {
    setMenuToggle(!menuToggle);
    setSearchToggle(false);
  };

  return (
    <header
      className={`w-full bg-black text-white fixed z-[999999] ${
        hide
          ? "-translate-y-52 origin-bottom transition-all duration-300"
          : "translate-y-0 origin-top transition-all duration-300"
      }`}
    >
      <section className="container mx-auto px-5 py-2 xl:px-0 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1">
          <img src={logo} alt="streamedy logo" className="w-10 h-10" />
          <h2 className="font-semibold">Streamedy</h2>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-5">
            <li
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
              className={`relative font-bold hover:text-[#389FDD] px-5 py-2 group ${
                location === "seritves" ? "text-[#389FDD]" : ""
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

        <div className="flex items-center gap-3">
          <button className="relative" onClick={() => toggleSearch()}>
            <Search
              className={`${
                searchToggle
                  ? "opacity-0 scale-0 transition-all duration-300"
                  : "opacity-100 scale-100 transition-all duration-300"
              }`}
            />
            <XSquare
              className={`${
                searchToggle
                  ? "opacity-100 scale-100 transition-all duration-300"
                  : "opacity-0 scale-0 transition-all duration-300"
              } absolute -translate-y-6`}
            />
          </button>
          <button
            className="relative block md:hidden"
            onClick={() => toggleMenu()}
          >
            <LayoutGrid
              className={`${
                menuToggle
                  ? "opacity-0 scale-0 transition-all duration-300"
                  : "opacity-100 scale-100 transition-all duration-300"
              }`}
            />
            <XSquare
              className={`${
                menuToggle
                  ? "opacity-100 scale-100 transition-all duration-300"
                  : "opacity-0 scale-0 transition-all duration-300"
              } absolute -translate-y-6`}
            />
          </button>
        </div>
      </section>
      <SearchModal isToggle={searchToggle} toggleSearch={toggleSearch} />
      <MenuModal isToggle={menuToggle} toggleMenu={toggleMenu} />
    </header>
  );
};

export default Header;
