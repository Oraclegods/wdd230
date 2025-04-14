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
    const learningActivitiesContainer = document.querySelector('.learning-activities');
    learningActivitiesContainer.innerHTML = ''; // Clear current content

    data.weeks.forEach(week => {
        // Create card for each week
        const weekCard = document.createElement('div');
        weekCard.classList.add('week-card');

        // Week title
        const weekTitle = document.createElement('h3');
        weekTitle.textContent = week.week;

        // Create ul for links
        const weekList = document.createElement('ul');

        week.links.forEach(link => {
            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.href = baseURL + link.url;
            anchor.textContent = link.title;
            listItem.appendChild(anchor);
            weekList.appendChild(listItem);
        });

        // Append all to week card
        weekCard.appendChild(weekTitle);
        weekCard.appendChild(weekList);

        // Add card to the learning activities container
        learningActivitiesContainer.appendChild(weekCard);
    });
}

// Call the function on page load
getLinks();
