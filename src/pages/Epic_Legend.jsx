import React, { useEffect, useState } from "react";
import "../styles/Epic_Legend.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header.jsx";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

// Reusable components (could also import from shared components)
const RankHero = ({ role, heroes }) => (
  <div>
    <span className="el-rank-hero-text">
      {role}: {heroes?.join(", ") || "No heroes listed"}
    </span>
  </div>
);

const Strategy = ({ title, description }) => (
  <div className="el-strategy-text">
    <strong>{title}:</strong> {description}
  </div>
);

const EpicLegend = () => {
  const [rankData, setRankData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRankData = async () => {
      try {
        const docRef = doc(db, "ranks", "epic-legend");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setRankData(docSnap.data());
        } else {
          throw new Error("Epic-Legend data not found in database");
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
      <div className="el-loading-screen">
        <div className="el-loading-spinner"></div>
        <p>Loading Epic-Legend data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="el-error-screen">
        <h2>Error Loading Content</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!rankData) {
    return (
      <div className="el-no-data">
        <h2>No Data Available</h2>
        <p>The Epic-Legend content could not be loaded.</p>
      </div>
    );
  }

  // Main render
  return (
    <div className="el-mobile-legends-container">
      {/* Background image */}
      <img 
        className="el-background-image" 
        src="background.png" 
        alt="Mobile Legends background" 
      />

      {/* Sidebar Navigation */}
      <div className="el-rank-sidebar">
        <Link to="/warrior-gm" className="el-rank-title el-rank-title-inactive">
          WARRIOR - GRANDMASTER
          <div className="el-horizontal-line"></div>
        </Link>
        <div className="el-rank-title el-rank-title-active">
          EPIC - LEGEND
          <div className="el-horizontal-line"></div>
        </div>
        <Link to="/mythic" className="el-rank-title el-rank-title-inactive">
          MYTHIC
          <div className="el-horizontal-line"></div>
        </Link>
        <Link to="/mythical-honor" className="el-rank-title el-rank-title-inactive">
          MYTHICAL HONOR
          <div className="el-horizontal-line"></div>
        </Link>
        <Link to="/mythical-glory" className="el-rank-title el-rank-title-inactive">
          MYTHICAL GLORY
          <div className="el-horizontal-line"></div>
        </Link>

        {/* Rank Icons */}
        <Link to="/warrior-gm">
          <img 
            className="el-rank-icon el-rank-icon-inactive el-warrior-icon"
            src="Warrior.png"
            alt="Warrior rank icon"
          />
        </Link>
        <Link to="/warrior-gm">
          <img 
            className="el-rank-icon el-rank-icon-inactive el-grandmaster-icon"
            src="Grandmastur.png"
            alt="Grandmaster rank icon"
          />
        </Link>
        <div className="el-rank-separator el-rank-separator-inactive">-</div>

        <img 
          className="el-rank-icon el-rank-icon-active el-epic-icon"
          src="Epic.png"
          alt="Epic rank icon"
        />
        <img 
          className="el-rank-icon el-rank-icon-active el-legend-icon"
          src="Legend.png"
          alt="Legend rank icon"
        />
        <div className="el-rank-separator el-rank-separator-inactive">-</div>

        <Link to="/mythic">
          <img 
            className="el-rank-icon el-rank-icon-inactive el-mythic-icon"
            src="Mythic.png"
            alt="Mythic rank icon"
          />
        </Link>
        <Link to="/mythical-honor">
          <img 
            className="el-rank-icon el-rank-icon-inactive el-mythical-honor-icon"
            src="MythicHonor.png"
            alt="Mythical Honor rank icon"
          />
        </Link>
        <Link to="/mythical-glory">
          <img 
            className="el-rank-icon el-rank-icon-inactive el-mythical-glory-icon"
            src="MythicGlory.png"
            alt="Mythical Glory rank icon"
          />
        </Link>
      </div>

      <Header />

      {/* Dynamic Content Area */}
      <div className="el-main-title">{rankData.title}</div>
      <div className="el-vertical-line"></div>
      <div className="el-subtitle">{rankData.subtitle}</div>

      <div className="el-content-container">
        <div className="el-content-area">
          {/* Overview Section */}
          <div className="el-content-card">
            <h2 className="el-section-title">Overview</h2>
            <ul className="el-feature-list">
              {rankData.overview.map((item, index) => (
                <li key={`overview-${index}`} className="el-feature-item">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Strategies Section */}
          <div className="el-content-card">
            <h2 className="el-section-title">Key Strategies</h2>
            <div className="el-strategies-grid">
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
          <div className="el-content-card">
            <h2 className="el-section-title">Recommended Heroes</h2>
            <div className="el-heroes-grid">
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

export default EpicLegend;