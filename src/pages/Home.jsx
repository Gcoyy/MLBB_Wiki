import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <section className="hero">
                <div className="hero-content">
                    <h1>Welcome to Wuthering Waves</h1>
                    <p>Explore the vast world of Wuthering Waves, where ancient mysteries and modern technology collide.</p>
                    <button className="cta-button">Start Your Journey</button>
                </div>
            </section>

            <section className="features">
                <h2>Featured Content</h2>
                <div className="feature-grid">
                    <div className="feature-card">
                        <img src="/images/characters.jpg" alt="Characters" />
                        <h3>Characters</h3>
                        <p>Discover the unique abilities and stories of each Resonator.</p>
                    </div>
                    <div className="feature-card">
                        <img src="/images/weapons.jpg" alt="Weapons" />
                        <h3>Weapons</h3>
                        <p>Explore the powerful arsenal available in the game.</p>
                    </div>
                    <div className="feature-card">
                        <img src="/images/world.jpg" alt="World" />
                        <h3>World</h3>
                        <p>Uncover the secrets of the vast and mysterious world.</p>
                    </div>
                </div>
            </section>

            <section className="news">
                <h2>Latest News</h2>
                <div className="news-grid">
                    <article className="news-card">
                        <img src="/images/news1.jpg" alt="News 1" />
                        <div className="news-content">
                            <h3>New Update Coming Soon</h3>
                            <p>Get ready for exciting new content and features in the upcoming update.</p>
                            <span className="date">March 15, 2024</span>
                        </div>
                    </article>
                    <article className="news-card">
                        <img src="/images/news2.jpg" alt="News 2" />
                        <div className="news-content">
                            <h3>Community Event</h3>
                            <p>Join our community event and win exclusive rewards.</p>
                            <span className="date">March 10, 2024</span>
                        </div>
                    </article>
                </div>
            </section>
        </div>
    );
};

export default Home; 