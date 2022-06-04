import SwapiClient from "./SwapiCient";

const swapiClient = new SwapiClient();

document.addEventListener("DOMContentLoaded", () => {
  const planetsForm = document.querySelector(".js-form-planets");
  const planetsResultEl = document.querySelector(".js-planets-result");

  planetsForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const searchEl = document.querySelector(
      '.js-form-planets [name="search"]'
    ) as HTMLInputElement;
    const search = searchEl.value;

    planetsResultEl.innerHTML = "Loading...";

    swapiClient.getPlanets({ search: search }).then((planetsData) => {
      planetsResultEl.innerHTML = JSON.stringify(planetsData, null, 4);
      console.log(planetsData.results[0].surface_water);
    });
  });
});

