import { useParams } from "react-router-dom";
import MovieDetails from "./MovieDetails";
import SeriesDetails from "./SeriesDetails";
import Lists from "./Lists";

const Details = () => {
  const params = useParams();

  return (
    <section className="min-h-screen w-full bg-slate-800 text-white pt-20">
      <div className="container mx-auto px-5 flex flex-col gap-5">
        {params.mediaType === "movie" ? (
          <MovieDetails mediaType={params.mediaType} id={params.id} />
        ) : (
          <SeriesDetails mediaType={params.mediaType} id={params.id} />
        )}
        <hr />
        <Lists mediaType={params.mediaType} id={params.id} type="similar" />
        <Lists
          mediaType={params.mediaType}
          id={params.id}
          type="recommendations"
        />
      </div>
    </section>
  );
};

export default Details;
