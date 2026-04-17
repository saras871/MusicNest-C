'use strict';
// Get the music group ID from the URL query parameters
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const API = `https://music.api.public.seido.se/api/MusicGroups/ReadItem?id=${id}`;

// Fetch music group details from the API
async function fetchGroup() {
    try {
        const response = await fetch(API);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        renderGroup(data.item);
    } catch (error) {
        console.error('Error fetching music group:', error);
    }
}
// Create HTML to display music group details, members and albums
function renderGroup(musicGroup) {
    // Fill in the details section with music group information
    document.getElementById('groupName').textContent = musicGroup.name;
    document.getElementById('groupGenre').textContent = musicGroup.strGenre;
    document.getElementById('groupFormed').textContent = musicGroup.establishedYear;
    document.getElementById('groupAlbums').textContent = musicGroup.albums?.length ?? 0;

    renderMembers(musicGroup.artists ?? []);
    renderAlbums(musicGroup.albums ?? []);

}

function renderMembers(members) {
    const membersContainer = document.getElementById('membersContainer');

    let html = '';
    // Loop through members and create html for each member
    members.forEach(member => {
        html += `
            <div class="table-row">
                <div class="table-cell">${member.firstName} ${member.lastName}</div>
                <div class="table-cell second-cell">
                    ${new Date(member.birthDay).toLocaleDateString() ?? 'N/A'}
                </div>
            </div>
        `;
    });
    // Insert the generated HTML into the members container
    membersContainer.innerHTML = html;
}

function renderAlbums(albums) {
    const albumsContainer = document.getElementById('albumsContainer');

    let html = '';
    // Loop through albums and create html for each album
    albums.forEach(album => {
        html += `
             <div class="album-row">
                <div class="table-cell image-cell">
                    <img src="images/album-art.the-rolling-stones.jpg">
                </div>
                <div class="table-cell">${album.name}</div>
                <div class="table-cell second-cell">${album.releaseYear}</div>
            </div>
        `;
    });
    // Insert the generated HTML into the albums container
    albumsContainer.innerHTML = html;
}

fetchGroup();