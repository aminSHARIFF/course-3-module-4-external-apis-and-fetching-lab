// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=";

// your code here!

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#state-input");
  const button = document.querySelector("#fetch-alerts");
  const alertsDiv = document.querySelector("#alerts-display");
  const errorDiv = document.querySelector("#error-message");

  function displayError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove("hidden");
  }

  function clearError() {
    errorDiv.textContent = "";
    errorDiv.classList.add("hidden");
  }

  function displayAlerts(data) {
    alertsDiv.innerHTML = "";

    const count = data.features.length;

    const titleLine = `${data.title}: ${count}`;
    const titleElement = document.createElement("p");
    titleElement.textContent = titleLine;
    alertsDiv.appendChild(titleElement);

    data.features.forEach(alert => {
      const p = document.createElement("p");
      p.textContent = alert.properties.headline;
      alertsDiv.appendChild(p);
    });
  }

  async function fetchWeatherAlerts(state) {
    try {
      clearError();

      const response = await fetch(`${weatherApi}${state}`);

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();

      displayAlerts(data);

    } catch (error) {
      displayError(error.message);
    }
  }

  button.addEventListener("click", () => {
    const state = input.value.trim();

    fetchWeatherAlerts(state);

    // Must clear input AFTER clicking per test
    input.value = "";
  });
});
