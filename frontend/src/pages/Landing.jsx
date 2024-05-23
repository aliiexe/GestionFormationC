import Hero from "../components/Landing/Hero"
import Feature from "../components/Landing/Feature"
import Footer from "../components/Landing/Footer"
import About from "../components/Landing/About"
import Sponsors from "../components/Landing/Sponsors";

export default function Landing() {
  return (
    <div>
      <Hero />
      <Feature />
      <Sponsors />
      <About />
      <Footer />
    </div>
  )
}
