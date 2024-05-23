import React, { useEffect, useState } from "react";
import Hero from "../components/Landing/Hero";
import Feature from "../components/Landing/Feature";
import Footer from "../components/Landing/Footer";
import About from "../components/Landing/About";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {Link} from "react-router-dom"
import { axiosclient } from "../api/axiosClient";
import Card from "antd/es/card/Card";
import Sponsors from "../components/Landing/Sponsors";

export default function Landing() {
  const [formation, setFormation] = useState([]);
  const [slides, setSlides] = useState(3);
  const { Meta } = Card;
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
  useEffect(() => {
    const animationContainer = document.getElementById('lottie-container');

    const animationInstance = lottie.loadAnimation({
      container: animationContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://lottie.host/a964cc86-6365-4ba7-858d-0affab6d2072/QGuF4mSHzf.json',
    });

    // Clean up the animation instance on component unmount
    return () => {
      animationInstance.destroy();
    };
  }, []);
  return (
    <div>
      <Hero />
      <Feature />
      <Sponsors />
        <div style={{textAlign:"center"}}><h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Nos formations</h1></div>
        <br></br>
    <div style={{display:"flex",justifyContent:"center",flexWrap:"wrap"}}>
        <div key={1} className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
            <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                <img className="object-cover" src={"images/sddefault.jpg"} alt="product image" />
                <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">{formation.status}</span>
            </a>
            <div className="mt-4 px-5 pb-5">
                <a href="#">
                    <h5 className="text-xl tracking-tight text-slate-900">ISGI</h5>
                </a>
                <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                        <span className="text-3xl font-bold text-slate-900">{formation.duree_formation}React front end</span>&nbsp;&nbsp;&nbsp;
                        <br></br><span className="text-l text-slate-900">web developement</span>
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
        <div key={1} className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
            <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                <img className="object-cover" src={"images/img3.jpg"} alt="product image" />
                <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">{formation.status}</span>
            </a>
            <div className="mt-4 px-5 pb-5">
                <a href="#">
                    <h5 className="text-xl tracking-tight text-slate-900">ISGI</h5>
                </a>
                <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                        <span className="text-3xl font-bold text-slate-900">{formation.duree_formation}etude de marche</span>&nbsp;&nbsp;&nbsp;
                        <br></br> <span className="text-l text-slate-900">entrepreunariat</span>
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
        <div key={1} className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
            <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                <img className="object-cover" src={"images/img2.jpg"} alt="product image" />
                <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">{formation.status}</span>
            </a>
            <div className="mt-4 px-5 pb-5">
                <a href="#">
                    <h5 className="text-xl tracking-tight text-slate-900">ISGI</h5>
                </a>
                <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                        <span className="text-3xl font-bold text-slate-900">{formation.duree_formation}Soft skills</span>&nbsp;&nbsp;&nbsp;
                        <br></br><span className="text-l text-slate-900">Soft skills</span>
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
        </div>
        <br></br>
        <div style={{textAlign:"center","fontWeight":"bold"}}>Voir tous les formations -> </div>
        <br></br>

        <div style={{ display: "grid", gridTemplateColumns: "50% 50%", width: "100%","padding":"5%" }}>
  <div id="lottie-container" style={{ height: "90%" }}>
    {/* Animation content */}
  </div>
  <div style={{ width: "100%", height: "100%" }}>
    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Qui sommes nous</h1>
    <p className="mt-6 text-lg leading-8 text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia quod quam vitae sequi odit molestias consequuntur at suscipit facilis saepe doloribus beatae, repellat animi temporibus sint numquam ad cumque voluptates!</p>
  </div>
</div>

      <Footer />
    </div>
  );
}
