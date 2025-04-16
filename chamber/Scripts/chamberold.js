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

        if (daysSinceLastVisit < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            visitMessage.textContent = `You last visited ${daysSinceLastVisit} ${daysSinceLastVisit === 1 ? "day" : "days"} ago.`;
        }
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
