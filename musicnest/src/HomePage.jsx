import { Link } from 'react-router'
import './css/stylesheet.css'
import './css/homepage.css'
import './css/colors-fonts.css'

function HomePage() {
  return (
     <main>
            <section className="hero-section">
                <div className="hero">
                    <h1 className="hero-title">Welcome to MusicNest</h1>

                    <p className="hero-info">
                        Discover and learn about your favorite music groups.
                    </p>

                    <Link className="hero-btn btn" to="/music-groups">
                        Explore Groups
                    </Link>

                    <p className="made-by">
                        Developed by Sara Sundqvist
                    </p>
                </div>
            </section>

            <section className="homepage-content container">
                <h2 className="section-title">Browse Music Groups</h2>

                <form className="searchbar">
                    <input
                        className="search-input input"
                        type="text"
                        placeholder="Search for a group..."
                    />

                    <button
                        className="btn-secondary btn"
                        type="submit"
                    >
                        Search
                    </button>
                </form>

                <div className="group-cards">

                    <a className="card">
                        <img
                            className="card-image"
                            src="/images/band-performing-studio.jpg"
                            alt="Band performing in a recording studio"
                        />
                        <div className="card-content-wrapper">
                            <h4 className="card-content card-title">
                                The Rolling Stones
                            </h4>
                            <p className="card-content card-info">Rock</p>
                            <p className="card-content card-info">31 Albums</p>
                        </div>
                    </a>

                    <a className="card">
                        <img
                            className="card-image"
                            src="/images/band-performing-studio.jpg"
                            alt="Band performing in a recording studio"
                        />
                        <div className="card-content-wrapper">
                            <h4 className="card-content card-title">
                                The Beatles
                            </h4>
                            <p className="card-content card-info">Rock / Pop</p>
                            <p className="card-content card-info">13 Albums</p>
                        </div>
                    </a>

                    <a className="card">
                        <img
                            className="card-image"
                            src="/images/band-performing-studio.jpg"
                            alt="Band performing in a recording studio"
                        />
                        <div className="card-content-wrapper">
                            <h4 className="card-content card-title">
                                Modest Mouse
                            </h4>
                            <p className="card-content card-info">Indie Rock</p>
                            <p className="card-content card-info">7 Albums</p>
                        </div>
                    </a>

                    <a className="card">
                        <img
                            className="card-image"
                            src="/images/band-performing-studio.jpg"
                            alt="Band performing in a recording studio"
                        />
                        <div className="card-content-wrapper">
                            <h4 className="card-content card-title">
                                Wet Leg
                            </h4>
                            <p className="card-content card-info">Indie Rock</p>
                            <p className="card-content card-info">1 Album</p>
                        </div>
                    </a>

                    <a className="card">
                        <img
                            className="card-image"
                            src="/images/band-performing-studio.jpg"
                            alt="Band performing in a recording studio"
                        />
                        <div className="card-content-wrapper">
                            <h4 className="card-content card-title">
                                Radiohead
                            </h4>
                            <p className="card-content card-info">
                                Alternative Rock
                            </p>
                            <p className="card-content card-info">9 Albums</p>
                        </div>
                    </a>

                    <a className="card">
                        <img
                            className="card-image"
                            src="/images/band-performing-studio.jpg"
                            alt="Band performing in a recording studio"
                        />
                        <div className="card-content-wrapper">
                            <h4 className="card-content card-title">
                                Nirvana
                            </h4>
                            <p className="card-content card-info">
                                Grunge / Alternative Rock
                            </p>
                            <p className="card-content card-info">3 Albums</p>
                        </div>
                    </a>

                    <a className="card">
                        <img
                            className="card-image"
                            src="/images/band-performing-studio.jpg"
                            alt="Band performing in a recording studio"
                        />
                        <div className="card-content-wrapper">
                            <h4 className="card-content card-title">
                                Coldplay
                            </h4>
                            <p className="card-content card-info">
                                Alternative Rock / Pop Rock
                            </p>
                            <p className="card-content card-info">10 Albums</p>
                        </div>
                    </a>

                    <a className="card">
                        <img
                            className="card-image"
                            src="/images/band-performing-studio.jpg"
                            alt="Band performing in a recording studio"
                        />
                        <div className="card-content-wrapper">
                            <h4 className="card-content card-title">
                                Fleetwood Mac
                            </h4>
                            <p className="card-content card-info">Rock</p>
                            <p className="card-content card-info">18 Albums</p>
                        </div>
                    </a>

                </div>

                <Link
                    className="view-all-btn btn"
                    to="/music-groups"
                >
                    View All
                </Link>
            </section>
        </main>
  )
}

export default HomePage