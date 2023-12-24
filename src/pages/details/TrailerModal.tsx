import fetchTrailers from "../../hooks/fetchTrailers";

type TrailerModalProps = {
  mediaType: string | undefined;
  id: string | undefined;
  toggler: () => void;
};

const TrailerModal = ({ mediaType, id, toggler }: TrailerModalProps) => {
  const { data } = fetchTrailers(`/${mediaType}/${id}/videos?language=en-US'`);

  if (!data) return;

  const filteredResult = data.results.filter(
    (result) => result.name === "Official Trailer"
  );

  if (!filteredResult) return;

  return (
    <div className="absolute h-[100vh] w-[100vw] grid place-items-center z-[999999]">
      <div className="w-full max-w-[900px] h-[500px] bg-black rounded-md">
        <button onClick={() => toggler()} className="float-end pe-2">
          close
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${filteredResult[0].key}`}
          className="w-full h-full object-fill object-center"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default TrailerModal;
