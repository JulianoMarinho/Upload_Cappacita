const express = require('express'); //essa constante vai receber a importacao do express
const app = express(); //instanciando o express
const dataBase = require('./dataBase');
const bodyParser = require('body-parser');//chamada para o body parser para n dar erro no 
//...post do Postman
app.use(bodyParser.urlencoded({ extended: true }))
//Para usar o bodyPaser e intanciarmos o formato usado la no post "urlencode"

//obs para instaciar "na mesma pasta" digite ./

//requisicao que so envia um dado quando a fazemos
//A  / indica que ele vai ser usado no padrao, no link do site no caso local host
//a callback indica que ele vai receber  como parametro e uma requisicao e a resposta
app.get('/pokemons', (req, res) => {
    //resposta que sera enviada quando acessarmos o parametro, usando uma requisicao get
    res.send(dataBase.mostrarPokemons()); //forma de apresentar uma funcao criada
    //a /cria tipo uma indexação na url, se digitar /saudacao, quando rodamos
    //o servidor, na url q estavamos, ele n vai achar o arquivo, mas colocando
    //   localhost:3003/saudacao, ele vai rodar nosso arquivo
});//comando do VSCODE para copiar e colar oq estiver selecionado, alt+shift+ seta pra baixo

//temos um get precisamos passar um parametro, queremos mostra um pokemon so com o id que
//passarmos pra ele. Vamos passar o parametro na url, conforme apresentado abaixo.
app.get('/pokemons/:id', (req, res) => {
    //para mostrar o pokemon que foi passado pelo id
    res.send(dataBase.mostrarPokemon(req.params.id)); 

});

//Requisicao do tipo post, cadastro
app.post('/pokemons', (req, res) => {
    //para castrar, a linha abaixo recebe a funcao salvarPokemons e, como parametro, ela
    //recebe o objeto que queremos cadastrar, queremos pegar o corpo da requicao.
    const pokemon = dataBase.salvarPokemons({
        nome: req.body.nome,
        tipo: req.body.tipo

    })
    //a linha abaixo, retorna se o cadastro foi feito corretamente
    res.send(pokemon);
});
//Put serve para atualizar algo salvo em algum momento
app.put('/pokemons/:id', (req, res) => {
    const pokemon = dataBase.atualizarPokemon(req.params.id, {
        nome: req.body.nome,
        tipo: req.body.tipo,
        //converte os dados do parênteses para número
        id: parseInt(req.params.id)
    })

    res.send(pokemon)

});

app.delete('/pokemons/:id', (req, res) => {
    res.send(dataBase.deletarPokemon(req.params.id))
    
});


//para rodar o servidor 

app.listen(3003);