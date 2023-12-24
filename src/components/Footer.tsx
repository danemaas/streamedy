import logo from "../assets/logo.svg";
import tmdb from "../assets/tmdb-logo.svg";

const Footer = () => {
  return (
    <footer className="bg-black text-white w-full">
      <section className="container mx-auto px-5 py-2 xl:px-0 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={logo} alt="streamedy logo" className="w-10 h-10" />
          <img src={tmdb} alt="tmdb logo" className="w-12 h-12" />
        </div>

        <p className="text-sm text-slate-400">
          2023.Streamedy - All rights reserved
        </p>
      </section>
    </footer>
  );
};

export default Footer;
