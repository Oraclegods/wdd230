document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll("img.lazy-load");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute("data-src");
                img.classList.add("lazy-loaded");
                observer.unobserve(img);
            }
        });
    }, { threshold: 0.1 });

    images.forEach(img => observer.observe(img));

    // Update the last modified date
    document.getElementById("lastModified").textContent = 
        "Last Modified: " + document.lastModified;
});

