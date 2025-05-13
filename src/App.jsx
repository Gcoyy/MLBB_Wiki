import "./App.css"
import { Routes, Route } from "react-router-dom"
import Header from "./Header/Header"
import Home from "./Home/Home"
import WarriorGM from "./pages/Warrior_GM.jsx";
import EpicLegend from "./pages/Epic_Legend.jsx";
import Mythic from "./pages/Mythic.jsx";
import MythicalHonor from "./pages/MythicHonor.jsx";
import MythicalGlory from "./pages/MythicGlory.jsx";
import Lane from "./Lane/Lane"
import ContactUs from "./ContactUs/ContactUs.jsx";
import About from "./About Us/AboutUs"
import SiteMap from "./SiteMap/SiteMap"
import FAQs from "./FAQs/FAQs"

function App() {
  return (
    <>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/warrior-gm" element={<WarriorGM />} />
        <Route path="/epic-legend" element={<EpicLegend />} />
        <Route path="/mythic" element={<Mythic />} />
        <Route path="/mythical-honor" element={<MythicalHonor />} />
        <Route path="/mythical-glory" element={<MythicalGlory />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/lane" element={<Lane />} />
        <Route path="/SiteMap" element={<SiteMap />} /> 
        <Route path="/FAQs" element={<FAQs />} />
      </Routes>
    </>
  );
}

export default App;