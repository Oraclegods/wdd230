document.getElementById("last-modified").textContent = document.lastModified;

// LocalStorage for visit tracking
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();
const visitMessage = document.getElementById("visit-message");

if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const lastVisitTime = parseInt(lastVisit, 10); // Convert to number
    const daysSinceLastVisit = Math.floor((now - lastVisitTime) / (1000 * 60 * 60 * 24));

    if (daysSinceLastVisit < 1) {
        visitMessage.textContent = "Back so soon! Awesome!";
    } else {
        visitMessage.textContent = `You last visited ${daysSinceLastVisit} ${daysSinceLastVisit === 1 ? "day" : "days"} ago.`;
    }
}

// Store the current visit time
localStorage.setItem("lastVisit", now);

// Set the current timestamp for the form on 'join.html'
document.addEventListener('DOMContentLoaded', () => {
    const timestampInput = document.getElementById('timestamp');
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }
});
