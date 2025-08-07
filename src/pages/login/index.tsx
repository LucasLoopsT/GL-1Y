import { useRef, useState } from "react";

const clientId = "b31e0527dc634b89aaa349cc38d75f32";
const redirectUri = "https://lucasloopst.github.io/GL-1Y/callback";
const scope = [
  "streaming",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
].join(" ");

function Login() {
  const [values, setValues] = useState<string[]>(Array(8).fill(""));
  const [error, setError] = useState<string | null>(null);

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (value !== "" && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleLogin = () => {
    const fullDate = `${values[0]}${values[1]}/${values[2]}${values[3]}/${values[4]}${values[5]}${values[6]}${values[7]}`;

    if (fullDate === "08/08/2024") {
      const authUrl =
        `https://accounts.spotify.com/authorize?client_id=${clientId}` +
        `&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&scope=${encodeURIComponent(scope)}`;
      window.location.href = authUrl;
    } else {
      setError("Senha incorreta 😢");
      setValues(Array(8).fill(""));
      inputsRef.current[0]?.focus();
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-[80%] h-[85%] flex flex-col items-center justify-between gap-5 bg-purple-1 p-8 rounded-xl shadow-lg shadow-pri-6">
        <h2 className="text-pink-3 font-medium text-4xl text-center sm:text-5xl">
          Qual a senha?
        </h2>
        <p className="text-neutral-1 text-center">
          Digite a data do nosso aniversário para desbloquear!
        </p>
        {/* Container do aviso */}
        {error && (
          <div className="bg-red-500/20 border border-red-400 text-red-300 px-6 py-3 rounded-lg transition-all">
            {error}
          </div>
        )}

        <div className="flex flex-col items-center justify-center sm:flex-row gap-4 w-full h-1/2">
          <div className="flex flex-row items-center justify-center sm:flex-col gap-2 w-full sm:w-1/4">
            <h3 className="w-1/4 pr-5 sm:w-full text-xl text-center text-pink-4">
              Dia
            </h3>
            <div className="flex gap-2 w-3/4 sm:w-full h-15 sm:h-20">
              {[0, 1].map((i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  value={values[i]}
                  ref={(el) => {
                    inputsRef.current[i] = el;
                  }}
                  onChange={(e) => handleChange(i, e.target.value)}
                  className="w-1/2 h-full bg-pink-5 rounded-lg text-back-1 text-3xl sm:text-4xl font-bold text-center"
                />
              ))}
            </div>
          </div>

          <span className="text-neutral-1 text-5xl font-bold h-8 hidden sm:block">
            /
          </span>
          <div className="flex flex-row items-center justify-center sm:flex-col gap-2 w-full sm:w-1/4">
            <h3 className="w-1/4 pr-5 sm:w-full text-xl text-center text-pink-4">
              Mês
            </h3>
            <div className="flex gap-2 w-3/4 sm:w-full h-15 sm:h-20">
              {[2, 3].map((i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  value={values[i]}
                  ref={(el) => {
                    inputsRef.current[i] = el;
                  }}
                  onChange={(e) => handleChange(i, e.target.value)}
                  className="w-1/2 h-full bg-pink-5 rounded-lg text-back-1 text-3xl sm:text-4xl font-bold text-center"
                />
              ))}
            </div>
          </div>

          <span className="text-neutral-1 text-5xl font-bold h-8 hidden sm:block">
            /
          </span>
          <div className="flex flex-row items-center justify-center sm:flex-col gap-2 w-full sm:w-2/4">
            <h3 className="w-1/4 pr-5 sm:w-full text-xl text-center text-pink-4">
              Ano
            </h3>
            <div className="flex gap-2 w-3/4 sm:w-full h-15 sm:h-20">
              {[4, 5, 6, 7].map((i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  value={values[i]}
                  ref={(el) => {
                    inputsRef.current[i] = el;
                  }}
                  onChange={(e) => handleChange(i, e.target.value)}
                  className="w-1/2 h-full bg-pink-5 rounded-lg text-back-1 text-3xl sm:text-4xl font-bold text-center"
                />
              ))}
            </div>
          </div>
        </div>

        <button
          className="w-full sm:w-75 px-6 py-3 bg-pink-2 text-white text-3x1 font-bold rounded cursor-pointer hover:bg-pink-1 transition"
          onClick={handleLogin}
        >
          Desbloquear
        </button>
      </div>
    </div>
  );
}

export default Login;
