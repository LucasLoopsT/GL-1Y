import { useState, useEffect } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Slider from "react-slick";

function App() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    fade: false,
    cssEase: "ease-in-out",
  };

  const fotos = [
    "https://plus.unsplash.com/premium_photo-1731442837021-3929f70e1710?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGlyYXIlMjBmb3Rvc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1731442837021-3929f70e1710?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGlyYXIlMjBmb3Rvc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1731442837021-3929f70e1710?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGlyYXIlMjBmb3Rvc3xlbnwwfHwwfHx8MA%3D%3D",
  ];

  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    secs: 0,
  });

  useEffect(() => {
    const birth = new Date("2024-08-08T00:00:00");

    const updateTime = () => {
      const diff = new Date().getTime() - birth.getTime();

      const totalSecs = Math.floor(diff / 1000);
      const days = Math.floor(totalSecs / (60 * 60 * 24));
      const hours = Math.floor((totalSecs % (60 * 60 * 24)) / 3600);
      const minutes = Math.floor((totalSecs % 3600) / 60);
      const secs = totalSecs % 60;

      setTime({ days, hours, minutes, secs });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="hero" className="w-full flex flex-col justify-center items-center">
      <Header />
      <main className="w-full flex flex-col items-center mt-25 mb-15">
        <section id="carrossel" className="w-[80%] pt-16 mb-20">
          <div className="bg-back-2 p-8 pb-25 rounded-sm shadow-md h-max w-full">
            <Slider {...settings}>
              {fotos.map((foto, index) => (
                <div key={index} className="flex flex-col p-1 bg-transparent">
                  <img
                    className="h-100 w-full object-cover bg-contain bg-center rounded-sm sm:h-125"
                    src={foto}
                  />
                  <p className="mt-5 text-lg text-pink-4">Título da polaroid</p>
                </div>
              ))}
            </Slider>
          </div>
        </section>
        <section
          id="contador"
          className="w-full flex justify-center bg-back-2 p-16 mb-20"
        >
          <div className="w-[80%] flex flex-col items-center gap-10">
            <h2 className="text-2xl text-pink-3 !font-cursive font-bold italic">
              Hoje completamos:
            </h2>
            <div className="w-full grid grid-cols-1 grid-rows-4 gap-5 sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-4 md:grid-rows-1">
              <div className="flex flex-col items-center justify-center bg-purple-1 p-8 rounded-xl shadow-lg shadow-pri-6">
                <h2 className="text-5xl text-pink-3">{time.days}</h2>
                <p className="text-pink-2">Dias</p>
              </div>
              <div className="flex flex-col items-center justify-center bg-purple-1 p-8 rounded-xl shadow-lg shadow-pri-6">
                <h2 className="text-5xl text-pink-3">{time.hours}</h2>
                <p className="text-pink-2">Horas</p>
              </div>
              <div className="flex flex-col items-center justify-center bg-purple-1 p-8 rounded-xl shadow-lg shadow-pri-6">
                <h2 className="text-5xl text-pink-3">{time.minutes}</h2>
                <p className="text-pink-2">Minutos</p>
              </div>
              <div className="flex flex-col items-center justify-center bg-purple-1 p-8 rounded-xl shadow-lg shadow-pri-6">
                <h2 className="text-5xl text-pink-3">{time.secs}</h2>
                <p className="text-pink-2">Segundos</p>
              </div>
            </div>
            <h2 className="text-2xl text-pink-3 !font-cursive font-bold italic">
              Juntos!! Dá pra acreditar?
            </h2>
          </div>
        </section>
        <section id="carta" className="w-[80%] mb-20">
          <div className="flex flex-col items-center justify-center bg-back-2 p-8 rounded-xl shadow-md">
            <h2 className="text-3xl text-pink-3 mb-2">
              Carta aberta ao meu amor!
            </h2>
            <hr className="w-[70%] border-2 border-pink-3 opacity-50 mb-6" />
            <p className="text-pink-5  px-8 mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
              veritatis deleniti, reiciendis ut labore minima maxime sint, ipsum
              repellendus sit distinctio voluptatem quidem nisi eum beatae animi
              delectus cupiditate voluptate.
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
              veritatis deleniti, reiciendis ut labore minima maxime sint, ipsum
              repellendus sit distinctio voluptatem quidem nisi eum beatae animi
              delectus cupiditate voluptate.
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
              veritatis deleniti, reiciendis ut labore minima maxime sint, ipsum
              repellendus sit distinctio voluptatem quidem nisi eum beatae animi
              delectus cupiditate voluptate.
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
              veritatis deleniti, reiciendis ut labore minima maxime sint, ipsum
              repellendus sit distinctio voluptatem quidem nisi eum beatae animi
              delectus cupiditate voluptate.
            </p>
            <hr className="w-[70%] border-2 border-pink-3 opacity-50" />
          </div>
        </section>
      </main>
      <Footer token="99fe47692be246d099c64ae6b4ec0bb0" />
    </div>
  );
}

export default App;
