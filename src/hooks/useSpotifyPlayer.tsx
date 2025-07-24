/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useSpotifyPlayer.ts
import { useEffect, useRef, useState } from "react";

export function useSpotifyPlayer(token: string) {
  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const readyRef = useRef(false);

  useEffect(() => {
    if (!token || readyRef.current) return;

    const interval = setInterval(() => {
      if ((window as any).Spotify) {
        clearInterval(interval);
        const spotifyPlayer = new (window as any).Spotify.Player({
          name: "Meu Player React",
          getOAuthToken: (cb: any) => cb(token),
          volume: 0.5,
        });

        spotifyPlayer.addListener("ready", ({ device_id }: any) => {
          console.log("Spotify player ready:", device_id);
          setDeviceId(device_id);
        });

        spotifyPlayer.addListener("not_ready", ({ device_id }: any) => {
          console.log("Spotify player offline", device_id);
        });

        spotifyPlayer.connect();
        setPlayer(spotifyPlayer);
        readyRef.current = true;
      }
    }, 100);

    return () => clearInterval(interval);
  }, [token]);

  return { player, deviceId };
}
