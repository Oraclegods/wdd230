// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {

    // ==========================
    // 1. Last Modified Date
    // ==========================
    const lastModified = document.getElementById("last-modified");
    if (lastModified) {
        lastModified.textContent = document.lastModified;
    }

    // ==========================
    // 2. Visit Tracker (LocalStorage)
    // ==========================
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();
    const visitMessage = document.getElementById("visit-message");

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

    // ==========================
    // 3. Join Form Timestamp
    // ==========================
    const timestampInput = document.getElementById('timestamp');
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }

    // ==========================
    // 4. Directory Page Logic
    // ==========================
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

        // Load members from JSON
        loadMembers();

        // Grid/List toggle functionality
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

    // ==========================
    // 5. Mobile Menu Toggle
    // ==========================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }

});
