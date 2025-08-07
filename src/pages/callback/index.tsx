import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      const body = new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "https://lucasloopst.github.io/GL-1Y/#/callback",
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
          navigate("/home");
        })
        .catch((error) => {
          console.error("Erro ao pegar token", error);
        });
    }
  }, [navigate]);

  return <p>Conectando ao Spotify...</p>;
}

export default Callback;
