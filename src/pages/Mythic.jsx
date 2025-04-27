import React, { useEffect, useState } from "react";
import "../styles/Mythic.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header.jsx";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

// Reusable components
const RankHero = ({ role, heroes }) => (
  <div>
    <span className="mythic-rank-hero-text">
      {role}: {heroes?.join(", ") || "No heroes listed"}
    </span>
  </div>
);

const Strategy = ({ title, description }) => (
  <div className="mythic-strategy-text">
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
      <div className="mythic-loading-screen">
        <div className="mythic-loading-spinner"></div>
        <p>Loading Mythic data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mythic-error-screen">
        <h2>Error Loading Content</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!rankData) {
    return (
      <div className="mythic-no-data">
        <h2>No Data Available</h2>
        <p>The Mythic content could not be loaded.</p>
      </div>
    );
  }

  // Main render
  return (
    <div className="mythic-mobile-legends-container">
      {/* Background image */}
      <img 
        className="mythic-background-image" 
        src="background.png" 
        alt="Mobile Legends background" 
      />

      {/* Sidebar Navigation */}
      <div className="wg-rank-sidebar">
        <Link to="/warrior-gm" className="wg-rank-title wg-rank-title-inactive">
          WARRIOR - GRANDMASTER
          <div className="wg-horizontal-line"></div>
        </Link>
        <Link to="/epic-legend" className="wg-rank-title wg-rank-title-inactive">
          EPIC - LEGEND
          <div className="wg-horizontal-line"></div>
        </Link>
        <div className="wg-rank-title wg-rank-title-active">
          MYTHIC
          <div className="wg-horizontal-line"></div>
        </div>
        <Link to="/mythical-honor" className="wg-rank-title wg-rank-title-inactive">
          MYTHICAL HONOR
          <div className="wg-horizontal-line"></div>
        </Link>
        <Link to="/mythical-glory" className="wg-rank-title wg-rank-title-inactive">
          MYTHICAL GLORY
          <div className="wg-horizontal-line"></div>
        </Link>

        {/* Rank Icons */}
        <Link to="/warrior-gm">
          <img 
            className="wg-rank-icon wg-rank-icon-inactive wg-warrior-icon"
            src="Warrior.png"
            alt="Warrior rank icon"
          />
        </Link>
        <Link to="/warrior-gm">
          <img 
            className="wg-rank-icon wg-rank-icon-inactive wg-grandmaster-icon"
            src="Grandmastur.png"
            alt="Grandmaster rank icon"
          />
        </Link>
        <div className="wg-rank-separator wg-rank-separator-inactive">-</div>

        <Link to="/epic-legend">
          <img 
            className="wg-rank-icon wg-rank-icon-inactive wg-epic-icon"
            src="Epic.png"
            alt="Epic rank icon"
          />
        </Link>
        <Link to="/epic-legend">
          <img 
            className="wg-rank-icon wg-rank-icon-inactive wg-legend-icon"
            src="Legend.png"
            alt="Legend rank icon"
          />
        </Link>
        <div className="wg-rank-separator wg-rank-separator-inactive">-</div>

        <img 
          className="wg-rank-icon wg-rank-icon-active wg-mythic-icon"
          src="Mythic.png"
          alt="Mythic rank icon"
        />
        <Link to="/mythical-honor">
          <img 
            className="wg-rank-icon wg-rank-icon-inactive wg-mythical-honor-icon"
            src="MythicHonor.png"
            alt="Mythical Honor rank icon"
          />
        </Link>
        <Link to="/mythical-glory">
          <img 
            className="wg-rank-icon wg-rank-icon-inactive wg-mythical-glory-icon"
            src="MythicGlory.png"
            alt="Mythical Glory rank icon"
          />
        </Link>
      </div>

      <Header />

      {/* Dynamic Content Area */}
      <div className="mythic-main-title">{rankData.title}</div>
      <div className="mythic-vertical-line"></div>
      <div className="mythic-subtitle">{rankData.subtitle}</div>

      <div className="mythic-content-container">
        <div className="mythic-content-area">
          {/* Overview Section */}
          <div className="mythic-content-card">
            <h2 className="mythic-section-title">Overview</h2>
            <ul className="mythic-feature-list">
              {rankData.overview.map((item, index) => (
                <li key={`overview-${index}`} className="mythic-feature-item">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Strategies Section */}
          <div className="mythic-content-card">
            <h2 className="mythic-section-title">Key Strategies</h2>
            <div className="mythic-strategies-grid">
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
          <div className="mythic-content-card">
            <h2 className="mythic-section-title">Recommended Heroes</h2>
            <div className="mythic-heroes-grid">
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
    </div>
  );
};

export default Mythic;