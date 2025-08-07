// src/service/spotifyService.ts
import axios from "axios";

const SPOTIFY_API = "https://api.spotify.com/v1";

/**
 * Pega os dados de uma playlist
 */
export const getPlaylistData = async (token: string, playlistId: string) => {
  const { data } = await axios.get(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};

/**
 * Inicia a reprodução de uma playlist
 */
export const playPlaylist = async (
  token: string,
  deviceId: string,
  playlistId: string,
  position: number = 0
) => {
  return axios.put(
    `${SPOTIFY_API}/me/player/play?device_id=${deviceId}`,
    {
      context_uri: `spotify:playlist/${playlistId}`,
      offset: { position },
      position_ms: 0,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

/**
 * Pausa ou continua a reprodução
 */
export const togglePlayback = async (token: string, isPlaying: boolean) => {
  const endpoint = isPlaying ? "pause" : "play";
  return axios.put(
    `${SPOTIFY_API}/me/player/${endpoint}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

/**
 * Vai para a próxima faixa
 */
export const nextTrack = async (token: string) => {
  return axios.post(
    `${SPOTIFY_API}/me/player/next`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

/**
 * Volta para a faixa anterior
 */
export const previousTrack = async (token: string) => {
  return axios.post(
    `${SPOTIFY_API}/me/player/previous`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

/**
 * Busca status atual do player
 */
export const getPlayerState = async (token: string) => {
  const { data } = await axios.get(`${SPOTIFY_API}/me/player`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
