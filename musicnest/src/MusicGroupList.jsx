import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import './css/stylesheet.css'
import './css/musicgroup-list.css'
import './css/colors-fonts.css'


function MusicGroupList() {
    // State that holds the fetched music groups
    const [musicGroups, setMusicGroups] = useState([])
    // State that tracks the current page user is on
    const [currentPage, setCurrentPage] = useState(0)
    // State that holds the total number of pages
    const [totalPages, setTotalPages] = useState(0)
    // Number of items to fetch per page
    const pageSize = 10
    // Fetches the music groups whenever the current page changes
    useEffect(() => {
        fetchGroups()
    }, [currentPage])

    async function fetchGroups() {
        try {
            // Fetch the first music groups from the API based on the current page and page size
            const url = `https://music.api.public.seido.se/api/MusicGroups/Read?pageNr=${currentPage}&pageSize=${pageSize}`

            const response = await fetch(url)

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            // Parses the JSON data from the response
            const data = await response.json()
            // Sets the state with the fetched music groups and total pages
            setMusicGroups(data.pageItems)
            setTotalPages(data.pageCount)
        } catch (error) {
            console.error('Error fetching music groups:', error)
        }
    }
    
    return (
        <main className="musicgroup-list-main container standard-padding">
            <div className="content-left">

                <h1>Music Groups</h1>

                <div className="actions">

                    <div className="searchbar">
                        <input
                            className="search-input input"
                            type="text"
                            placeholder="Search for a group..."
                        />

                        <button
                            className="btn-secondary btn"
                            type="button"
                        >
                            Search
                        </button>
                    </div>

                </div>

                <div className="table-container">

                    <div className="musicgroup-table table">

                        <div className="table-header-wrapper">

                            <div className="table-header">

                                <p className="th image-header"></p>

                                <p className="th">
                                    Group Name
                                </p>

                                <p className="th">
                                    Genre
                                </p>

                                <p className="th">
                                    Formed
                                </p>

                                <p className="th">
                                    Albums
                                </p>

                                <p className="th btn-cell"></p>

                            </div>

                        </div>

                        <div className="table-body">

                            {musicGroups.map((musicGroup) => (

                                <div
                                    className="table-row"
                                    key={musicGroup.musicGroupId}
                                >

                                    <div className="table-cell image-cell">
                                        <img
                                            src="/images/band-performing-studio.jpg"
                                            alt="Band performing in a recording studio"
                                        />
                                    </div>

                                    <div className="table-cell group-name-cell">
                                        <Link
                                            to={`/music-groups/${musicGroup.musicGroupId}`}
                                        >
                                            {musicGroup.name}
                                        </Link>
                                    </div>

                                    <div
                                        className="table-cell"
                                        data-label="Genre"
                                    >
                                        {musicGroup.strGenre}
                                    </div>

                                    <div
                                        className="table-cell"
                                        data-label="Formed"
                                    >
                                        {musicGroup.establishedYear}
                                    </div>

                                    <div
                                        className="table-cell"
                                        data-label="Albums"
                                    >
                                        {musicGroup.albums?.length ?? 'N/A'}
                                    </div>

                                    <div className="btn-cell">

                                        <div className="btn-wrapper">

                                            <Link
                                                className="btn"
                                                to={`/music-groups/${musicGroup.musicGroupId}`}
                                            >
                                                Details
                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

                <div className="pagination">

                    <button
                        id="btnPrev"
                        className={currentPage === 0 ? 'disabled' : ''}
                        onClick={() => {
                            if (currentPage > 0) {
                                setCurrentPage(currentPage - 1)
                            }
                        }}
                        disabled={currentPage === 0}
                    >
                        &laquo;
                    </button>

                    <span className="page-nr active">
                        {currentPage + 1}
                    </span>

                    <button
                        id="btnNext"
                        className={
                            currentPage === totalPages - 1
                                ? 'disabled'
                                : ''
                        }
                        onClick={() => {
                            if (currentPage < totalPages - 1) {
                                setCurrentPage(currentPage + 1)
                            }
                        }}
                        disabled={currentPage === totalPages - 1}
                    >
                        &raquo;
                    </button>

                </div>

            </div>
        </main>
    )
}

export default MusicGroupList