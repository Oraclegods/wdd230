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

    // Close menu when clicking outside (on mobile)
    document.addEventListener("click", function (event) {
        if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove("show");
            menuToggle.innerHTML = "☰"; // Reset to hamburger icon
        }
    });

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    darkModeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        // Change button icon based on mode
        darkModeToggle.innerHTML = body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
    });
});
