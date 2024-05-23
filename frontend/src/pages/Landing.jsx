import Hero from "../components/Landing/Hero"
import Feature from "../components/Landing/Feature"
import Footer from "../components/Landing/Footer"
import About from "../components/Landing/About"
import { motion, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import Slider from "react-slick";
import { useState } from "react";
export default function Landing() {
  const [formation,setformation]=useState([])
  useEffect(()=>{

  },[])
  const[slides,setslides]=useState(4)
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: slides,
      slidesToScroll: 3,
      
    };
  return (
    <div>
      <Hero />
      <Feature />
      <Slider {...settings} className="theslider">
      {formation.map((ele) => (<>
      <Card
              
              hoverable key={ele.id} style={{  width: 180,}} cover={<img alt="example" style={{height:"250px"}} 
              src={"../public/images/"+ele.image} />}>
                <Meta title={<Link to={"/book/"+ele.id}>{ele.nom}</Link>} description={<div>
                  <div style={{display:"flex","justifyContent":"space-between"}}>{ele.autheur} 
                  <ShoppingCartOutlined className="cart" onClick={()=>addcart(ele.id)}/> </div>
                  <br></br>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                  <div>{ele.prix_vente} dh</div><div>{ele.genre.name}</div></div>
                </div>}/></Card>

         </> ))}
      </Slider>
      <About />
      <Footer />
    </div>
  )
}
