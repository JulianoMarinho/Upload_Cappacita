//Sistema de bd virtual para cadastrarmos pokemon e listarmos
//logica para passar se nao passarmos um parametro, ele pega a sequencia que parou
const sequence = {
    _id: 1,
    get id() { return this._id++ }
}

const pokemons = []

function salvarPokemons(pokemon){
    if(!pokemon.id) pokemon.id = sequence.id
    //o pokemon.id vai receber o pokemon que estamos cadastrando
    pokemons[pokemon.id] = pokemon;
    return pokemon;
}

// funcao para mostrar pokemon, ela vai receber um id, se nao haver pokemon cadastrado
// naquele id, ela retorna um objeto vazio.
function mostrarPokemon(id) {
    return pokemons[id] || {};
}

// essa funcao mostra todos os pokemons, dentro do objeto existem uma funcao que mostra
// so os valores do objeto.
function mostrarPokemons(){
    return Object.values(pokemons);
}


function atualizarPokemon(id, pokemon){
    //pokemon existente recebe o valor recebido na requisição
    pokemons[id] = pokemon;
    return pokemon
}

function deletarPokemon(id){
    //sempre quando deletar um pokemon a contagem vai retornar 1
    sequence._id = sequence._id - 1
    const pokemonDeletado = pokemons[id]
    //splice 1-Parâmetro posição, 2 - paramentro qntidade de elemento que queremos deletar
    //a partir do elemento especificado
    pokemons.splice(id, 1)
    pokemons.forEach(pokemon => {
        if(pokemon.id > id){
            pokemon.id = pokemon.id -1
        }
    })
    return pokemonDeletado
}
//essa linha exporta os dados para nosso servidor
module.exports = { salvarPokemons, mostrarPokemon, mostrarPokemons,atualizarPokemon,deletarPokemon};