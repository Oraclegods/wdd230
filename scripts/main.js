// ✅ Update Year in Footer
document.getElementById('year').textContent = new Date().getFullYear();

// ✅ Update Last Modified Date
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

// ✅ Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

darkModeToggle.addEventListener("click", function () {
    body.classList.toggle("dark-mode");

    // Change button text based on mode
    darkModeToggle.innerHTML = body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// ✅ Menu Toggle for Mobile
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// ✅ Close menu when clicking outside (Optional)
document.addEventListener('click', (event) => {
    if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.remove('show');
    }
});

// ✅ Visit Counter with localStorage
const visitCountElement = document.getElementById('visitCount');
let visitCount = localStorage.getItem('visitCount') ? parseInt(localStorage.getItem('visitCount')) : 0;
visitCount++;
localStorage.setItem('visitCount', visitCount);
visitCountElement.textContent = visitCount;
