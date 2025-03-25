// ✅ Update Year in Footer
document.getElementById('year').textContent = new Date().getFullYear();

// ✅ Update Last Modified Date
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

// ✅ Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// ✅ Menu Toggle for Mobile
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// ✅ Visit Counter with localStorage
const visitCountElement = document.getElementById('visitCount');
let visitCount = localStorage.getItem('visitCount') ? parseInt(localStorage.getItem('visitCount')) : 0;
visitCount++;
localStorage.setItem('visitCount', visitCount);
visitCountElement.textContent = visitCount;
