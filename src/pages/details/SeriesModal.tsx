import { useEffect, useState } from "react";

type WatchModalProps = {
  id: string | undefined;
  seasons: number | undefined;
  episodes: number | undefined;
  toggler: () => void;
};

const SeriesModal = ({ id, seasons, episodes, toggler }: WatchModalProps) => {
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);

  const server1 = `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${season}&e=${episode}`;
  const server2 = `https://moviesapi.club/tv/${id}-${season}-${episode}`;
  const server3 = `https://vidsrc.to/embed/tv/${id}/${season}/${episode}/`;

  const [server, setServer] = useState(server1);

  useEffect(() => {
    setServer(server1);
  }, [season, episode]);

  return (
    <div className="fixed h-[200vh] w-[100vw] grid place-items-center z-[999999] bg-black/20">
      <div className="w-full max-w-[900px] h-[500px] bg-black rounded-md">
        <div className="text-black flex items-center justify-between px-2">
          <div className="flex items-center gap-5">
            <select className="">
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
            <select className="">
              {[...Array(seasons)].map((_, index) => (
                <option
                  key={index}
                  value={index + 1}
                  onClick={() => setSeason(index + 1)}
                >
                  Season {index + 1}
                </option>
              ))}
            </select>
            <select className="">
              {[...Array(episodes)].map((_, index) => (
                <option
                  key={index}
                  value={index + 1}
                  onClick={() => setEpisode(index + 1)}
                >
                  Episode {index + 1}
                </option>
              ))}
            </select>
          </div>
          <button onClick={() => toggler()} className="text-white">
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

export default SeriesModal;
