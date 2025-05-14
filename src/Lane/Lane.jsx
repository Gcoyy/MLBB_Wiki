import './Lane.css'
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";


function Lane() {
  const [lanes, setLanes] = useState([]);
  const [selectedLane, setSelectedLane] = useState();
  const [heroIndex, setHeroIndex] = useState(0);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const word = queryParams.get('word');
  const navigate = useNavigate();
  const [cardsVisible, setCardsVisible] = useState(4); // default for desktop
  const offsetPercent = cardsVisible === 2 ? 47 : cardsVisible > 2 ? 12.5 : 0;
  const maxIndex = useMemo(() => {
  if (!selectedLane) return 0;
  return Math.max(0, selectedLane.heroes.length - cardsVisible);
}, [selectedLane, cardsVisible]);


  useEffect(() => {
    setHeroIndex(0); // Reset to the first item when selectedLane changes
  }, [selectedLane]);

  const handleHeroChange = (index) => {
  if (index >= 0 && index <= selectedLane.heroes.length - cardsVisible) {
    setHeroIndex(index);
  }
};

  const handleLaneChange = (lane) => {
    setSelectedLane(lane);
  };

  const handleNext = () => {
  if (heroIndex < maxIndex) {
    setHeroIndex(heroIndex + 1);
  }
};

useEffect(() => {
  const handleResize = () => {
    const width = window.innerWidth;
    if (width < 768) {
      setCardsVisible(2); // mobile
    } else {
      setCardsVisible(3); // desktop
    }
  };

  handleResize(); // run once on load
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);

useEffect(() => {
  const fetchLaneData = async () => {
    const snapshot = await getDocs(collection(db, "lanes"));
    const laneDocs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setLanes(laneDocs);
    if (laneDocs.length > 0) {
      setSelectedLane(laneDocs[0]);
    }
  };

  fetchLaneData();
}, []);

if (!selectedLane) return <div>Loading...</div>;

  return (
    <div className="Lane">
      <div className="breadcrumb">
        <span className="breadcrumb-link" onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
          {word}
        </span>
        <span> / </span>
        <span className="breadcrumb-link">{selectedLane.name}</span>
      </div>
      <div className="container">
        {/* Sidebar */}
        <div className="sidebar">
          {lanes.map((lane) => (
            <button
              key={lane.id}
              onClick={() => handleLaneChange(lane)}
              className={`btn ${selectedLane.id === lane.id ? "active" : ""}`}
            >
              <img
                src={lane.icon}
                alt={lane.name}
                className="icon-sm"
                style={{ opacity: selectedLane.id === lane.id ? 1 : 0.25 }}
                title={lane.name}
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
            <img src={selectedLane.icon} alt={selectedLane.name} className="icon" title={selectedLane.name}/>
            <div className="line1" />
            <h1 className="lane-title">{selectedLane.name.toUpperCase()}</h1>
            <div className="line2" />
          </div>
          <div className="lane-content-right">
            <div className="heroes"  style={{ transform: `translateX(-${heroIndex * offsetPercent}vw)` }}>
              {selectedLane.heroes.map((hero, index) => (
                <div className="hero-card" key={hero.image} onClick={() => handleHeroChange(index)}>
                  <img src={hero.image} alt={hero.name} />
                  <div className="hero-label">{hero.name}</div>
                </div>
              ))}
            </div>

            <div className="carousel-btn-container" style={{ display: selectedLane.heroes.length > 3 || window.innerWidth < 768 ? 'flex' : 'none' }}>
              <button className="carousel-btn-prev" onClick={() => handleHeroChange(heroIndex - 1)}>‹</button>
              <button className="carousel-btn-next" onClick={handleNext}>›</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lane;


