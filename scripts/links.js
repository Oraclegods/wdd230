// Define base URL and links.json URL
const baseURL = "https://yourgithubusername.github.io/wdd230/";
const linksURL = "https://yourgithubusername.github.io/wdd230/data/links.json";

// Fetch and display the weather data
async function getWeather() {
    const apiKey = 'YOUR_API_KEY';  // Replace with your OpenWeatherMap API key
    const city = 'Aba';  // Replace with your desired city
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    try {
        const response = await fetch(weatherURL);
        const data = await response.json();

        // Extract weather data
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;

        // Update the weather information card
        document.querySelector('.information p').innerHTML = `🌞 ${temperature}°F - ${description.charAt(0).toUpperCase() + description.slice(1)}`;
        document.querySelector('.information').innerHTML += `
            <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="${description}">
        `;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

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

// Call the functions when the page loads
getWeather();
getLinks();
