// TODO: JS Function
const screenOutput = document.getElementById("screen-output");
const searchButton = document.getElementById("search-button");
const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const baseStatsContainer = document.getElementById("base-stats-container");

const fetchCreature = async (creatureName) => {
  try {
    const res = await fetch(
      `https://rpg-creature-api.freecodecamp.rocks/api/creature/${creatureName}`
    );
    if (!res.ok) {
      throw new Error("Creature not found");
    }
    const data = await res.json();
    console.log("API Response:", data);
    displayResults(data);
    displayStats(data);
  } catch (err) {
    alert(err.message);
  }
};

const displayResults = (data) => {
  console.log("API Data:", data);

  const {
    id,
    name,
    height: apiHeight,
    weight: apiWeight,
    types: apitTypes,
  } = data;
  const typesName = apitTypes
    .map((type) => type.type?.name || type.name)
    .join(" ");

  creatureName.textContent = name;
  creatureId.textContent = `#${id}`;
  weight.textContent = `Weight: ${apiWeight}`;
  height.textContent = `Height: ${apiHeight}`;
  types.textContent = `Type: ${typesName}`;
};

const displayStats = (data) => {
  const { stats } = data;
  const statIdMap = {
    hp: "hp",
    attack: "attack",
    defense: "defense",
    "special-attack": "special-attack",
    "special-defense": "special-defense",
    speed: "speed",
  };

  stats.forEach((stat) => {
    const statName = stat.stat?.name || stat.name;
    const elementId = statIdMap[statName];

    if (elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        element.textContent = stat.base_stat;
      }
    }
  });
};

searchButton.addEventListener("click", () => {
  const searchInput = document
    .getElementById("search-input")
    .value.trim()
    .toLowerCase();
  if (!searchInput) {
    alert("Creature not found");
    return;
  }
  fetchCreature(searchInput);
});
