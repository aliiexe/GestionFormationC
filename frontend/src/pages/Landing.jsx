import React, { useEffect, useState } from "react";
import Hero from "../components/Landing/Hero";
import Feature from "../components/Landing/Feature";
import Footer from "../components/Landing/Footer";
import About from "../components/Landing/About";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { axiosclient } from "../api/axiosClient";

export default function Landing() {
  const [formation, setFormation] = useState([]);
  const [slides, setSlides] = useState(3);

  useEffect(() => {
    axiosclient.get('/formation').then((response) => {
      setFormation(response.data);
    });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slides,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Hero />
      <Feature />
      <Slider {...settings} className="theslider">
        {formation.map((formation) => (
          <div key={formation.id} className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
            <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
              <img className="object-cover" src={"images/" + formation.image} alt="product image" />
              <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">{formation.status}</span>
            </a>
            <div className="mt-4 px-5 pb-5">
              <a href="#">
                <h5 className="text-xl tracking-tight text-slate-900">{formation.intitule_theme}</h5>
              </a>
              <div className="mt-2 mb-5 flex items-center justify-between">
                <p>
                  <span className="text-3xl font-bold text-slate-900">{formation.duree_formation}h</span>&nbsp;&nbsp;&nbsp;
                  <span className="text-l text-slate-900">{formation.domaines.nom_domaine}</span>
                </p>
              </div>
              <a href="#" className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M14.707 10.707a1 1 0 0 0-1.414-1.414L10 12.586 7.707 10.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l5-5z" />
                </svg>
                Voir plus
              </a>
            </div>
          </div>
        ))}
      </Slider>
      <About />
      <Footer />
    </div>
  );
}
