document.getElementById("last-modified").textContent = document.lastModified;

// LocalStorage for visit tracking
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();
const visitMessage = document.getElementById("visit-message");

if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const daysSinceLastVisit = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (daysSinceLastVisit < 1) {
        visitMessage.textContent = "Back so soon! Awesome!";
    } else {
        visitMessage.textContent = `You last visited ${daysSinceLastVisit} ${daysSinceLastVisit === 1 ? "day" : "days"} ago.`;
    }
}
localStorage.setItem("lastVisit", now);

