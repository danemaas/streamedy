import { useState } from "react";

type WatchModalProps = {
  mediaType?: string | undefined;
  id: string | undefined;
  toggler: () => void;
};

const WatchModal = ({ id, toggler }: WatchModalProps) => {
  const server1 = `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`;
  const server2 = `https://moviesapi.club/movie/${id}`;
  const server3 = `https://vidsrc.me/embed/movie?tmdb=${id}`;

  const [server, setServer] = useState(server1);

  return (
    <div className="fixed h-[200vh] w-[100vw] grid place-items-center z-[999999] bg-black/20">
      <div className="w-full max-w-[900px] h-[500px] bg-black rounded-md">
        <div className="text-black">
          <select className="m-1 px-5">
            <option value={server1} onClick={() => setServer(server1)}>
              Server 1
            </option>
            <option value={server2} onClick={() => setServer(server2)}>
              Server 2
            </option>
            <option value={server3} onClick={() => setServer(server3)}>
              Server 3
            </option>
          </select>
          <button
            onClick={() => toggler()}
            className="float-end pe-2 text-white"
          >
            close
          </button>
        </div>
        <iframe
          src={server}
          className="w-full h-full object-fill object-center"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default WatchModal;
