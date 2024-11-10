const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonType = document.getElementById("types");
const pokemonSprite = document.getElementById('pokemon-sprite');
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

async function getData() {
    const url = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput.value.toLowerCase()}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            alert("Pokémon not found");
            throw new Error(`Response status: ${response.status}`);
        }

        if (searchInput.value === "") {
            alert("Please enter a valid Pokémon Name or ID.");
            return;
        } else if (!searchInput.value) {
            alert("Pokémon not found");
            return;
        }


            const json = await response.json();
        console.log(json);

        const name = json.name;
        pokemonName.innerHTML = name;

        const id = json.id;
        pokemonId.innerHTML = `#${id}`;

        const weight = json.weight;
        pokemonWeight.innerHTML = `Weight: ${weight}`;

        const height = json.height;
        pokemonHeight.innerHTML = `Height: ${height}`;

        // const types = json.types.map(typeInfo => typeInfo.type.name).join(', ');
        // pokemonType.innerHTML = `Types: ${types}`;

        pokemonType.innerHTML = '';

        json.types.forEach(typeInfo => {
            const typeElement = document.createElement('div'); // Create a new div for each type
            typeElement.textContent = typeInfo.type.name.toUpperCase(); // Set text to type name in uppercase
            pokemonType.appendChild(typeElement); // Append each type div to the #types container
        });

        const sprite = json.sprites.front_default;
        pokemonSprite.src = sprite;
        pokemonSprite.style.display = "block";

        const pokemonHp = json.stats[0].base_stat;
        hp.innerHTML = pokemonHp;

        const pokemonAttack = json.stats[1].base_stat;
        attack.innerHTML = pokemonAttack;

        const pokemonDefense = json.stats[2].base_stat;
        defense.innerHTML = pokemonDefense;

        const pokemonSpecialAttack = json.stats[3].base_stat;
        specialAttack.innerHTML = pokemonSpecialAttack;

        const pokemonSpecialDefense = json.stats[4].base_stat;
        specialDefense.innerHTML = pokemonSpecialDefense;

        const pokemonSpeed = json.stats[5].base_stat;
        speed.innerHTML = pokemonSpeed;


    } catch (error) {
        console.error(error.message);
    }

}

searchBtn.addEventListener("click", getData);