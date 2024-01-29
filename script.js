const pokeTypeURL = 'https://pokeapi.co/api/v2/type/';
const pokeQueryParams = new URLSearchParams(window.location.search);
// console.log(pokeQueryParams);
const typeParams = new URLSearchParams(window.location.search);
const typeSearch = typeParams.get('type');
// console.log(typesearch);

const pokedex = document.getElementById('pokedex');
const pokemonSearchForm  = document.querySelector('#pokemon-search-form');
const pokemonTypeFilter = document.querySelector('.type-filter');

let pokemonArray = [];
let uniqueTypes = new Set();

const fetchPokemon = () => {
    const NumberOfCards = [];
    for(let i=1; i<= 151; i++){
        const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${i}`;
        // console.log(pokemonURL);
        NumberOfCards.push(fetch(pokemonURL).then(res => res.json()))
    }

    Promise.all(NumberOfCards)
    .then(allPokemon =>{
        const details = allPokemon.map(pokemon=>({
            frontImage: pokemon.sprites.other.home.front_default,
            pokemon_id:pokemon.id,
            name:pokemon.name,
            type:pokemon.types[0].type.name,
            abilities:pokemon.abilities.map(ability=>ability.ability.name).join(', '),
            description:pokemon.species.url,
            weight:pokemon.weight,
            height: pokemon.height,

        }))
        pokemonArray = details;
        console.log(allPokemon);
        createPokemonCards(details);
    })
    .then(generateTypes);
}

fetchPokemon()

pokemonSearchForm.addEventListener('input',(event)=>{
    const filterPokemon = pokemonArray.filter(pokemon => pokemon.name.includes(event.target.value.toLowerCase()))
    clearPokedex()
    createPokemonCards(filterPokemon)
})

function clearPokedex(){
    let section = document.querySelector('#pokedex');
    section.innerHTML = ''
}

function createPokemonCards(pokemons){
    let currentPokemon = pokemons;
    if(typeSearch){
        currentPokemon = pokemons.filter(pokemon => pokemon.type.includes(typeSearch.toLowerCase()))
    }
    currentPokemon.forEach(pokemon=>{
        createPokemonCard(pokemon)
    })
}

function generateTypes(){
    uniqueTypes.forEach(type=>{
        const typeOption = document.createElement('option');
        typeOption.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        typeOption.value = type;

        pokemonTypeFilter.append(typeOption)
    })
    console.log();
}



// Cards

function createPokemonCard(pokemon){
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip_card");
    pokedex.appendChild(flipCard);

    // inner card including front section_back section

    const flipcardinner = document.createElement("div");
    flipcardinner.classList.add("single_card");
    flipCard.appendChild(flipcardinner);

    // iner front face 

    const front = document.createElement("div");
    front.classList.add("front_css");
    front.classList.add(`${pokemon.type}`);

    // frontid
    const frontid = document.createElement("p");
    frontid.classList.add("p_css");
    frontid.innerText = `${pokemon.pokemon_id}`

    // front image

    const frontimg = document.createElement("img");
    frontimg.classList.add("frontimg_css");
    frontimg.src = `${pokemon.frontImage}`;
    console.log(frontimg);
    
    // front name

    const frontname = document.createElement("h2");
    frontname.classList.add("name_css");
    frontname.innerText = `${pokemon.name}`;
    // console.log(frontname);


    //  span

    const SPANN = document.createElement("div");
    SPANN.classList.add("span_css");

    // front weight

    const Weight = document.createElement("span");
    Weight.classList.add("Weight_css");
    Weight.innerText = ` weight:${pokemon.weight}`;
    SPANN.appendChild(Weight);
    // console.log(Weight);

    // front pokemontype

    const Typesname = document.createElement("span");
    Typesname.classList.add(`typesname_css`);
    Typesname.innerText = `${pokemon.type.toUpperCase()}`;
    SPANN.appendChild(Typesname)

    front.append(frontid,frontimg,frontname,SPANN);

    // back side 


    const Back = document.createElement("div");
    Back.classList.add("back_css");
    Back.classList.add(`${pokemon.type}`);


    // back id

    const backid = document.createElement("p");
    backid.classList.add("backid_css");
    backid.innerText = `${pokemon.pokemon_id}`;

    // back name

    const backname = document.createElement("h2");
    backname.innerText = `${pokemon.name}`;
    backname.classList.add("backname_css");

    // back height

    const height = document.createElement("h3");
    height.classList.add("height_css");
    height.innerText = `height:${pokemon.height}`;

    //  back abilities

    const Abilities = document.createElement("p");
    const Values = document.createElement("p");
    Abilities.classList.add("Abilities_css");
    Abilities.innerText = "Abilities:"
    Values.innerText = `${pokemon.abilities}`
   

    Back.append(backid,backname,height,Abilities,Values)

    flipcardinner.append(front,Back);
    uniqueTypes.add(pokemon.type);
}

