// Select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// Coordinates for Aba, Nigeria
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=5.11&lon=7.37&units=imperial&appid=YOUR_API_KEY_HERE';

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // for testing
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp.toFixed(1)}&deg;F`;
  const iconCode = data.weather[0].icon;
  const iconSrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const desc = data.weather[0].description;

  weatherIcon.setAttribute('src', iconSrc);
  weatherIcon.setAttribute('alt', `Weather icon showing ${desc}`);
  captionDesc.textContent = desc;
}

apiFetch();

