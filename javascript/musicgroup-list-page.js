'use strict';

const API = 'https://music.api.public.seido.se/api/MusicGroups/Read';

let musicGroups = [];
let currentPage = 0;
let totalPages = 0;
const pageSize = 10;

async function fetchGroups() {
    try {
        const url = `${API}?pageNr=${currentPage}&pageSize=${pageSize}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        musicGroups = data.pageItems;
        totalPages = data.pageCount;
        renderTable();
        renderPagination();
        console.log(data);
    } catch (error) {
        console.error('Error fetching music groups:', error);
    }
}

function goToDetails(id) {
    window.location.href = `musicgroup-page.html?id=${id}`;
}

function renderTable() {
    const tableBody = document.getElementById('groupsTableBody');
    tableBody.innerHTML = '';

    let html = '';

    musicGroups.forEach(musicGroup => {
        html += `<div class="table-row">
                <div class="table-cell image-cell">
                    <img src="images/band-performing-studio.jpg">
                </div>

                <div class="table-cell group-name-cell">
                    <a href="musicgroup-page.html?id=${musicGroup.musicGroupId}">
                        ${musicGroup.name}
                    </a>
                </div>

                <div class="table-cell">${musicGroup.strGenre}</div>
                <div class="table-cell">${musicGroup.establishedYear}</div>
                <div class="table-cell">${musicGroup.albums?.length ?? 'N/A'}</div>

                <div class="btn-cell">
                    <div class="btn-wrapper">
                        <button class="btn" onclick="goToDetails('${musicGroup.musicGroupId}')">Details</button>
                        <button class="btn btn-danger">Edit</button>
                    </div>
                </div>
            </div>
        `;
    });
    tableBody.innerHTML = html;
    console.log("Rendering table...");
}

function renderPagination() {
    const pagination = document.querySelector('.pagination');
const maxPageButtons = 3; 
let startPage = Math.max(0, currentPage - Math.floor(maxPageButtons / 2));
let endPage = startPage + maxPageButtons;

if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(0, endPage - maxPageButtons);
}

    let html = '<a id="btnPrev" href="#" class="${currentPage === 0 ? "disabled" : ""}">&laquo;</a>';

    for (let i = startPage; i < endPage; i++) {
        html += `<a href="#" class="page-nr ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i + 1}</a>`;
    }
if (endPage < totalPages) {
    html += `<span class=" page-nr dots">...</span>`;
}
    html += '<a  href="#" id="btnNext" href="#" class="${currentPage === totalPages - 1 ? "disabled" : ""}">&raquo;</a>';

    pagination.innerHTML = html;

    attachPaginationEvents();
}
function goToPage(page) {
    currentPage = page;
    fetchGroups();
}
function attachPaginationEvents() {
  
    document.getElementById('btnNext').addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages - 1) {
            currentPage++;
            fetchGroups();
        }
    });
    document.getElementById('btnPrev').addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 0) {
            currentPage--;
            fetchGroups();
        }
    });
}


fetchGroups();