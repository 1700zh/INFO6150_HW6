const cityInput = document.getElementById('city');
const getWeatherBtn = document.getElementById('getWeather');

function getWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    alert('Please enter a city name.');
    return;
  }

  const apiKey = 'a84dfbbb3045417da1b45647252203';
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found or API error.');
      }
      return response.json();
    })
    .then(data => {
      const { location, current } = data;

      document.getElementById('resultCity').textContent = `${location.name}, ${location.region}, ${location.country}`;
      document.getElementById('resultTemp').textContent = current.temp_c;
      document.getElementById('resultDesc').textContent = current.condition.text;
      document.getElementById('resultHumidity').textContent = current.humidity;
      document.getElementById('weatherResult').hidden = false;
    })
    .catch(error => {
      alert(error.message);
      document.getElementById('weatherResult').hidden = true;
    });
}

// Button click event
getWeatherBtn.addEventListener('click', getWeather);

// Enter key press event
cityInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    getWeather();
  }
});
