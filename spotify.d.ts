/* eslint-disable @typescript-eslint/no-explicit-any */
// src/spotify.d.ts

export {};

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: any;
  }

  const Spotify: any;
}
