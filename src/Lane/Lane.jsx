import './Lane.css'
import { useState } from "react";
import { Link } from "react-router-dom";

const lanes = [
    {
      id: "exp",
      name: "Exp Lane",
      icon: "/Exp Lane Icon.png",
      heroes: [
        "/images/exp-hero1.png",
        "/images/exp-hero2.png",
        "/images/exp-hero3.png",
        "/images/exp-hero4.png",
      ],
    },
    {
      id: "gold",
      name: "Gold Lane",
      icon: "/Gold Lane Icon.png",
      heroes: [
        "/images/gold-hero1.png",
        "/images/gold-hero2.png",
        "/images/gold-hero3.png",
        "/images/gold-hero4.png",
      ],
    },
    {
      id: "mid",
      name: "Mid Lane",
      icon: "/Mid Lane Icon.png",
      heroes: [
        "/images/mid-hero1.png",
        "/images/mid-hero2.png",
        "/images/mid-hero3.png",
        "/images/mid-hero4.png",
      ],
    },
    {
        id: "jungle",
        name: "Jungle",
        icon: "/Jungle Lane Icon.png",
        heroes: [
          "/images/jungle-hero1.png",
          "/images/jungle-hero2.png",
          "/images/jungle-hero3.png",
          "/images/jungle-hero4.png",
        ],
      },
      {
        id: "roam",
        name: "Roam",
        icon: "/Roam Lane Icon.png",
        heroes: [
          "/images/roam-hero1.png",
          "/images/roam-hero2.png",
          "/images/roam-hero3.png",
          "/images/roam-hero4.png",
        ],
      },
  ];

function Lane() {
    const [selectedLane, setSelectedLane] = useState(lanes[0]);

    return (
        <div className='Lane'>
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
                <div className="heroes">
                {selectedLane.heroes.map((hero, index) => (
                    <img
                    key={index}
                    src={hero}
                    alt={`Hero ${index + 1}`}
                    className="hero-card"
                    />
                ))}
                </div>
            </div>
            </div>
        </div>
      );
}

export default Lane;