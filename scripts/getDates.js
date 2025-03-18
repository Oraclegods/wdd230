// Dynamically update the copyright year and last modified date

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;



document.addEventListener("DOMContentLoaded", function () {
    // Hamburger Menu Toggle
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("show");
        menuToggle.innerHTML = navMenu.classList.contains("show") ? "✖" : "☰";
    });

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    darkModeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        darkModeToggle.innerHTML = body.classList.contains("dark-mode") ? "☀️" : "🌙";
    });
});
