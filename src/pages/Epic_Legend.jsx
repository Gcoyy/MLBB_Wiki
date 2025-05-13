import React, { useEffect, useState } from "react";
import "../styles/Epic_Legend.css";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

// Reusable components
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

const Tooltip = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="el-tooltip-container" 
         onMouseEnter={() => setIsVisible(true)}
         onMouseLeave={() => setIsVisible(false)}>
      {children}
      {isVisible && <div className="el-tooltip">{content}</div>}
    </div>
  );
};

const EpicLegend = () => {
  const [rankData, setRankData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLaneTooltip, setShowLaneTooltip] = useState(false);

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
    <>
      <div className="el-mobile-legends-container">
        {/* Background image with tooltip */}
        <Tooltip content="Mobile Legends background image">
          <img 
            className="el-background-image" 
            src="Background.png" 
            alt="Mobile Legends background" 
          />
        </Tooltip>

        {/* Desktop Sidebar Navigation - hidden on mobile */}
        <div className="el-rank-sidebar">
          {/* Warrior - Grandmaster Group */}
          <div className="el-rank-group">
            <div className="el-rank-icons">
              <Tooltip content="Warrior Rank">
                <Link to="/warrior-gm">
                  <img className="el-rank-icon el-rank-icon-inactive" src="Warrior.png" alt="Warrior rank icon" />
                </Link>
              </Tooltip>
              <div className="el-rank-separator">-</div>
              <Tooltip content="Grandmaster Rank">
                <Link to="/warrior-gm">
                  <img className="el-rank-icon el-rank-icon-inactive" src="Grandmastur.png" alt="Grandmaster rank icon" />
                </Link>
              </Tooltip>
            </div>
            <Link to="/warrior-gm" className="el-rank-title el-rank-title-inactive">
              WARRIOR - GRANDMASTER
              <div className="el-horizontal-line"></div>
            </Link>
          </div>

          {/* Epic - Legend Group */}
          <div className="el-rank-group">
            <div className="el-rank-icons">
              <img className="el-rank-icon el-rank-icon-active" src="Epic.png" alt="Epic rank icon" />
              <div className="el-rank-separator">-</div>
              <img className="el-rank-icon el-rank-icon-active" src="Legend.png" alt="Legend rank icon" />
            </div>
            <div className="el-rank-title el-rank-title-active">
              EPIC - LEGEND
              <div className="el-horizontal-line"></div>
            </div>
          </div>

          {/* Mythic Group */}
          <div className="el-rank-group">
            <div className="el-rank-icons">
              <Tooltip content="Mythic Rank">
                <Link to="/mythic">
                  <img className="el-rank-icon el-rank-icon-inactive" src="Mythic.png" alt="Mythic rank icon" />
                </Link>
              </Tooltip>
            </div>
            <Link to="/mythic" className="el-rank-title el-rank-title-inactive">
              MYTHIC
              <div className="el-horizontal-line"></div>
            </Link>
          </div>

          {/* Mythical Honor Group */}
          <div className="el-rank-group">
            <div className="el-rank-icons">
              <Tooltip content="Mythical Honor Rank">
                <Link to="/mythical-honor">
                  <img className="el-rank-icon el-rank-icon-inactive" src="MythicHonor.png" alt="Mythical Honor rank icon" />
                </Link>
              </Tooltip>
            </div>
            <Link to="/mythical-honor" className="el-rank-title el-rank-title-inactive">
              MYTHICAL HONOR
              <div className="el-horizontal-line"></div>
            </Link>
          </div>

          {/* Mythical Glory Group */}
          <div className="el-rank-group">
            <div className="el-rank-icons">
              <Tooltip content="Mythical Glory Rank">
                <Link to="/mythical-glory">
                  <img className="el-rank-icon el-rank-icon-inactive" src="MythicGlory.png" alt="Mythical Glory rank icon" />
                </Link>
              </Tooltip>
            </div>
            <Link to="/mythical-glory" className="el-rank-title el-rank-title-inactive">
              MYTHICAL GLORY
              <div className="el-horizontal-line"></div>
            </Link>
          </div>
        </div>

        {/* Vertical separator line */}
        <div className="el-vertical-line"></div>

        {/* Dynamic Content Area */}
        <div className="el-content-container">
          <div className="el-main-title">{rankData.title}</div>
          <div className="el-subtitle">{rankData.subtitle}</div>

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
             {/* Fixed Lane Button with separate hover state */}
             <div className="el-lanes-float-container"
     onMouseEnter={() => setShowLaneTooltip(true)}
     onMouseLeave={() => setShowLaneTooltip(false)}>
  <Link to={`/lane?word=Rank`} className="el-lanes-float-button">
    <span>More on Lanes</span>
    <img src="/arrow.png" alt="Arrow" className="el-lanes-arrow-icon" />
  </Link>
  {showLaneTooltip && (
    <div className="el-lanes-tooltip">
      Learn more about lanes
    </div>
  )}
</div>
          </div>
        </div>

        {/* Mobile Rank Icons - shown only on mobile */}
        <div className="el-rank-icons-container">
          {/* Warrior-GM */}
          <Tooltip content="Warrior Rank">
            <Link to="/warrior-gm">
              <img 
                className="el-rank-icon el-rank-icon-inactive"
                src="Warrior.png"
                alt="Warrior rank icon"
              />
            </Link>
          </Tooltip>
          
          {/* Epic-Legend (Active) */}
          <Tooltip content="Epic-Legend Rank">
            <div className="el-rank-icon-active-container">
              <img 
                className="el-rank-icon el-rank-icon-active"
                src="Epic.png"
                alt="Epic rank icon"
              />
            </div>
          </Tooltip>
          
          {/* Mythic */}
          <Tooltip content="Mythic Rank">
            <Link to="/mythic">
              <img 
                className="el-rank-icon el-rank-icon-inactive"
                src="Mythic.png"
                alt="Mythic rank icon"
              />
            </Link>
          </Tooltip>
          
          {/* Mythical Honor */}
          <Tooltip content="Mythical Honor Rank">
            <Link to="/mythical-honor">
              <img 
                className="el-rank-icon el-rank-icon-inactive"
                src="MythicHonor.png"
                alt="Mythical Honor rank icon"
              />
            </Link>
          </Tooltip>
          
          {/* Mythical Glory */}
          <Tooltip content="Mythical Glory Rank">
            <Link to="/mythical-glory">
              <img 
                className="el-rank-icon el-rank-icon-inactive"
                src="MythicGlory.png"
                alt="Mythical Glory rank icon"
              />
            </Link>
          </Tooltip>
        </div>

        
      </div>
    </>
  );
};

export default EpicLegend;