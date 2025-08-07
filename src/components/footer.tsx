import { useState, useEffect } from "react";
import {
  IoPlay,
  IoPause,
  IoPlaySkipBack,
  IoPlaySkipForward,
} from "react-icons/io5";
import { FaSpotify } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { useSpotifyPlayer } from "../hooks/useSpotifyPlayer";
import {
  playPlaylist,
  togglePlayback,
  nextTrack,
  previousTrack,
  getPlayerState,
} from "../service/spotify";
import PlaylistModal from "./playlistModal";
import { Slide } from "react-awesome-reveal";

function Footer() {
  const token = localStorage.getItem("spotify_token") as string;
  const [play, setPlay] = useState(false);
  const [progress, setProgress] = useState(0);
  const [trackName, setTrackName] = useState("Sem música");
  const [artistName, setArtistName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { deviceId } = useSpotifyPlayer(token);

  useEffect(() => {
    if (deviceId && !play) {
      playPlaylist(token, deviceId, "15Vi0mnqtTnNJWu43kWXO6")
        .then(() => setPlay(true))
        .catch((err) => console.error("Erro ao iniciar playlist", err));
    }
  }, [deviceId]);

  // Atualiza progresso e info da música
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await getPlayerState(token);

        if (data && data.item) {
          const progressMs = data.progress_ms;
          const durationMs = data.item.duration_ms;

          setProgress((progressMs / durationMs) * 100);
          setTrackName(data.item.name);
          setArtistName(data.item.artists?.[0]?.name || "Artista desconhecido");
        }
      } catch (err) {
        console.error("Erro ao buscar reprodução", err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [token]);

  const handleTogglePlay = async () => {
    const success = await togglePlayback(token, play);
    if (success) setPlay(!play);
  };

  const handleOpenPlaylist = () => setIsModalOpen(true);
  const handleClosePlaylist = () => setIsModalOpen(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const pulse = Math.random() * 0.4 + 0.6;
      document.documentElement.style.setProperty(
        "--footer-shadow-scale",
        pulse.toString()
      );
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="fixed bottom-0 w-full flex flex-col justify-between bg-back-3 z-50">
      <Slide
        delay={500}
        direction="up"
        duration={1000}
        triggerOnce
        fraction={0.5}
      >
        {trackName === "Sem música" ? (
          <div className="h-33 flex justify-center items-center py-4">
            <div className="w-8 h-8 border-4 border-pink-3 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div
              className="footer absolute h-1 transition-all"
              style={{ width: `${progress}%` }}
            />
            <div className="fixed w-full flex-1 bg-pink-6/30 h-1 rounded-full overflow-hidden bg-pink-4">
              <div
                className="bg-pink-2 h-full transition-all z-10"
                style={{ width: `${progress}%` }}
              />
              <FaSpotify className="text-pink-1" />
            </div>

            <div className="flex flex-col justify-center items-center gap-5 p-4 sm:flex-row sm:gap-0 sm:p-8 w-full text-pink-3">
              {/* Info da música */}
              <div className="flex flex-col gap-2 w-full sm:w-1/3">
                <div className="flex flex-col justify-center items-center sm:items-start w-full">
                  <span className="font-semibold">{trackName}</span>
                  <span className="text-xs opacity-70">{artistName}</span>
                </div>
              </div>
              {/* Controles */}
              <div className="relative flex items-center justify-between w-full sm:w-1/2">
                <div className="flex items-center justify-center sm:justify-start gap-6 w-full">
                  <IoPlaySkipBack
                    onClick={() => previousTrack(token)}
                    className="cursor-pointer text-xl hover:text-pink-1 transition"
                  />
                  <div
                    onClick={handleTogglePlay}
                    className="p-3 bg-pink-1 text-white rounded-full cursor-pointer transition hover:bg-red-2"
                  >
                    {play ? <IoPause /> : <IoPlay />}
                  </div>
                  <IoPlaySkipForward
                    onClick={() => nextTrack(token)}
                    className="cursor-pointer text-xl hover:text-pink-1 transition"
                  />
                </div>
                <div
                  className="absolute right-0 sm:static"
                  onClick={handleOpenPlaylist}
                >
                  <IoMenu className="cursor-pointer text-3xl hover:text-pink-1 transition" />
                </div>
              </div>
            </div>
            <PlaylistModal
              open={isModalOpen}
              onClose={handleClosePlaylist}
              token={token}
              playlistId="15Vi0mnqtTnNJWu43kWXO6"
            />
          </>
        )}
      </Slide>
    </footer>
  );
}

export default Footer;
