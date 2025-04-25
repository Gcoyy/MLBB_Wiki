import "./App.css"
import { Routes, Route } from "react-router-dom"
import Header from "./Header/Header"
import Home from "./Home/Home"
// import Rank from "./Rank/Rank"
import Lane from "./Lane/Lane"
// import Contact from "./Contact/Contact"
// import About from "./About/About"
import SiteMap from "./SiteMap/SiteMap"
import FAQs from "./FAQs/FAQs"

function App() {
  return (
    <>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/rank" element={<Rank />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />*/}
        <Route path="/lane" element={<Lane />} ></Route>
        <Route path="/SiteMap" element={<SiteMap />} /> 
        <Route path="/FAQs" element={<FAQs />} />
      </Routes>
    </>
  );
}

export default App;
