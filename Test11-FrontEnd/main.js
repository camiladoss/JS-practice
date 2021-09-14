const pokeContainer = document.querySelector(".poke_container");
const searchButton = document.getElementById("search_button");
const search = document.getElementById("search");

const fetchPokemon = async (name) => {
  document.getElementById("show_error").classList.remove("show");
  document.getElementById("show_error").classList.add("hidden");

  const data = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const response = await fetch(data);
  
  if (response.status == 404 || response.statusText == "Not Found") {
    document.getElementById("show_error").classList.add("show");
    document.getElementById("show_error").classList.remove("hidden");
    return;
  }
  const pokemon = await response.json();
  createPokemon(pokemon);
};

const createPokemon = (pokemon) => {
  const mainCard = document.createElement("div");
  mainCard.classList.add("main_card");

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card_container");

  mainCard.appendChild(cardContainer);

  const card = document.createElement("div");
  card.classList.add("card", "my_card");

  const spriteContainer = document.createElement("div");
  spriteContainer.classList.add("img_container");

  const sprite = document.createElement("img");
  sprite.classList.add("my_image");
  sprite.src = pokemon.sprites.front_default;

  spriteContainer.appendChild(sprite);

  const name = document.createElement("p");
  name.classList.add("name");
  name.textContent = pokemon.name;

  card.appendChild(spriteContainer);
  card.appendChild(name);
  card.appendChild(info(pokemon.stats));
  card.appendChild(moves(pokemon.moves));
  card.appendChild(abilities(pokemon.abilities));
  cardContainer.appendChild(card);
  pokeContainer.appendChild(mainCard);
};

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function info(stats) {
  const statsContainer = document.createElement("div");
  statsContainer.classList.add("stats_container");

  for (let i = 0; i < 3; i++) {
    const stat = stats[i];

    const statPercent = stat.base_stat + "%";

    const statContainer = document.createElement("stat_container");
    statContainer.classList.add("stat_container");

    const statName = document.createElement("p");
    statName.classList.add("stat_name");
    statName.textContent = stat.stat.name;

    const progress = document.createElement("div");
    progress.classList.add("progress");

    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    progressBar.setAttribute("aria-valuenow", stat.base_stat);
    progressBar.setAttribute("aria-valuemin", 0);
    progressBar.setAttribute("aria-valuemax", 150);
    progressBar.style.width = statPercent;

    progressBar.textContent = stat.base_stat;

    progress.appendChild(progressBar);
    statContainer.appendChild(statName);
    statContainer.appendChild(progress);

    statsContainer.appendChild(statContainer);
  }

  return statsContainer;
}

function moves(moves) {
  const movesContainer = document.createElement("div");
  movesContainer.classList.add("moves_container");

  const titleMove = document.createElement("h2");
  titleMove.textContent = "MOVES";

  movesContainer.appendChild(titleMove);

  moves.slice(0, 3).forEach((move) => {
    //console.log("movimiento", move.move);
    const moveContainer = document.createElement("move_container");
    moveContainer.classList.add("move_container");

    const moveName = document.createElement("p");

    moveName.textContent = move.move.name;

    moveContainer.appendChild(moveName);

    movesContainer.appendChild(moveContainer);
  });

  return movesContainer;
}

function abilities(abilities) {
  const abilitiesContainer = document.createElement("div");
  abilitiesContainer.classList.add("abilities_container");

  const titleAbilities = document.createElement("h2");
  titleAbilities.textContent = "ABILITIES";

  abilitiesContainer.appendChild(titleAbilities);

  abilities.slice(0, 3).forEach((ability) => {
    //console.log("habilidad", ability.ability);
    const abiContainer = document.createElement("div");
    abiContainer.classList.add("abi_container");

    const abiName = document.createElement("p");
    abiName.textContent = ability.ability.name;

    abiContainer.appendChild(abiName);
    abilitiesContainer.appendChild(abiContainer);
  });

  return abilitiesContainer;
}

searchButton.addEventListener("click", () => {
  fetchPokemon(search.value);
  removeChildNodes(pokeContainer);
});
