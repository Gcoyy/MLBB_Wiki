import "./App.css"
import { Routes, Route } from "react-router-dom"
import Header from "./Header/Header"
import Home from "./Home/Home"
import Rank from "./pages/Warrior_GM"
import EpicLegend from "./pages/Epic_Legend"
import Mythic from "./pages/Mythic"
import MythicHonor from "./pages/MythicHonor"
import MythicGlory from "./pages/MythicGlory"
import Lane from "./Lane/Lane"
import ContactUs from "./ContactUs/ContactUs"
import About from "./About Us/AboutUs"
import SiteMap from "./SiteMap/SiteMap"
import FAQs from "./FAQs/FAQs"

function App() {
  return (
    <>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/warrior-gm" element={<Rank />} />
        <Route path="/epic-legend" element={<EpicLegend />} />
        <Route path="/mythic" element={<Mythic />} />
        <Route path="/mythical-honor" element={<MythicHonor />} />
        <Route path="/mythical-glory" element={<MythicGlory />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/lane" element={<Lane />} />
        <Route path="/SiteMap" element={<SiteMap />} /> 
        <Route path="/FAQs" element={<FAQs />} />
      </Routes>
    </>
  );
}

export default App;