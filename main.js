function buscarPokemon() {
  let nombre = document.getElementById("pokemonInput").value.trim(); // Elimina espacios en blanco

  if (nombre === "") {
    alert("Por favor, ingresa un nombre de Pokémon o el ID.");
    return;
  }

  console.log(`Buscando Pokémon: ${nombre}`); // Se ejecuta correctamente
  getPokemonData(nombre);
}

const listaPokemon = document.querySelector("#listapokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";
for (let i = 1; i <= 151; i++) {
  fetch(URL + i)
    .then((response) => response.json())
    .then((data) => mostrarPokemon(data));
}

function mostrarPokemon(poke) {
  let tipos = poke.types.map(
    (type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`
  );
  tipos = tipos.join("");

  let pokeId = poke.id.toString();
  if (pokeId.length === 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
  }

  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `
         <p class="pokemon-id-back">${pokeId}</p>
         <div class="pokemon-imagen">
             <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
         </div>
   <div class="pokemon-info">
    <div class="nombre-contenedor">
     <p class="pokemon-id">${pokeId}</p>
    <h2 class="pokemon-nombre">${poke.name}</h2>
     </div>
  <div class="pokemon-tipos">
            ${tipos}
    </div>
<div class="pokemon-stats">
  <p class="stat">${poke.height}m</p>
    <p class="stat">${poke.weight}gr</p>
  </div>
</div>
`;
  listaPokemon.append(div);
}

botonesHeader.forEach((boton) =>
  boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;
    listaPokemon.innerHTML = "";
    for (let i = 1; i <= 151; i++) {
      fetch(URL + i)
        .then((response) => response.json())
        .then((data) => {
          if (botonId === "todos") {
            mostrarPokemon(data);
          } else {
            const tipos = data.types.map((type) => type.type.name);
            if (tipos.some((tipo) => tipo.includes(botonId))) {
              mostrarPokemon(data);
            }
          }
        });
    }
  })
);

document.getElementById("buscar").addEventListener("click", buscarPokemon);

async function getPokemonData(pokemonName) {
  try {
    let respuesta = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
    );

    if (!respuesta.ok) {
      throw new Error(`Error: Pokémon "${pokemonName}" no encontrado`);
    }

    let data = await respuesta.json();

    document.getElementById("imagen").src = data.sprites.front_default;
    document.getElementById("imagen").style.display = "block";
    document.getElementById("nombre").textContent = `Nombre: ${data.name}`;
    document.getElementById("tipos").textContent = `Tipos: ${data.types
      .map((t) => t.type.name)
      .join(", ")}`;
  } catch (error) {
    alert(error.message);
  }
}

function buscarPokemon() {
  let nombre = document.getElementById("pokemonInput").value.trim();

  if (nombre === "") {
    alert("Por favor, ingresa un nombre de Pokémon.");
    return;
  }

  console.log(`Buscando Pokémon: ${nombre}`);
  getPokemonData(nombre);
}
