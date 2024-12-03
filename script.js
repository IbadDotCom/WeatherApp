const apiKey = "50a87220926cdd6f41fbdcb1105b51cd";

async function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found!");
    }
    const data = await response.json();

    const { name } = data;
    const { temp, humidity } = data.main;
    const { description } = data.weather[0];
    const { speed } = data.wind;

    document.getElementById("weatherData").innerHTML = `
      <p><strong>City:</strong> ${name}</p>
      <p><strong>Temperature:</strong> ${temp}°C</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Wind Speed:</strong> ${speed} m/s</p>
    `;
  } catch (error) {
    document.getElementById("weatherData").innerHTML = `<p>${error.message}</p>`;
  }
}

document.getElementById("getWeather").addEventListener("click", () => {
  const city = document.getElementById("city").value.trim();
  if (city) {
    getWeatherData(city);
  } else {
    alert("Please enter a city name!");
  }
});
