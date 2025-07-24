const clientId = "b31e0527dc634b89aaa349cc38d75f32";
const redirectUri = "http://localhost:5173"; // mesmo que no seu app do Spotify
const scope = [
  "streaming",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
].join(" ");

function Login() {
  const handleLogin = () => {
    const authUrl =
      `https://accounts.spotify.com/authorize?client_id=${clientId}` +
      `&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scope)}`;

    window.location.href = authUrl;
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <button
        className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-500 transition"
        onClick={handleLogin}
      >
        Login com Spotify
      </button>
    </div>
  );
}

export default Login;
