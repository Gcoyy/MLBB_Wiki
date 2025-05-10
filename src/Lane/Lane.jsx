import './Lane.css'
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";


const lanes = [
    {
      id: "exp",
      name: "Exp Lane",
      icon: "/Exp Lane Icon.png",
      heroes: [
        "/exp-hero1.png",
        "/exp-hero2.png",
        "/exp-hero3.png",
        "/exp-hero4.png",
      ],
    },
    {
      id: "mid",
      name: "Mid Lane",
      icon: "/Mid Lane Icon.png",
      heroes: [
        "/mid-hero1.png",
        "/mid-hero2.png",
        "/mid-hero3.png",
        // "/mid-hero4.png",
      ],
    },
    {
      id: "gold",
      name: "Gold Lane",
      icon: "/Gold Lane Icon.png",
      heroes: [
        "/gold-hero1.png",
        "/gold-hero2.png",
        "/gold-hero3.png",
        "/gold-hero4.png",
        "/gold-hero5.png",
        "/gold-hero6.png",
      ],
    },
    {
        id: "jungle",
        name: "Jungle",
        icon: "/Jungle Lane Icon.png",
        heroes: [
          "/jungle-hero1.png",
          "/jungle-hero2.png",
          "/jungle-hero3.png",
          "/jungle-hero4.png",
          "/jungle-hero5.png",
          "/jungle-hero6.png",
          "/jungle-hero7.png",
        ],
      },
      {
        id: "roam",
        name: "Roam",
        icon: "/Roam Lane Icon.png",
        heroes: [
          "/roam-hero1.png",
          "/roam-hero2.png",
          "/roam-hero3.png",
          // "/roam-hero4.png",
        ],
      },
  ];

function Lane() {
    const [selectedLane, setSelectedLane] = useState(lanes[0]);
    const [index, setIndex] = useState(0);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const word = queryParams.get('word');
    const navigate = useNavigate();

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
           <div className='breadcrumb'>
              <span className="breadcrumb-link" onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
                {word}
              </span>
              <span> / </span> 
              <span className='breadcrumb-link'>{selectedLane.name}</span>
            </div>
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
                    {selectedLane.id === lane.id && (
                      <span className="lane-name">{lane.name}</span>
                    )}
                </button>
                ))}
            </div>
        
            {/* Main Content */}
            <div className="main">
                <div className="lane-content-left">
                  <img src={selectedLane.icon} alt={selectedLane.name} className="icon" />
                  <div className='line1'/>
                  <h1 className='lane-title'>{selectedLane.name.toUpperCase()}</h1>
                  <div className='line2'/>
                </div>
                <div className='lane-content-right'>
                  <div className="heroes" style={{ transform: `translateX(-${index * 10}%)` }}>
                    {selectedLane.heroes.map((hero) => (
                      <div className="hero-card" key={hero}>
                        <img src={hero} alt={`Hero ${hero + 1}`} />
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
