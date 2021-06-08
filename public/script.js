const searchForm = document.querySelector('#search')
const pokemonContainer = document.querySelector('#pokemon-container')

const getPokemon = async (query) => {
    let url = `https://pokeapi.co/api/v2/pokemon/${query}`
    let response = await fetch(url, {
        'Access-Control-Allow-Origin': '*'
    })
        .then((response) => response.json())
    return response
}
const showPokemon = async (query) => {
    let pokemon = await getPokemon(query)
    pokemonContainer.innerHTML = `
    <img src="${pokemon.sprites.front_default}" height="150" width="150" alt="front-sprite"></img>
    <p id="name">Name: ${pokemon.name}</p>
    `
}

searchForm.addEventListener('submit', (event) => {
    const searchData = new FormData(searchForm)
    const pokemonName = searchData.get('pokemon-name')
    getPokemon(pokemonName)
    showPokemon(pokemonName)
    searchForm.reset()
    event.preventDefault()
})