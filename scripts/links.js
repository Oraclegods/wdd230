// Define base URL and links.json URL
const baseURL = "https://oraclegods.github.io/wdd230/";
const linksURL = "data/links.json";

// Fetch and display the dynamic links from links.json
async function getLinks() {
    try {
        const response = await fetch(linksURL);
        const data = await response.json();
        displayLinks(data);
    } catch (error) {
        console.error('Error fetching links:', error);
    }
}

// Display the links dynamically in the Learning Activities section
function displayLinks(data) {
    const learningActivitiesList = document.querySelector('.learning-activities ul');
    learningActivitiesList.innerHTML = ''; // Clear current list

    data.weeks.forEach(week => {
        const weekTitle = document.createElement('h3');
        weekTitle.textContent = week.week;
        learningActivitiesList.appendChild(weekTitle);

        week.links.forEach(link => {
            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.href = baseURL + link.url;
            anchor.textContent = link.title;
            listItem.appendChild(anchor);
            learningActivitiesList.appendChild(listItem);
        });
    });
}

// Call the function on page load
getLinks();
