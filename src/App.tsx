import { useState, useEffect } from "react";
import Login from "./pages/login";
import Callback from "./pages/callback";
import Home from "./pages/home";

function App() {
  const [page, setPage] = useState<"login" | "callback" | "home">("login");

  useEffect(() => {
    localStorage.removeItem("spotify_token");
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const token = localStorage.getItem("spotify_token");

    if (token) {
      setPage("home");
      window.history.replaceState({}, "", "/");
    } else if (code) {
      setPage("callback");
    } else {
      setPage("login");
    }
  }, []);

  if (page === "login") {
    return <Login />;
  }
  if (page === "callback") {
    return (
      <Callback
        onTokenReceived={() => {
          return setPage("home");
        }}
      />
    );
  }
  if (page === "home") {
    return <Home />;
  }

  return <p>Carregando...</p>;
}

export default App;
