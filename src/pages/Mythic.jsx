import React, { useEffect, useState } from "react";
import "../styles/Mythic.css";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

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

// Tooltip component
const Tooltip = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="my-tooltip-container" 
         onMouseEnter={() => setIsVisible(true)}
         onMouseLeave={() => setIsVisible(false)}>
      {children}
      {isVisible && <div className="my-tooltip">{content}</div>}
    </div>
  );
};

const Mythic = () => {
  const [rankData, setRankData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLaneTooltip, setShowLaneTooltip] = useState(false);

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
      <div className="my-mobile-legends-container">
        {/* Background image with tooltip */}
        <Tooltip content="Mobile Legends background image">
          <img 
            className="my-background-image" 
            src="Background.png" 
            alt="Mobile Legends background" 
          />
        </Tooltip>

        {/* Desktop Sidebar Navigation - hidden on mobile */}
        <div className="my-rank-sidebar">
          {/* Warrior - Grandmaster Group */}
          <div className="my-rank-group">
            <div className="my-rank-icons">
              <Tooltip content="Warrior Rank">
                <Link to="/warrior-gm">
                  <img className="my-rank-icon my-rank-icon-inactive" src="Warrior.png" alt="Warrior rank icon" />
                </Link>
              </Tooltip>
              <div className="my-rank-separator">-</div>
              <Tooltip content="Grandmaster Rank">
                <Link to="/warrior-gm">
                  <img className="my-rank-icon my-rank-icon-inactive" src="Grandmastur.png" alt="Grandmaster rank icon" />
                </Link>
              </Tooltip>
            </div>
            <Link to="/warrior-gm" className="my-rank-title my-rank-title-inactive">
              WARRIOR - GRANDMASTER
              <div className="my-horizontal-line"></div>
            </Link>
          </div>

          {/* Epic - Legend Group */}
          <div className="my-rank-group">
            <div className="my-rank-icons">
              <Tooltip content="Epic Rank">
                <Link to="/epic-legend">
                  <img className="my-rank-icon my-rank-icon-inactive" src="Epic.png" alt="Epic rank icon" />
                </Link>
              </Tooltip>
              <div className="my-rank-separator">-</div>
              <Tooltip content="Legend Rank">
                <Link to="/epic-legend">
                  <img className="my-rank-icon my-rank-icon-inactive" src="Legend.png" alt="Legend rank icon" />
                </Link>
              </Tooltip>
            </div>
            <Link to="/epic-legend" className="my-rank-title my-rank-title-inactive">
              EPIC - LEGEND
              <div className="my-horizontal-line"></div>
            </Link>
          </div>

          {/* Mythic Group */}
          <div className="my-rank-group">
            <div className="my-rank-icons">
              <Tooltip content="Mythic Rank">
                <img className="my-rank-icon my-rank-icon-active" src="Mythic.png" alt="Mythic rank icon" />
              </Tooltip>
            </div>
            <div className="my-rank-title my-rank-title-active">
              MYTHIC
              <div className="my-horizontal-line"></div>
            </div>
          </div>

          {/* Mythical Honor Group */}
          <div className="my-rank-group">
            <div className="my-rank-icons">
              <Tooltip content="Mythical Honor Rank">
                <Link to="/mythical-honor">
                  <img className="my-rank-icon my-rank-icon-inactive" src="MythicHonor.png" alt="Mythical Honor rank icon" />
                </Link>
              </Tooltip>
            </div>
            <Link to="/mythical-honor" className="my-rank-title my-rank-title-inactive">
              MYTHICAL HONOR
              <div className="my-horizontal-line"></div>
            </Link>
          </div>

          {/* Mythical Glory Group */}
          <div className="my-rank-group">
            <div className="my-rank-icons">
              <Tooltip content="Mythical Glory Rank">
                <Link to="/mythical-glory">
                  <img className="my-rank-icon my-rank-icon-inactive" src="MythicGlory.png" alt="Mythical Glory rank icon" />
                </Link>
              </Tooltip>
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
        <div className="my-rank-icons-container">
          <Tooltip content="Warrior Rank">
            <Link to="/warrior-gm">
              <img 
                className="my-rank-icon my-rank-icon-inactive"
                src="Warrior.png"
                alt="Warrior rank icon"
              />
            </Link>
          </Tooltip>
          
          <Tooltip content="Epic Rank">
            <Link to="/epic-legend">
              <img 
                className="my-rank-icon my-rank-icon-inactive"
                src="Epic.png"
                alt="Epic rank icon"
              />
            </Link>
          </Tooltip>
          
          <Tooltip content="Mythic Rank">
            <img 
              className="my-rank-icon my-rank-icon-active"
              src="Mythic.png"
              alt="Mythic rank icon"
            />
          </Tooltip>
          
          <Tooltip content="Mythical Honor Rank">
            <Link to="/mythical-honor">
              <img 
                className="my-rank-icon my-rank-icon-inactive"
                src="MythicHonor.png"
                alt="Mythical Honor rank icon"
              />
            </Link>
          </Tooltip>
          
          <Tooltip content="Mythical Glory Rank">
            <Link to="/mythical-glory">
              <img 
                className="my-rank-icon my-rank-icon-inactive"
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

export default Mythic;