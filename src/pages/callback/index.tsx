import { useEffect } from "react";
import axios from "axios";

type CallbackProps = {
  onTokenReceived: () => void;
};

function Callback({ onTokenReceived }: CallbackProps) {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      const body = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: "http://127.0.0.1:5173/",
        client_id: "b31e0527dc634b89aaa349cc38d75f32",
        client_secret: "99fe47692be246d099c64ae6b4ec0bb0",
      });

      axios
        .post("https://accounts.spotify.com/api/token", body.toString(), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          const { access_token } = response.data;
          localStorage.setItem("spotify_token", access_token);
          onTokenReceived();
          window.history.replaceState({}, "", "/");
        })
        .catch((error) => {
          console.error("Erro ao pegar token", error);
        });
    }
  }, [onTokenReceived]);

  return <p>Conectando ao Spotify...</p>;
}

export default Callback;
