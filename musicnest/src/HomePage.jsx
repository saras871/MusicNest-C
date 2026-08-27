import { useEffect, useState } from 'react'
import { Link } from 'react-router'

import './css/stylesheet.css'
import './css/homepage.css'
import './css/colors-fonts.css'

function HomePage() {
    // State to hold the fetched music groups
    const [musicGroups, setMusicGroups] = useState([])
    // State to track loading status and show loading message while fetching data
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchGroups() {
            try {
                // Fetch the first 8 music groups from the API
                const url =
                    'https://music.api.public.seido.se/api/MusicGroups/Read?pageNr=0&pageSize=8'

                const response = await fetch(url)
                // Checks if the response is successful
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                // Parses the JSON data from the response
                const data = await response.json()
                // Sets the state with the fetched music groups
                setMusicGroups(data.pageItems)
            } catch (error) {
                console.error('Error fetching music groups:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchGroups()
    }, [])

    return (
        <main>
            <section className="hero-section">
                <div className="hero">
                    <h1 className="hero-title">Welcome to MusicNest</h1>

                    <p className="hero-info">
                        Discover and learn about your favorite music groups.
                    </p>

                    <Link
                        className="hero-btn btn"
                        to="/music-groups"
                    >
                        Explore Groups
                    </Link>

                    <p className="made-by">
                        Developed by Sara Sundqvist
                    </p>
                </div>
            </section>

            <section className="homepage-content container">
                <h2 className="section-title">
                    Browse Music Groups
                </h2>

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
                    {loading ? (
                        <p>Loading music groups...</p>
                    ) : (
                        musicGroups.map((musicGroup) => (
                            <Link
                                className="card"
                                key={musicGroup.musicGroupId}
                                to={`/music-groups/${musicGroup.musicGroupId}`}
                            >
                                <img
                                    className="card-image"
                                    src="/images/band-performing-studio.jpg"
                                    alt="Band performing in a recording studio"
                                />

                                <div className="card-content-wrapper">
                                    <h4 className="card-content card-title">
                                        {musicGroup.name}
                                    </h4>

                                    <p className="card-content card-info">
                                        {musicGroup.strGenre}
                                    </p>

                                    <p className="card-content card-info">
                                        {musicGroup.establishedYear}
                                    </p>
                                </div>
                            </Link>
                        ))
                    )}
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