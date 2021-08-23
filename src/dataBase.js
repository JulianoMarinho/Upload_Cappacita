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

function batalhaPokemon(id1, id2){
    const superEfetivo = 40;
    const Efetivo = 20;
    const naoEfetivo = 10;
    //variavel recebe o parametro do id passado
    const pokemon1 = pokemons[id1];
    const pokemon2 = pokemons[id2];

    //batalha
    if(pokemon1.hp != 0 && pokemon2 != 0){
        if(pokemon1.tipo == pokemon2.fraqueza){
            pokemon2.hp = pokemon2.hp - superEfetivo;
        }else if(pokemon1.tipo == pokemon2.resistencia){
            pokemon2.hp = pokemon2.hp - naoEfetivo;
        }else{
            pokemon2.hp = pokemon2.hp - Efetivo;
        }
    }

    if(pokemon1.hp != 0 && pokemon2 != 0){
        if(pokemon2.tipo == pokemon1.fraqueza){
            pokemon1.hp = pokemon1.hp - superEfetivo;
        }else if(pokemon2.tipo == pokemon1.resistencia){
            pokemon1.hp = pokemon1.hp - naoEfetivo;
        }else{
            pokemon1.hp = pokemon1.hp - Efetivo;
        }
    }

    if(pokemon1.hp < 0) pokemon.hp = 0;
    if(pokemon2.hp < 0) pokemon.hp = 0;
    
    return `${pokemon1.nome}: ${pokemon1.hp} / ${pokemon2.nome}: ${pokemon2.hp} `   

}

function curaPokemon(id){
    const potion = 20;
    const pokemonFerido = pokemons[id];
    if(pokemonFerido.hp == 100){
       return `O Pokemon ${pokemonFerido.nome}, está com o HP cheio!`
    }else if(pokemonFerido.hp < 80){
       pokemonFerido.hp = pokemonFerido.hp + potion;
    }else{
       pokemonFerido.hp = 100;
    }

    return `${pokemonFerido.hp} teste`
}

//essa linha exporta os dados para nosso servidor
module.exports = { salvarPokemons, mostrarPokemon, mostrarPokemons,atualizarPokemon,deletarPokemon,batalhaPokemon, curaPokemon};