// ✅ Update Year in Footer
document.getElementById('year').textContent = new Date().getFullYear();

// ✅ Update Last Modified Date
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

// ✅ Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

darkModeToggle.addEventListener("click", function () {
    body.classList.toggle("dark-mode");
    darkModeToggle.innerHTML = body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// ✅ Menu Toggle for Mobile
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const menuLinks = navMenu.querySelectorAll("a");

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// ✅ Close menu when clicking a menu item
menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("show");
    });
});

// ✅ Close menu when clicking outside
document.addEventListener("click", (event) => {
    if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.remove("show");
    }
});

// ✅ Visit Counter with localStorage
const visitCountElement = document.getElementById('visitCount');
let visitCount = localStorage.getItem('visitCount') ? parseInt(localStorage.getItem('visitCount')) : 0;
visitCount++;
localStorage.setItem('visitCount', visitCount);
visitCountElement.textContent = visitCount;
visitCountElement.style.color = "black"; // Ensuring visit counter text is black

// ✅ Weather API Integration (moved from links.js)
async function getWeather() {
    const apiKey = "433ee5fedb5d48451333629dd4f54d48";
    const city = "Aba";
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    try {
        const response = await fetch(weatherURL);
        const data = await response.json();

        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;

        const iconElement = document.getElementById("weather-icon");
        iconElement.src = `https://openweathermap.org/img/wn/${iconCode}.png`;
        iconElement.alt = description;
        iconElement.loading = "lazy";

        document.getElementById("temperature").textContent = `🌞 ${temperature}°F`;
        document.getElementById("description").textContent = description.charAt(0).toUpperCase() + description.slice(1);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Set fallback src to avoid validation error if JS fails
document.getElementById("weather-icon").src = "https://via.placeholder.com/50";

// Call weather function on load
getWeather();
