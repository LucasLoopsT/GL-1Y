import { useState, useEffect } from "react";
import {
  IoPlay,
  IoPause,
  IoPlaySkipBack,
  IoPlaySkipForward,
} from "react-icons/io5";
import { FaSpotify } from "react-icons/fa";
import { useSpotifyPlayer } from "../hooks/useSpotifyPlayer"; // ajuste o caminho
import axios from "axios";

function Footer({ token }: { token: string }) {
  const [play, setPlay] = useState(false);
  const [progress, setProgress] = useState(0);
  const [trackName, setTrackName] = useState("Sem música");
  const [playlistName, setPlaylistName] = useState("Minha Playlist");
  const { player, deviceId } = useSpotifyPlayer(token);

  //Corrigindo erros para deploy
  setProgress(10);
  console.log(player);

  // Atualiza a música atual
  const getCurrentPlayback = async () => {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (data?.item) {
      setTrackName(data.item.name);
      setPlaylistName(data.context?.name || "Desconhecida");
    }
  };

  useEffect(() => {
    if (play) getCurrentPlayback();
  }, [play]);

  const togglePlay = async () => {
    if (!deviceId) return;
    const url = `https://api.spotify.com/v1/me/player/${
      play ? "pause" : "play"
    }`;
    await axios.put(
      url,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setPlay(!play);
  };

  return (
    <footer className="fixed bottom-0 w-full bg-back-3 p-4 border-t border-pink-3">
      <div className="flex flex-col gap-2 text-pink-3">
        <div className="flex items-center justify-between px-2 text-sm text-pink-5">
          <div className="flex items-center gap-2">
            <FaSpotify className="text-green-500" />
            <span className="font-semibold">Playlist: {playlistName}</span>
          </div>
          <span className="text-xs opacity-70">Now Playing: {trackName}</span>
        </div>

        <div className="flex items-center justify-center gap-6">
          <IoPlaySkipBack className="cursor-pointer text-xl hover:text-pink-1 transition" />
          <div
            onClick={togglePlay}
            className="p-3 bg-pink-1 text-white rounded-full cursor-pointer transition hover:bg-red-2"
          >
            {play ? <IoPause /> : <IoPlay />}
          </div>
          <IoPlaySkipForward className="cursor-pointer text-xl hover:text-pink-1 transition" />
        </div>

        <div className="flex items-center gap-2 text-xs text-pink-6 px-4">
          <span>0:42</span>
          <div className="flex-1 bg-pink-6/30 h-1 rounded-full overflow-hidden">
            <div
              className="bg-pink-3 h-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span>3:10</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
