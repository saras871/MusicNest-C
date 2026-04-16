'use strict';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const API = `https://music.api.public.seido.se/api/MusicGroups/ReadItem?id=${id}`;

console.log('Music Group ID:', id);

async function fetchGroup() {
    try {
        const response = await fetch(API); 

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        renderGroup(data.item);
    } catch (error) {
        console.error('Error fetching music group:', error);
    }
}

function renderGroup(musicGroup) {
 document.getElementById('groupName').textContent = musicGroup.name;
 document.getElementById('groupGenre').textContent = musicGroup.strGenre;
 document.getElementById('groupFormed').textContent = musicGroup.establishedYear;
 document.getElementById('groupAlbums').textContent = musicGroup.albums?.length ?? 0;

 renderMembers(musicGroup.artists ?? []);
 renderAlbums(musicGroup.albums ?? []);

}

function renderMembers(members) {
    const container = document.getElementById('membersContainer');

    let html = '';
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

    container.innerHTML = html;
}

function renderAlbums(albums) {
    const container = document.getElementById('albumsContainer');

    let html = '';
    albums.forEach(album => {
         html += `
             <div class="album-row">
                <div class="table-cell">
                    <img src="images/album-art.the-rolling-stones.jpg">
                </div>
                <div class="table-cell">${album.name}</div>
                <div class="table-cell second-cell">${album.releaseYear}</div>
            </div>
        `;
    });

    container.innerHTML = html;
}

fetchGroup();