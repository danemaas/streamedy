import MovieList from "./MovieList";
import HeroBanner from "./HeroBanner";

const Home = () => {
  return (
    <section className="">
      <HeroBanner />
      <MovieList title="trending" />
      <MovieList title="popular" />
      <MovieList title="top_rated" />
    </section>
  );
};

export default Home;
