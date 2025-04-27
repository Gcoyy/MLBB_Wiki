import './Lane.css'
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const lanes = [
    {
      id: "exp",
      name: "Exp Lane",
      icon: "/Exp Lane Icon.png",
      heroes: [
        "/public/exp-hero1.png",
        "/public/exp-hero2.png",
        "/public/exp-hero3.png",
        "/public/exp-hero4.png",
      ],
    },
    {
      id: "mid",
      name: "Mid Lane",
      icon: "/Mid Lane Icon.png",
      heroes: [
        "/public/mid-hero1.png",
        "/public/mid-hero2.png",
        "/public/mid-hero3.png",
        // "/public/mid-hero4.png",
      ],
    },
    {
      id: "gold",
      name: "Gold Lane",
      icon: "/Gold Lane Icon.png",
      heroes: [
        "/public/gold-hero1.png",
        "/public/gold-hero2.png",
        "/public/gold-hero3.png",
        "/public/gold-hero4.png",
        "/public/gold-hero5.png",
        "/public/gold-hero6.png",
      ],
    },
    {
        id: "jungle",
        name: "Jungle",
        icon: "/Jungle Lane Icon.png",
        heroes: [
          "/public/jungle-hero1.png",
          "/public/jungle-hero2.png",
          "/public/jungle-hero3.png",
          "/public/jungle-hero4.png",
          "/public/jungle-hero5.png",
          "/public/jungle-hero6.png",
          "/public/jungle-hero7.png",
        ],
      },
      {
        id: "roam",
        name: "Roam",
        icon: "/Roam Lane Icon.png",
        heroes: [
          "/public/roam-hero1.png",
          "/public/roam-hero2.png",
          "/public/roam-hero3.png",
          // "/public/roam-hero4.png",
        ],
      },
  ];

function Lane() {
    const [selectedLane, setSelectedLane] = useState(lanes[0]);
    const [index, setIndex] = useState(0);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const word = queryParams.get('word');

    const next = () => {
      setIndex((index + 1) % selectedLane.heroes.length);
    };
  
    const prev = () => {
      setIndex((index - 1 + selectedLane.heroes.length) % selectedLane.heroes.length);
    };
  
    useEffect(() => {
      setIndex(0); // Reset to the first item when selectedLane changes
    }, [selectedLane]);

    return (
        <div className='Lane'>
           <div className='breadcrumb'> {word} <span>/</span> {selectedLane.name}</div>
            <div className="container">
            {/* Sidebar */}
            <div className="sidebar">
                {lanes.map((lane) => (
                <button
                    key={lane.id}
                    onClick={() => setSelectedLane(lane)}
                    className={`btn ${selectedLane.id === lane.id ? "active" : ""}`}
                >
                    <img
                        src={lane.icon}
                        alt={lane.name}
                        className="icon-sm"
                        style={{ opacity: selectedLane.id === lane.id ? 1 : 0.25 }}
                    />

                    <span className="lane-name">{lane.name}</span>
                </button>
                ))}
            </div>
        
            {/* Main Content */}
            <div className="main">
                <div className="lane-content-left">
                  <img src={selectedLane.icon} alt={selectedLane.name} className="icon" />
                  <div className='line'/>
                  <h1 className='lane-title'>{selectedLane.name.toUpperCase()}</h1>
                  <div className='line'/>
                </div>
                <div className='lane-content-right'>
                  <div className="heroes" style={{ transform: `translateX(-${index * 10}%)` }}>
                    {selectedLane.heroes.map((hero, index) => (
                      <div className="hero-card" key={index}>
                        <img src={hero} alt={`Hero ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                  
                  {selectedLane.heroes.length > 3 && (
                    <div className="carousel-btn-container">
                      <button className="carousel-btn-prev" onClick={prev}>‹</button>
                      <button className="carousel-btn-next" onClick={next}>›</button>
                    </div>
                  )}
                </div>
            </div>
            </div>
        </div>
      );
}

export default Lane;
