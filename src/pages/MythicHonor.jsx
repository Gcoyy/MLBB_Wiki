import React, { useEffect, useState } from "react";
import "../styles/MythicHonor.css";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

// Reusable components
const RankHero = ({ role, heroes }) => (
  <div>
    <span className="mh-rank-hero-text">
      {role}: {heroes?.join(", ") || "No heroes listed"}
    </span>
  </div>
);

const Strategy = ({ title, description }) => (
  <div className="mh-strategy-text">
    <strong>{title}:</strong> {description}
  </div>
);

// Tooltip component
const Tooltip = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="mh-tooltip-container" 
         onMouseEnter={() => setIsVisible(true)}
         onMouseLeave={() => setIsVisible(false)}>
      {children}
      {isVisible && <div className="mh-tooltip">{content}</div>}
    </div>
  );
};

const MythicHonor = () => {
  const [rankData, setRankData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLaneTooltip, setShowLaneTooltip] = useState(false);

  useEffect(() => {
    const fetchRankData = async () => {
      try {
        const docRef = doc(db, "ranks", "mythic-honor");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setRankData(docSnap.data());
        } else {
          throw new Error("Mythic Honor data not found in database");
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
      <div className="mh-loading-screen">
        <div className="mh-loading-spinner"></div>
        <p>Loading Mythic Honor data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mh-error-screen">
        <h2>Error Loading Content</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!rankData) {
    return (
      <div className="mh-no-data">
        <h2>No Data Available</h2>
        <p>The Mythic Honor content could not be loaded.</p>
      </div>
    );
  }

  // Main render
  return (
    <>
      <div className="mh-mobile-legends-container">
        {/* Background image with tooltip */}
        <Tooltip content="Mobile Legends background image">
          <img 
            className="mh-background-image" 
            src="Background.png" 
            alt="Mobile Legends background" 
          />
        </Tooltip>

        {/* Desktop Sidebar Navigation - hidden on mobile */}
        <div className="mh-rank-sidebar">
          {/* Warrior - Grandmaster Group */}
          <div className="mh-rank-group">
            <div className="mh-rank-icons">
              <Tooltip content="Warrior Rank">
                <Link to="/warrior-gm">
                  <img className="mh-rank-icon mh-rank-icon-inactive" src="Warrior.png" alt="Warrior rank icon" />
                </Link>
              </Tooltip>
              <div className="mh-rank-separator">-</div>
              <Tooltip content="Grandmaster Rank">
                <Link to="/warrior-gm">
                  <img className="mh-rank-icon mh-rank-icon-inactive" src="Grandmastur.png" alt="Grandmaster rank icon" />
                </Link>
              </Tooltip>
            </div>
            <Link to="/warrior-gm" className="mh-rank-title mh-rank-title-inactive">
              WARRIOR - GRANDMASTER
              <div className="mh-horizontal-line"></div>
            </Link>
          </div>

          {/* Epic - Legend Group */}
          <div className="mh-rank-group">
            <div className="mh-rank-icons">
              <Tooltip content="Epic Rank">
                <Link to="/epic-legend">
                  <img className="mh-rank-icon mh-rank-icon-inactive" src="Epic.png" alt="Epic rank icon" />
                </Link>
              </Tooltip>
              <div className="mh-rank-separator">-</div>
              <Tooltip content="Legend Rank">
                <Link to="/epic-legend">
                  <img className="mh-rank-icon mh-rank-icon-inactive" src="Legend.png" alt="Legend rank icon" />
                </Link>
              </Tooltip>
            </div>
            <Link to="/epic-legend" className="mh-rank-title mh-rank-title-inactive">
              EPIC - LEGEND
              <div className="mh-horizontal-line"></div>
            </Link>
          </div>

          {/* Mythic Group */}
          <div className="mh-rank-group">
            <div className="mh-rank-icons">
              <Tooltip content="Mythic Rank">
                <Link to="/mythic">
                  <img className="mh-rank-icon mh-rank-icon-inactive" src="Mythic.png" alt="Mythic rank icon" />
                </Link>
              </Tooltip>
            </div>
            <Link to="/mythic" className="mh-rank-title mh-rank-title-inactive">
              MYTHIC
              <div className="mh-horizontal-line"></div>
            </Link>
          </div>

          {/* Mythical Honor Group */}
          <div className="mh-rank-group">
            <div className="mh-rank-icons">
              <Tooltip content="Mythical Honor Rank">
                <img className="mh-rank-icon mh-rank-icon-active" src="MythicHonor.png" alt="Mythical Honor rank icon" />
              </Tooltip>
            </div>
            <div className="mh-rank-title mh-rank-title-active">
              MYTHICAL HONOR
              <div className="mh-horizontal-line"></div>
            </div>
          </div>

          {/* Mythical Glory Group */}
          <div className="mh-rank-group">
            <div className="mh-rank-icons">
              <Tooltip content="Mythical Glory Rank">
                <Link to="/mythical-glory">
                  <img className="mh-rank-icon mh-rank-icon-inactive" src="MythicGlory.png" alt="Mythical Glory rank icon" />
                </Link>
              </Tooltip>
            </div>
            <Link to="/mythical-glory" className="mh-rank-title mh-rank-title-inactive">
              MYTHICAL GLORY
              <div className="mh-horizontal-line"></div>
            </Link>
          </div>
        </div>

        {/* Vertical separator line */}
        <div className="mh-vertical-line"></div>

        {/* Dynamic Content Area */}
        <div className="mh-content-container">
          <div className="mh-main-title">{rankData.title}</div>
          <div className="mh-subtitle">{rankData.subtitle}</div>

          <div className="mh-content-area">
            {/* Overview Section */}
            <div className="mh-content-card">
              <h2 className="mh-section-title">Overview</h2>
              <ul className="mh-feature-list">
                {rankData.overview.map((item, index) => (
                  <li key={`overview-${index}`} className="mh-feature-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Strategies Section */}
            <div className="mh-content-card">
              <h2 className="mh-section-title">Key Strategies</h2>
              <div className="mh-strategies-grid">
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
            <div className="mh-content-card">
              <h2 className="mh-section-title">Recommended Heroes</h2>
              <div className="mh-heroes-grid">
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
        <div className="mh-rank-icons-container">
          <Tooltip content="Warrior Rank">
            <Link to="/warrior-gm">
              <img 
                className="mh-rank-icon mh-rank-icon-inactive"
                src="Warrior.png"
                alt="Warrior rank icon"
              />
            </Link>
          </Tooltip>
          
          <Tooltip content="Epic Rank">
            <Link to="/epic-legend">
              <img 
                className="mh-rank-icon mh-rank-icon-inactive"
                src="Epic.png"
                alt="Epic rank icon"
              />
            </Link>
          </Tooltip>
          
          <Tooltip content="Mythic Rank">
            <Link to="/mythic">
              <img 
                className="mh-rank-icon mh-rank-icon-inactive"
                src="Mythic.png"
                alt="Mythic rank icon"
              />
            </Link>
          </Tooltip>
          
          <Tooltip content="Mythical Honor Rank">
            <img 
              className="mh-rank-icon mh-rank-icon-active"
              src="MythicHonor.png"
              alt="Mythical Honor rank icon"
            />
          </Tooltip>
          
          <Tooltip content="Mythical Glory Rank">
            <Link to="/mythical-glory">
              <img 
                className="mh-rank-icon mh-rank-icon-inactive"
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

export default MythicHonor;