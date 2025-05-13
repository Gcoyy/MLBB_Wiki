import React, { useEffect, useState } from "react";
import "../styles/Warrior_GM.css";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

// Reusable components
const RankHero = ({ role, heroes }) => (
  <div>
    <span className="wg-rank-hero-text">
      {role}: {heroes?.join(", ") || "No heroes listed"}
    </span>
  </div>
);

const Strategy = ({ title, description }) => (
  <div className="wg-strategy-text">
    <strong>{title}:</strong> {description}
  </div>
);

// Tooltip component
const Tooltip = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="wg-tooltip-container" 
         onMouseEnter={() => setIsVisible(true)}
         onMouseLeave={() => setIsVisible(false)}>
      {children}
      {isVisible && <div className="wg-tooltip">{content}</div>}
    </div>
  );
};

const WarriorGM = () => {
  const [rankData, setRankData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLaneTooltip, setShowLaneTooltip] = useState(false);


  useEffect(() => {
    const fetchRankData = async () => {
      try {
        const docRef = doc(db, "ranks", "warrior-gm");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setRankData(docSnap.data());
        } else {
          throw new Error("Warrior-GM data not found in database");
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
        <p>Loading Warrior_GM data...</p>
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
        <p>The Warrior-GM content could not be loaded.</p>
      </div>
    );
  }

  // Main render
  return (
    <>
      <div className="wg-mobile-legends-container">
        {/* Background image with tooltip */}
        <Tooltip content="Mobile Legends background image">
          <img 
            className="wg-background-image" 
            src="Background.png" 
            alt="Mobile Legends background" 
          />
        </Tooltip>

        {/* Desktop Sidebar Navigation - hidden on mobile */}
        <div className="wg-rank-sidebar">
          {/* Warrior - Grandmaster Group */}
          <div className="wg-rank-group">
            <div className="wg-rank-icons">
              <Tooltip content="Warrior Rank">
                <img className="wg-rank-icon wg-rank-icon-active" src="Warrior.png" alt="Warrior rank icon" />
              </Tooltip>
              <div className="wg-rank-separator">-</div>
              <Tooltip content="Grandmaster Rank">
                <img className="wg-rank-icon wg-rank-icon-active" src="Grandmastur.png" alt="Grandmaster rank icon" />
              </Tooltip>
            </div>
            <div className="wg-rank-title wg-rank-title-active">
              WARRIOR - GRANDMASTER
              <div className="wg-horizontal-line"></div>
            </div>
          </div>

          {/* Epic - Legend Group */}
          <div className="wg-rank-group">
            <div className="wg-rank-icons">
              <Tooltip content="Epic Rank">
                <Link to="/epic-legend">
                  <img className="wg-rank-icon wg-rank-icon-inactive" src="Epic.png" alt="Epic rank icon" />
                </Link>
              </Tooltip>
              <div className="wg-rank-separator">-</div>
              <Tooltip content="Legend Rank">
                <Link to="/epic-legend">
                  <img className="wg-rank-icon wg-rank-icon-inactive" src="Legend.png" alt="Legend rank icon" />
                </Link>
              </Tooltip>
            </div>
            <Link to="/epic-legend" className="wg-rank-title wg-rank-title-inactive">
              EPIC - LEGEND
              <div className="wg-horizontal-line"></div>
            </Link>
          </div>

          {/* Mythic Group */}
          <div className="wg-rank-group">
            <div className="wg-rank-icons">
              <Tooltip content="Mythic Rank">
                <Link to="/mythic">
                  <img className="wg-rank-icon wg-rank-icon-inactive" src="Mythic.png" alt="Mythic rank icon" />
                </Link>
              </Tooltip>
            </div>
            <Link to="/mythic" className="wg-rank-title wg-rank-title-inactive">
              MYTHIC
              <div className="wg-horizontal-line"></div>
            </Link>
          </div>

          {/* Mythical Honor Group */}
          <div className="wg-rank-group">
            <div className="wg-rank-icons">
              <Tooltip content="Mythical Honor Rank">
                <Link to="/mythical-honor">
                  <img className="wg-rank-icon wg-rank-icon-inactive" src="MythicHonor.png" alt="Mythical Honor rank icon" />
                </Link>
              </Tooltip>
            </div>
            <Link to="/mythical-honor" className="wg-rank-title wg-rank-title-inactive">
              MYTHICAL HONOR
              <div className="wg-horizontal-line"></div>
            </Link>
          </div>

          {/* Mythical Glory Group */}
          <div className="wg-rank-group">
            <div className="wg-rank-icons">
              <Tooltip content="Mythical Glory Rank">
                <Link to="/mythical-glory">
                  <img className="wg-rank-icon wg-rank-icon-inactive" src="MythicGlory.png" alt="Mythical Glory rank icon" />
                </Link>
              </Tooltip>
            </div>
            <Link to="/mythical-glory" className="wg-rank-title wg-rank-title-inactive">
              MYTHICAL GLORY
              <div className="wg-horizontal-line"></div>
            </Link>
          </div>
        </div>

        {/* Vertical separator line */}
        <div className="wg-vertical-line"></div>

        {/* Dynamic Content Area */}
        <div className="wg-content-container">
          <div className="wg-main-title">{rankData.title}</div>
          <div className="wg-subtitle">{rankData.subtitle}</div>

          <div className="wg-content-area">
            {/* Overview Section */}
            <div className="wg-content-card">
              <h2 className="wg-section-title">Overview</h2>
              <ul className="wg-feature-list">
                {rankData.overview.map((item, index) => (
                  <li key={`overview-${index}`} className="wg-feature-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Strategies Section */}
            <div className="wg-content-card">
              <h2 className="wg-section-title">Key Strategies</h2>
              <div className="wg-strategies-grid">
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
            <div className="wg-content-card">
              <h2 className="wg-section-title">Recommended Heroes</h2>
              <div className="wg-heroes-grid">
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
        <div className="wg-rank-icons-container">
          {/* Active rank icons */}
          <Tooltip content="Warrior Rank">
            <Link to="/warrior-gm">
              <img 
                className="wg-rank-icon wg-rank-icon-active"
                src="Warrior.png"
                alt="Warrior rank icon"
              />
            </Link>
          </Tooltip>
         
          {/* Inactive rank icons */}
          <Tooltip content="Epic Rank">
            <Link to="/epic-legend">
              <img 
                className="wg-rank-icon wg-rank-icon-inactive"
                src="Epic.png"
                alt="Epic rank icon"
              />
            </Link>
          </Tooltip>
         
          <Tooltip content="Mythic Rank">
            <Link to="/mythic">
              <img 
                className="wg-rank-icon wg-rank-icon-inactive"
                src="Mythic.png"
                alt="Mythic rank icon"
              />
            </Link>
          </Tooltip>

          <Tooltip content="Mythical Honor Rank">
            <Link to="/mythical-honor">
              <img 
                className="wg-rank-icon wg-rank-icon-inactive"
                src="MythicHonor.png"
                alt="Mythical Honor rank icon"
              />
            </Link>
          </Tooltip>

          <Tooltip content="Mythical Glory Rank">
            <Link to="/mythical-glory">
              <img 
                className="wg-rank-icon wg-rank-icon-inactive"
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

export default WarriorGM;