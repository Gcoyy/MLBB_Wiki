import React, { useEffect, useState } from "react";
import "../styles/MythicGlory.css";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

// Reusable components
const RankHero = ({ role, heroes }) => (
  <div>
    <span className="mg-rank-hero-text">
      {role}: {heroes?.join(", ") || "No heroes listed"}
    </span>
  </div>
);

const Strategy = ({ title, description }) => (
  <div className="mg-strategy-text">
    <strong>{title}:</strong> {description}
  </div>
);

// Tooltip component
const Tooltip = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="mg-tooltip-container" 
         onMouseEnter={() => setIsVisible(true)}
         onMouseLeave={() => setIsVisible(false)}>
      {children}
      {isVisible && <div className="mg-tooltip">{content}</div>}
    </div>
  );
};

const MythicGlory = () => {
  const [rankData, setRankData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLaneTooltip, setShowLaneTooltip] = useState(false);

  useEffect(() => {
    const fetchRankData = async () => {
      try {
        const docRef = doc(db, "ranks", "mythical-glory");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setRankData(docSnap.data());
        } else {
          throw new Error("Mythical Glory data not found in database");
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
      <div className="mg-loading-screen">
        <div className="mg-loading-spinner"></div>
        <p>Loading Mythical Glory data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mg-error-screen">
        <h2>Error Loading Content</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!rankData) {
    return (
      <div className="mg-no-data">
        <h2>No Data Available</h2>
        <p>The Mythical Glory content could not be loaded.</p>
      </div>
    );
  }

  // Main render
  return (
    <>
      <div className="mg-mobile-legends-container">
        {/* Background image with tooltip */}
        <Tooltip content="Mobile Legends background image">
          <img 
            className="mg-background-image" 
            src="Background.png" 
            alt="Mobile Legends background" 
          />
        </Tooltip>

        {/* Desktop Sidebar Navigation - hidden on mobile */}
        <div className="mg-rank-sidebar">
          {/* Warrior - Grandmaster Group */}
          <div className="mg-rank-group">
            <div className="mg-rank-icons">
              <Tooltip content="Warrior Rank">
                <Link to="/warrior-gm">
                  <img className="mg-rank-icon mg-rank-icon-inactive" src="Warrior.png" alt="Warrior rank icon" />
                </Link>
              </Tooltip>
              <div className="mg-rank-separator">-</div>
              <Tooltip content="Grandmaster Rank">
                <Link to="/warrior-gm">
                  <img className="mg-rank-icon mg-rank-icon-inactive" src="Grandmastur.png" alt="Grandmaster rank icon" />
                </Link>
              </Tooltip>
            </div>
            <Link to="/warrior-gm" className="mg-rank-title mg-rank-title-inactive">
              WARRIOR - GRANDMASTER
              <div className="mg-horizontal-line"></div>
            </Link>
          </div>

          {/* Epic - Legend Group */}
          <div className="mg-rank-group">
            <div className="mg-rank-icons">
              <Tooltip content="Epic Rank">
                <Link to="/epic-legend">
                  <img className="mg-rank-icon mg-rank-icon-inactive" src="Epic.png" alt="Epic rank icon" />
                </Link>
              </Tooltip>
              <div className="mg-rank-separator">-</div>
              <Tooltip content="Legend Rank">
                <Link to="/epic-legend">
                  <img className="mg-rank-icon mg-rank-icon-inactive" src="Legend.png" alt="Legend rank icon" />
                </Link>
              </Tooltip>
            </div>
            <Link to="/epic-legend" className="mg-rank-title mg-rank-title-inactive">
              EPIC - LEGEND
              <div className="mg-horizontal-line"></div>
            </Link>
          </div>

          {/* Mythic Group */}
          <div className="mg-rank-group">
            <div className="mg-rank-icons">
              <Tooltip content="Mythic Rank">
                <Link to="/mythic">
                  <img className="mg-rank-icon mg-rank-icon-inactive" src="Mythic.png" alt="Mythic rank icon" />
                </Link>
              </Tooltip>
            </div>
            <Link to="/mythic" className="mg-rank-title mg-rank-title-inactive">
              MYTHIC
              <div className="mg-horizontal-line"></div>
            </Link>
          </div>

          {/* Mythical Honor Group */}
          <div className="mg-rank-group">
            <div className="mg-rank-icons">
              <Tooltip content="Mythical Honor Rank">
                <Link to="/mythical-honor">
                  <img className="mg-rank-icon mg-rank-icon-inactive" src="MythicHonor.png" alt="Mythical Honor rank icon" />
                </Link>
              </Tooltip>
            </div>
            <Link to="/mythical-honor" className="mg-rank-title mg-rank-title-inactive">
              MYTHICAL HONOR
              <div className="mg-horizontal-line"></div>
            </Link>
          </div>

          {/* Mythical Glory Group */}
          <div className="mg-rank-group">
            <div className="mg-rank-icons">
              <Tooltip content="Mythical Glory Rank">
                <img className="mg-rank-icon mg-rank-icon-active" src="MythicGlory.png" alt="Mythical Glory rank icon" />
              </Tooltip>
            </div>
            <div className="mg-rank-title mg-rank-title-active">
              MYTHICAL GLORY
              <div className="mg-horizontal-line"></div>
            </div>
          </div>
        </div>

        {/* Vertical separator line */}
        <div className="mg-vertical-line"></div>

        {/* Dynamic Content Area */}
        <div className="mg-content-container">
          <div className="mg-main-title">{rankData.title}</div>
          <div className="mg-subtitle">{rankData.subtitle}</div>

          <div className="mg-content-area">
            {/* Overview Section */}
            <div className="mg-content-card">
              <h2 className="mg-section-title">Overview</h2>
              <ul className="mg-feature-list">
                {rankData.overview.map((item, index) => (
                  <li key={`overview-${index}`} className="mg-feature-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Strategies Section */}
            <div className="mg-content-card">
              <h2 className="mg-section-title">Key Strategies</h2>
              <div className="mg-strategies-grid">
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
            <div className="mg-content-card">
              <h2 className="mg-section-title">Recommended Heroes</h2>
              <div className="mg-heroes-grid">
                {Object.entries(rankData.recommendedHeroes).map(([role, heroes]) => (
                  <RankHero 
                    key={`hero-${role}`}
                    role={role} 
                    heroes={heroes} 
                  />
                ))}
              </div>
            </div>
            {/* Button positioned at the bottom of content */}
       {/* Fixed Lane Button with separate hover state */}
       <div className="wg-lanes-float-container"
     onMouseEnter={() => setShowLaneTooltip(true)}
     onMouseLeave={() => setShowLaneTooltip(false)}>
  <Link to={`/lane?word=Rank`} className="wg-lanes-float-button">
    <span>More on Lanes</span>
    <img src="/arrow.png" alt="Arrow" className="wg-lanes-arrow-icon" />
  </Link>
  {showLaneTooltip && (
    <div className="wg-lanes-tooltip">
      Learn more about lanes
    </div>
  )}
</div>
          </div>
        </div>

        {/* Mobile Rank Icons - shown only on mobile */}
        <div className="mg-rank-icons-container">
          <Tooltip content="Warrior Rank">
            <Link to="/warrior-gm">
              <img 
                className="mg-rank-icon mg-rank-icon-inactive"
                src="Warrior.png"
                alt="Warrior rank icon"
              />
            </Link>
          </Tooltip>
          
          <Tooltip content="Epic Rank">
            <Link to="/epic-legend">
              <img 
                className="mg-rank-icon mg-rank-icon-inactive"
                src="Epic.png"
                alt="Epic rank icon"
              />
            </Link>
          </Tooltip>
          
          <Tooltip content="Mythic Rank">
            <Link to="/mythic">
              <img 
                className="mg-rank-icon mg-rank-icon-inactive"
                src="Mythic.png"
                alt="Mythic rank icon"
              />
            </Link>
          </Tooltip>
          
          <Tooltip content="Mythical Honor Rank">
            <Link to="/mythical-honor">
              <img 
                className="mg-rank-icon mg-rank-icon-inactive"
                src="MythicHonor.png"
                alt="Mythical Honor rank icon"
              />
            </Link>
          </Tooltip>
          
          <Tooltip content="Mythical Glory Rank">
            <img 
              className="mg-rank-icon mg-rank-icon-active"
              src="MythicGlory.png"
              alt="Mythical Glory rank icon"
            />
          </Tooltip>
        </div>

        
      </div>
    </>
  );
};

export default MythicGlory;