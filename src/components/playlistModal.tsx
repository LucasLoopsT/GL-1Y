// components/PlaylistModal.tsx
import { useEffect, useState } from "react";

export default function PlaylistModal({
  open,
  onClose,
  token,
  playlistId,
}: {
  open: boolean;
  onClose: () => void;
  token: string;
  playlistId: string;
}) {
  const [playlist, setPlaylist] = useState<any>(null);

  useEffect(() => {
    if (open) {
      import("../service/spotify").then(({ getPlaylistData }) =>
        getPlaylistData(token, playlistId).then(setPlaylist)
      );
    }
  }, [open]);

  if (!open || !playlist) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-pink-5 p-6 max-w-lg w-full rounded-lg shadow-xl max-h-[90vh] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl font-bold text-pink-1 hover:text-red-2 cursor-pointer"
        >
          ×
        </button>
        <h2 className="text-xl font-bold text-pink-2 mb-2">{playlist.name}</h2>
        <p className="text-sm text-pink-2 mb-4">
          By {playlist.owner.display_name}
        </p>

        <ul className="space-y-2 text-sm overflow-y-auto h-75 max-h-75 py-4 pr-5 border-y-2 border-pink-4">
          {playlist.tracks.items.map((item: any, index: number) => {
            const track = item.track;
            const minutes = Math.floor(track.duration_ms / 60000);
            const seconds = Math.floor((track.duration_ms % 60000) / 1000)
              .toString()
              .padStart(2, "0");

            return (
              <li key={track.id} className="flex justify-between text-pink-2">
                <div>
                  {index + 1}. {track.name}
                  <span className="text-pink-3">
                    {" "}
                    — {track.artists[0]?.name}
                  </span>
                </div>
                <span>
                  {minutes}:{seconds}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
