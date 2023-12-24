import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type SearchModalProps = {
  isToggle: boolean;
  toggleSearch: () => void;
};

const SearchModal = ({ isToggle, toggleSearch }: SearchModalProps) => {
  const [searchInput, setSearchInput] = useState("");
  const nav = useNavigate();

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchInput.length > 0) {
      nav(`/search/${searchInput}`);
      setSearchInput("");
      toggleSearch();
    }
  };

  const handleSearchBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (searchInput.length > 0) {
      nav(`/search/${searchInput}`);
      setSearchInput("");
      toggleSearch();
    }
  };

  return (
    <div
      className={`bg-white text-black absolute left-0 right-0 ${
        isToggle
          ? "translate-y-0 opacity-100 origin-top transition-all duration-300"
          : "-translate-y-32 opacity-0 origin-bottom transition-all duration-300"
      }`}
    >
      <div className="container mx-auto flex items-center justify-center p-2">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyUp={handleSearch}
          placeholder="Search a movie/tv series..."
          className="w-full max-w-[500px] p-1 outline-none"
        />
        <button onClick={handleSearchBtn}>
          <Search />
        </button>
      </div>
    </div>
  );
};

export default SearchModal;
