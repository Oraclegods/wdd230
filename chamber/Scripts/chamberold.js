// ✅ LAST MODIFIED
document.getElementById("last-modified").textContent = document.lastModified;

// ✅ VISIT TRACKING
const visitMessage = document.getElementById("visit-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (visitMessage) {
    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitTime = parseInt(lastVisit, 10);
        const daysSinceLastVisit = Math.floor((now - lastVisitTime) / (1000 * 60 * 60 * 24));

        visitMessage.textContent =
            daysSinceLastVisit < 1
                ? "Back so soon! Awesome!"
                : `You last visited ${daysSinceLastVisit} ${daysSinceLastVisit === 1 ? "day" : "days"} ago.`;
    }
    localStorage.setItem("lastVisit", now);
}

// ✅ MEET & GREET BANNER (Mon–Wed Only)
function showBanner() {
    const banner = document.querySelector("#meet-banner");
    const dismissed = localStorage.getItem("bannerClosed");
    const today = new Date().getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat

    if ((today >= 1 && today <= 3) && !dismissed && banner) {
        banner.style.display = "block";
        const closeBtn = document.getElementById("close-banner");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                banner.style.display = "none";
                localStorage.setItem("bannerClosed", "true");
            });
        }
    }
}
showBanner();

// ✅ WEATHER + FORECAST
const weatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=Ibadan,NG&appid=433ee5fedb5d48451333629dd4f54d48&units=metric";

async function getWeather() {
    try {
        const response = await fetch(weatherURL);
        const data = await response.json();

        // Current weather
        const current = data.list[0];
        document.getElementById("current-temp").textContent = `${current.main.temp.toFixed(1)}°C`;
        document.getElementById("weather-description").textContent = current.weather[0].description;

        // 3-day forecast
        const forecastContainer = document.getElementById("forecast");
        if (forecastContainer) {
            forecastContainer.innerHTML = "";
            const days = {};
            for (let forecast of data.list) {
                const date = new Date(forecast.dt_txt);
                const day = date.toDateString();
                if (!days[day] && date.getHours() === 12) {
                    days[day] = forecast;
                    if (Object.keys(days).length === 3) break;
                }
            }

            Object.values(days).forEach(f => {
                const div = document.createElement("div");
                const dayName = new Date(f.dt_txt).toLocaleDateString("en-US", { weekday: "short" });
                div.innerHTML = `<strong>${dayName}</strong>: ${f.main.temp.toFixed(1)}°C`;
                forecastContainer.appendChild(div);
            });
        }
    } catch (err) {
        console.error("Weather fetch error:", err);
    }
}
getWeather();

// ✅ SPOTLIGHT MEMBERS
async function getSpotlightMembers() {
    try {
        const response = await fetch("data/members.json");
        const data = await response.json();

        const qualified = data.filter(member =>
            member.membership === "Gold" || member.membership === "Silver"
        );

        const shuffled = qualified.sort(() => 0.5 - Math.random());
        const spotlight = shuffled.slice(0, 3);

        const container = document.getElementById("spotlights");
        if (container) {
            container.innerHTML = "";
            spotlight.forEach(member => {
                const card = document.createElement("section");
                card.classList.add("spotlight");
                card.innerHTML = `
                    <img src="${member.image}" alt="${member.name} logo" loading="lazy" onerror="this.src='images/default.png'">
                    <h3>${member.name}</h3>
                    <p><a href="${member.website}" target="_blank">${member.website}</a></p>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                `;
                container.appendChild(card);
            });
        }
    } catch (err) {
        console.error("Member fetch error:", err);
    }
}
getSpotlightMembers();

// ✅ DIRECTORY PAGE + FORM TIMESTAMP
document.addEventListener('DOMContentLoaded', () => {
    const timestampInput = document.getElementById('timestamp');
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }

    const container = document.getElementById("members-container");
    const gridBtn = document.getElementById("grid-view");
    const listBtn = document.getElementById("list-view");

    if (container) {
        async function loadMembers() {
            try {
                const response = await fetch("data/members.json");
                const members = await response.json();

                container.innerHTML = "";

                members.forEach(member => {
                    const card = document.createElement("div");
                    card.classList.add("member-card");

                    card.innerHTML = `
                        <img src="${member.image}" alt="${member.name}" loading="lazy" onerror="this.src='images/default.png'">
                        <h3>${member.name}</h3>
                        <p>${member.address}</p>
                        <p>${member.phone}</p>
                        <a href="${member.website}" target="_blank">${member.website}</a>
                        <p><strong>Membership:</strong> ${member.membership}</p>
                    `;

                    container.appendChild(card);
                });
            } catch (error) {
                container.innerHTML = "<p>Error loading member data.</p>";
                console.error("Error fetching members.json:", error);
            }
        }

        console.log("Directory page script loaded");
        loadMembers();

        if (gridBtn && listBtn) {
            gridBtn.addEventListener("click", () => {
                container.classList.add("grid");
                container.classList.remove("list");
                gridBtn.classList.add("active");
                listBtn.classList.remove("active");
            });

            listBtn.addEventListener("click", () => {
                container.classList.add("list");
                container.classList.remove("grid");
                listBtn.classList.add("active");
                gridBtn.classList.remove("active");
            });
        }
    }

    // ✅ HAMBURGER MENU TOGGLE FOR MOBILE
document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (toggleBtn && navLinks) {
        toggleBtn.addEventListener("click", () => {
            navLinks.classList.toggle("show");
        });
    }
});

});
