// Dynamically update the copyright year and last modified date
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

document.addEventListener("DOMContentLoaded", function () {
    // Hamburger Menu Toggle
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    menuToggle.addEventListener("click", function () {
        // Toggle the 'show' class to open/close the menu
        navMenu.classList.toggle("show");

        // Ensure the menu contains list items
        if (navMenu.innerHTML.trim() === "") {
            navMenu.innerHTML = `
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            `;
        }

        // Change the hamburger icon to 'X' when menu is open
        menuToggle.innerHTML = navMenu.classList.contains("show") ? "✖" : "☰";
    });

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    darkModeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        // Change the button icon based on mode
        darkModeToggle.innerHTML = body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
    });
});
