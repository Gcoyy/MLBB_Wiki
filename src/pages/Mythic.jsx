import React, { useEffect, useState } from "react";
import "../styles/Mythic.css";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Header from "../Header/Header.jsx";

// Reusable components
const RankHero = ({ role, heroes }) => (
  <div>
    <span className="my-rank-hero-text">
      {role}: {heroes?.join(", ") || "No heroes listed"}
    </span>
  </div>
);

const Strategy = ({ title, description }) => (
  <div className="my-strategy-text">
    <strong>{title}:</strong> {description}
  </div>
);

const Mythic = () => {
  const [rankData, setRankData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRankData = async () => {
      try {
        const docRef = doc(db, "ranks", "mythic");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setRankData(docSnap.data());
        } else {
          throw new Error("Mythic data not found in database");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRankData();
  }, []);

  // Render loading/error states
  if (loading) {
    return (
      <div className="my-loading-screen">
        <div className="my-loading-spinner"></div>
        <p>Loading Mythic data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-error-screen">
        <h2>Error Loading Content</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!rankData) {
    return (
      <div className="my-no-data">
        <h2>No Data Available</h2>
        <p>The Mythic content could not be loaded.</p>
      </div>
    );
  }

  // Main render
  return (
    <>
      <Header />
      <div className="my-mobile-legends-container">
        {/* Background image */}
        <img 
          className="my-background-image" 
          src="Background.png" 
          alt="Mobile Legends background" 
        />

        {/* Desktop Sidebar Navigation - hidden on mobile */}
        <div className="my-rank-sidebar">
          {/* Warrior - Grandmaster Group */}
          <div className="my-rank-group">
            <div className="my-rank-icons">
              <Link to="/warrior-gm">
                <img className="my-rank-icon my-rank-icon-inactive" src="Warrior.png" alt="Warrior rank icon" />
              </Link>
              <div className="my-rank-separator">-</div>
              <Link to="/warrior-gm">
                <img className="my-rank-icon my-rank-icon-inactive" src="Grandmastur.png" alt="Grandmaster rank icon" />
              </Link>
            </div>
            <Link to="/warrior-gm" className="my-rank-title my-rank-title-inactive">
              WARRIOR - GRANDMASTER
              <div className="my-horizontal-line"></div>
            </Link>
          </div>

          {/* Epic - Legend Group */}
          <div className="my-rank-group">
            <div className="my-rank-icons">
              <Link to="/epic-legend">
                <img className="my-rank-icon my-rank-icon-inactive" src="Epic.png" alt="Epic rank icon" />
              </Link>
              <div className="my-rank-separator">-</div>
              <Link to="/epic-legend">
                <img className="my-rank-icon my-rank-icon-inactive" src="Legend.png" alt="Legend rank icon" />
              </Link>
            </div>
            <Link to="/epic-legend" className="my-rank-title my-rank-title-inactive">
              EPIC - LEGEND
              <div className="my-horizontal-line"></div>
            </Link>
          </div>

          {/* Mythic Group */}
          <div className="my-rank-group">
            <div className="my-rank-icons">
              <img className="my-rank-icon my-rank-icon-active" src="Mythic.png" alt="Mythic rank icon" />
            </div>
            <div className="my-rank-title my-rank-title-active">
              MYTHIC
              <div className="my-horizontal-line"></div>
            </div>
          </div>

          {/* Mythical Honor Group */}
          <div className="my-rank-group">
            <div className="my-rank-icons">
              <Link to="/mythical-honor">
                <img className="my-rank-icon my-rank-icon-inactive" src="MythicHonor.png" alt="Mythical Honor rank icon" />
              </Link>
            </div>
            <Link to="/mythical-honor" className="my-rank-title my-rank-title-inactive">
              MYTHICAL HONOR
              <div className="my-horizontal-line"></div>
            </Link>
          </div>

          {/* Mythical Glory Group */}
          <div className="my-rank-group">
            <div className="my-rank-icons">
              <Link to="/mythical-glory">
                <img className="my-rank-icon my-rank-icon-inactive" src="MythicGlory.png" alt="Mythical Glory rank icon" />
              </Link>
            </div>
            <Link to="/mythical-glory" className="my-rank-title my-rank-title-inactive">
              MYTHICAL GLORY
              <div className="my-horizontal-line"></div>
            </Link>
          </div>
        </div>

        {/* Vertical separator line */}
        <div className="my-vertical-line"></div>

        {/* Dynamic Content Area */}
        <div className="my-content-container">
          <div className="my-main-title">{rankData.title}</div>
          <div className="my-subtitle">{rankData.subtitle}</div>

          <div className="my-content-area">
            {/* Overview Section */}
            <div className="my-content-card">
              <h2 className="my-section-title">Overview</h2>
              <ul className="my-feature-list">
                {rankData.overview.map((item, index) => (
                  <li key={`overview-${index}`} className="my-feature-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Strategies Section */}
            <div className="my-content-card">
              <h2 className="my-section-title">Key Strategies</h2>
              <div className="my-strategies-grid">
                {rankData.strategies.map((strategy, index) => (
                  <Strategy 
                    key={`strategy-${index}`}
                    title={strategy.title} 
                    description={strategy.description} 
                  />
                ))}
              </div>
            </div>

            {/* Recommended Heroes */}
            <div className="my-content-card">
              <h2 className="my-section-title">Recommended Heroes</h2>
              <div className="my-heroes-grid">
                {Object.entries(rankData.recommendedHeroes).map(([role, heroes]) => (
                  <RankHero 
                    key={`hero-${role}`}
                    role={role} 
                    heroes={heroes} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Rank Icons - shown only on mobile */}
        <div className="my-rank-icons-container">
          <Link to="/warrior-gm">
            <img 
              className="my-rank-icon my-rank-icon-inactive"
              src="Warrior.png"
              alt="Warrior rank icon"
            />
          </Link>
          <Link to="/epic-legend">
            <img 
              className="my-rank-icon my-rank-icon-inactive"
              src="Epic.png"
              alt="Epic rank icon"
            />
          </Link>
          <img 
            className="my-rank-icon my-rank-icon-active"
            src="Mythic.png"
            alt="Mythic rank icon"
          />
          <Link to="/mythical-honor">
            <img 
              className="my-rank-icon my-rank-icon-inactive"
              src="MythicHonor.png"
              alt="Mythical Honor rank icon"
            />
          </Link>
          <Link to="/mythical-glory">
            <img 
              className="my-rank-icon my-rank-icon-inactive"
              src="MythicGlory.png"
              alt="Mythical Glory rank icon"
            />
          </Link>
        </div>
        <Link to="/lane" className="lanes-float-button">
          <span>More on Lanes</span>
          <img src="/arrow.png" alt="Arrow" className="lanes-arrow-icon" />
        </Link>
      </div>
    </>
  );
};

export default Mythic;