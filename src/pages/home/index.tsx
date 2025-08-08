import { useState, useEffect } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Slider from "react-slick";
import confetti from "canvas-confetti";
import { Zoom, Slide } from "react-awesome-reveal";
import { fotos } from "../../components/carrossel";

function Home() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScSlide: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 10000,
    pauseOnHover: true,
    fade: false,
    cssEase: "ease-in-out",
  };

  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    secs: 0,
  });

  var defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ["star"],
    });

    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ["circle"],
    });
  }

  useEffect(() => {
    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  }, []);

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
    <div
      id="hero"
      className="relative w-full flex flex-col justify-center items-center"
    >
      <Header />
      <main className="w-full flex flex-col items-center mt-18">
        <section id="carrossel" className="w-[80%] my-8">
          <Zoom delay={200} duration={1000} triggerOnce fraction={0.5}>
            <div className="bg-back-2 p-8 pb-25 rounded-sm shadow-md h-105 sm:h-max w-full">
              <Slider {...settings}>
                {fotos.map((foto, index) => (
                  <div key={index} className="flex flex-col p-1 bg-transparent">
                    <img
                      className="h-75 w-full object-cover bg-cover bg-center rounded-sm sm:h-125"
                      src={foto.url}
                      alt={foto.title}
                    />
                    <p className="mt-5 text-sm sm:text-md text-pink-4">
                      {foto.title}
                    </p>
                  </div>
                ))}
              </Slider>
            </div>
          </Zoom>
        </section>
        <section
          id="contador"
          className="w-full flex justify-center bg-back-2 p-8 sm:p-16 mb-8"
        >
          <Slide direction="up" duration={1000} triggerOnce fraction={0.5}>
            <div className="w-full flex flex-col items-center gap-10">
              <h2 className="text-xl sm:text-2xl text-center text-pink-3 !font-cursive font-bold italic">
                Hoje completamos:
              </h2>
              <div className="w-full grid grid-cols-1 grid-rows-4 gap-5 sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-4 md:grid-rows-1">
                <div className="flex flex-col items-center justify-center min-w-32 bg-purple-1 p-2 md:p-8 rounded-xl shadow-lg shadow-pri-6">
                  <h2 className="text-2xl sm:text-4xl text-pink-3">
                    {time.days}
                  </h2>
                  <p className="text-sm sm:text-md text-pink-2">Dias</p>
                </div>
                <div className="flex flex-col items-center justify-center min-w-32 bg-purple-1 p-2 md:p-8 rounded-xl shadow-lg shadow-pri-6">
                  <h2 className="text-2xl sm:text-4xl text-pink-3">
                    {time.hours}
                  </h2>
                  <p className="text-sm sm:text-md text-pink-2">Horas</p>
                </div>
                <div className="flex flex-col items-center justify-center min-w-32 bg-purple-1 p-2 md:p-8 rounded-xl shadow-lg shadow-pri-6">
                  <h2 className="text-2xl sm:text-4xl text-pink-3">
                    {time.minutes}
                  </h2>
                  <p className="text-sm sm:text-md text-pink-2">Minutos</p>
                </div>
                <div className="flex flex-col items-center justify-center min-w-32 bg-purple-1 p-2 md:p-8 rounded-xl shadow-lg shadow-pri-6">
                  <h2 className="text-2xl sm:text-4xl text-pink-3">
                    {time.secs}
                  </h2>
                  <p className="text-sm sm:text-md text-pink-2">Segundos</p>
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl text-center text-pink-3 !font-cursive font-bold italic">
                Juntos!! Dá pra acreditar?
              </h2>
            </div>
          </Slide>
        </section>
        <section id="carta" className="w-[80%] mb-40 sm:mb-20">
          <Slide direction="up" duration={1000} triggerOnce fraction={0.5}>
            <div className="flex flex-col items-center justify-center bg-back-2 p-8 rounded-xl shadow-md">
              <h2 className="text-2xl sm:text-3xl text-pink-3 text-center mb-2">
                Carta aberta ao meu amor!
              </h2>
              <hr className="w-[70%] border-2 border-pink-3 opacity-50 mb-6" />
              <p className="text-sm md:text-md text-pink-5 md:px-4 mb-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                veritatis deleniti, reiciendis ut labore minima maxime sint,
                ipsum repellendus sit distinctio voluptatem quidem nisi eum
                beatae animi delectus cupiditate voluptate.
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                veritatis deleniti, reiciendis ut labore minima maxime sint,
                ipsum repellendus sit distinctio voluptatem quidem nisi eum
                beatae animi delectus cupiditate voluptate.
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                veritatis deleniti, reiciendis ut labore minima maxime sint,
                ipsum repellendus sit distinctio voluptatem quidem nisi eum
                beatae animi delectus cupiditate voluptate.
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                veritatis deleniti, reiciendis ut labore minima maxime sint,
                ipsum repellendus sit distinctio voluptatem quidem nisi eum
                beatae animi delectus cupiditate voluptate.
              </p>
              <hr className="w-[70%] border-2 border-pink-3 opacity-50" />
            </div>
          </Slide>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
