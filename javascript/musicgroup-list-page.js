'use strict';

const API = 'https://music.api.public.seido.se/api/MusicGroups/Read';

let musicGroups = [];
let currentPage = 0;
let totalPages = 0;
const pageSize = 10;

// Fetch music groups from the API
async function fetchGroups() {
    try {
        // API url with pagination parameters
        const url = `${API}?pageNr=${currentPage}&pageSize=${pageSize}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
// Data for rendering table and pagination
        musicGroups = data.pageItems;
        totalPages = data.pageCount;
        renderTable();
        renderPagination();
    } catch (error) {
        console.error('Error fetching music groups:', error);
    }
}
// Navigation to details page
function goToDetails(id) {
    // Navigate to the details page with query parameter
    window.location.href = `musicgroup-page.html?id=${id}`;
}
// Render list of music groups
function renderTable() {
    const tableBody = document.getElementById('groupsTableBody');
    // Clear existing content
    tableBody.innerHTML = '';

    let html = '';
// Loop through music groups and create html for each group
    musicGroups.forEach(musicGroup => {
        html += `<div class="table-row">
                <div class="table-cell image-cell">
                    <img src="images/band-performing-studio.jpg">
                </div>

                <div class="table-cell group-name-cell" >
                    <a href="musicgroup-page.html?id=${musicGroup.musicGroupId}">
                        ${musicGroup.name}
                    </a>
                </div>

                <div class="table-cell" data-label="Genre">
                    ${musicGroup.strGenre}
                </div>
                <div class="table-cell" data-label="Formed">
                    ${musicGroup.establishedYear}
                </div>
                <div class="table-cell" data-label="Albums">
                    ${musicGroup.albums?.length ?? 'N/A'}
                </div>

                <div class="btn-cell">
                    <div class="btn-wrapper">
                        <button class="btn" onclick="goToDetails('${musicGroup.musicGroupId}')">Details</button>
                        <button class="btn btn-danger">Edit</button>
                    </div>
                </div>
            </div>
        `;
    });
    // Insert the generated HTML into the table body
    tableBody.innerHTML = html;
}
// Render pagination controls
function renderPagination() {
    const pagination = document.querySelector('.pagination');
const maxPageButtons = 3; 
// Calclate visible page buttons
let startPage = Math.max(0, currentPage - Math.floor(maxPageButtons / 2));
let endPage = startPage + maxPageButtons;
// If end page exceeds total pages, adjust start and end page
if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(0, endPage - maxPageButtons);
}
// Generate HTML for pagination controls
    let html = '<a id="btnPrev" href="#" class="${currentPage === 0 ? "disabled" : ""}">&laquo;</a>';

    for (let i = startPage; i < endPage; i++) {
        html += `<a href="#" class="page-nr ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i + 1}</a>`;
    }
    // If there are more pages than the max visible, show ellipsis
if (endPage < totalPages) {
    html += `<span class=" page-nr dots">...</span>`;
}
    html += '<a  href="#" id="btnNext" href="#" class="${currentPage === totalPages - 1 ? "disabled" : ""}">&raquo;</a>';
// Insert the generated HTML into the pagination container
    pagination.innerHTML = html;
// Click events for pagination buttons
    attachPaginationEvents();
}
// Go to specific page
function goToPage(page) {
    currentPage = page;
    fetchGroups();
}
// Attach click events to next and previous buttons
function attachPaginationEvents() {
  
    document.getElementById('btnNext').addEventListener('click', (e) => {
        e.preventDefault();
        // Only go to next page if it's not the last page
        if (currentPage < totalPages - 1) {
            currentPage++;
            fetchGroups();
        }
    });
    document.getElementById('btnPrev').addEventListener('click', (e) => {
        e.preventDefault();
        // Only go to previous page if it's not the first page
        if (currentPage > 0) {
            currentPage--;
            fetchGroups();
        }
    });
}


fetchGroups();