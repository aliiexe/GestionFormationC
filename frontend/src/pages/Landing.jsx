import Hero from "../components/Landing/Hero"
import Feature from "../components/Landing/Feature"
import Footer from "../components/Landing/Footer"
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

export default function Landing() {
  return (
    <div>
      <Hero />
      <Feature />
      <Footer />
    </div>
  )
}
