const searchForm = document.querySelector('#search')
const pokemonContainer = document.querySelector('#pokemon-container')
const movesContainer = document.querySelector('.moves')

const getPokemon = async (query) => {
    let url = `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`
    let response = await fetch(url, {
        'Access-Control-Allow-Origin': '*'
    })
        .then((response) => response.json())
    return response
}
const showPokemon = async (query) => {
    let pokemon = await getPokemon(query)
    const pokemonData = {
        id: pokemon.id,
        name: pokemon.name,
        hp: pokemon.stats[0].base_stat,
        xp: pokemon.base_experience,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat,
        weight: pokemon.weight,
        special: {
            attack: pokemon.stats[3].base_stat,
            defense: pokemon.stats[4].base_stat
        },
        speed: pokemon.stats[5].base_stat,
        type: pokemon.types[0].type.name,
        img: pokemon.sprites.front_default
    }
    pokemonContainer.innerHTML = `
    <p id="name" class="text-uppercase fw-bold"><span class="fw-normal fst-italic fs-4">#${pokemonData.id}</span> ${pokemonData.name}</p>
    <p id="type" class="text-capitalize fw-bold">${pokemonData.type}</p>
    <img src="${pokemonData.img}" height="100" width="100" alt="front_sprite" class="front-img"></img>
    <div class="container border border-3 border-dark w-50 text-center mt-2">
    <p class="fs-3 fw-bold text-uppercase border-bottom border-dark border-3 text-start">Base Stats</p>
    <p id="hp" class="fs-3"><span class="fst-italic fs-4"><i class="fas fa-heart"></i></span> ${pokemonData.hp}</p>
    <p id="xp"class="fs-3"><span class="fst-italic fs-4">XP</span> ${pokemonData.xp}</p>
    <p id="att-def"class="fs-3"><span class="fst-italic fs-4"><i class="fas fa-fist-raised"></i>/<i class="fas fa-shield-alt"></i></span> ${pokemonData.attack}/${pokemonData.defense}</p>
    <p id="sp-att-def"class="fs-3"><span class="fst-italic fs-4"> SP <i class="fas fa-fist-raised"></i>/ SP <i class="fas fa-shield-alt"></i></span> ${pokemonData.special.attack}/${pokemonData.special.defense}</p>
    <p id="sp"class="fs-3"><span class="fst-italic fs-4"><i class="fas fa-shoe-prints"></i></span> ${pokemonData.speed}</p>
    <p id="sp"class="fs-3"><span class="fst-italic fs-4"><i class="fas fa-weight-hanging"></i></span> ${pokemonData.weight}</p>
    </div>
    <div class="container border border-3 border-dark w-50 mt-2 moves">
    <p class="fs-3 fw-bold text-uppercase border-bottom border-dark border-3">Base Moves</p>
    </div>
    </div>
    `
    const moves = []
    const movesContainer = document.querySelector('.moves')
    for (let i = 0; i <= pokemon.moves.length; i++) {
        if (pokemon.moves[i]) {
            moves.push(pokemon.moves[i].move.name)
            const individualMove = document.createElement('div')
            individualMove.classList.add('text-center', 'fs-6', 'text-capitalize', 'border-bottom', 'border-3', 'border-dark')
            individualMove.textContent = moves[i]
            movesContainer.classList.add('d-flex', 'flex-column')
            movesContainer.appendChild(individualMove)
        }
    }
}

searchForm.addEventListener('submit', (event) => {
    const searchData = new FormData(searchForm)
    const pokemonName = searchData.get('pokemon-name')
    getPokemon(pokemonName)
    showPokemon(pokemonName)
    searchForm.reset()
    event.preventDefault()
})