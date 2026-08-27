import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import './css/stylesheet.css'
import './css/musicgroup-page.css'
import './css/colors-fonts.css'


function MusicGroupDetails() {

    const { id } = useParams()

    const [musicGroup, setMusicGroup] = useState(null)

    useEffect(() => {

        async function fetchGroup() {

            try {

                const response = await fetch(
                    `https://music.api.public.seido.se/api/MusicGroups/ReadItem?id=${id}`
                )

                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                const data = await response.json()

                setMusicGroup(data.item)

            } catch (error) {

                console.error('Error fetching music group:', error)

            }

        }

        fetchGroup()

    }, [id])


    if (!musicGroup) {
        return <p>Loading...</p>
    }


    return (

        <main className="musicgroup-main container standard-padding">

            <div className="content-left">

                <div className="card group-details">

                    <h1>Group Details</h1>

                    <div className="group-details-grid">

                        <div className="detail-item">
                            <div className="label">
                                Group Name
                            </div>

                            <div className="value">
                                {musicGroup.name}
                            </div>
                        </div>


                        <div className="detail-item">
                            <div className="label">
                                Genre
                            </div>

                            <div className="value">
                                {musicGroup.strGenre}
                            </div>
                        </div>


                        <div className="detail-item">
                            <div className="label">
                                Formed
                            </div>

                            <div className="value">
                                {musicGroup.establishedYear}
                            </div>
                        </div>


                        <div className="detail-item">
                            <div className="label">
                                Albums
                            </div>

                            <div className="value">
                                {musicGroup.albums?.length ?? 0}
                            </div>
                        </div>

                    </div>

                </div>


                <h2 className="section-title">
                    Members
                </h2>


                <div className="table-container">

                    <div className="members-table table">

                        <div className="table-header-wrapper">

                            <div className="table-header">

                                <p className="th">
                                    Name
                                </p>

                                <p className="th">
                                    Born
                                </p>

                            </div>

                        </div>


                        <div className="table-body">

                            {musicGroup.artists?.map((member) => (

                                <div
                                    className="table-row"
                                    key={member.artistId}
                                >

                                    <div className="table-cell">

                                        {member.firstName} {member.lastName}

                                    </div>


                                    <div className="table-cell second-cell">

                                        {member.birthDay
                                            ? new Date(member.birthDay).toLocaleDateString()
                                            : 'N/A'
                                        }

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </div>


            <div className="bottom-section">

                <h2 className="section-title">
                    Albums
                </h2>


                <div className="table-container">

                    <div className="albums-table table">

                        <div className="table-header-wrapper">

                            <div className="table-header">

                                <p className="th"></p>

                                <p className="th">
                                    Album Title
                                </p>

                                <p className="th">
                                    Release Year
                                </p>

                            </div>

                        </div>


                        <div className="table-body">

                            {musicGroup.albums?.map((album) => (

                                <div
                                    className="album-row"
                                    key={album.albumId}
                                >

                                    <div className="table-cell image-cell">

                                        <img
                                            src="/images/album-art.the-rolling-stones.jpg"
                                            alt="Album cover"
                                        />

                                    </div>


                                    <div className="table-cell">

                                        {album.name}

                                    </div>


                                    <div className="table-cell second-cell">

                                        {album.releaseYear}

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </div>

        </main>

    )
}

export default MusicGroupDetails