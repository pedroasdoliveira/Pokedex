import express from "express";
import path from "path";

const app = express();
app.set('view engine', 'ejs');

const __dirname = path.resolve(path.dirname(''));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Porta
const port = 3005;

app.listen(port, () => {
    console.log(`Servidor rodando na porta local ${port}.`);
});

//Pokedex -----------------------------------------------------------------------
const Pokedex = [
    {
        id: '1',
        nome: 'Abra',
        tipo: 'Psíquico',
        fraqueza: 'Bug, Fantasma, Escuro',
        evolucao: 'Cadabra',
        sobre: '"Abra dorme por 18 horas por dia. Entretanto, pode pressentir a presença de oponentes até mesmo enquanto dorme. Quando em perigo, se teletransporta para um lugar seguro."',
        visual: 'https://images.gameinfo.io/pokemon/256/p63f235.webp',
        altura: '0,9m',
        peso: '19,5kg',
        categoria: 'Psi',
        habilidade: 'Foco Interior, Sincronizar',
        ataque: '195',
        defesa: '82',
        stamina: '93',
    },

    {
        id: '2',
        nome: 'Dragonite',
        tipo: 'Dragão, Ar',
        fraqueza: 'Gelo, Pedra, Dragão, Fadas',
        evolucao: 'Ultima evolução',
        sobre: '"Dragonite é capaz de dar a volta no mundo em apenas 16 horas. Tem um coração bondoso e guia para terra barcos perdidos durante tempestades."',
        visual: 'https://images.gameinfo.io/pokemon/256/p149f166.webp',
        altura: '2,2m',
        peso: '210kg',
        categoria: 'Dragão',
        habilidade: 'Foco Interior',
        ataque: '263',
        defesa: '198',
        stamina: '209',
    },

    {
        id: '3',
        nome: 'Zapdos',
        tipo: 'Elétrico, Ar',
        fraqueza: 'Pedra, Gela',
        evolucao: 'Ultima evolução',
        sobre: '"Zapdos é um Pokémon pássaro lendário que tem a habilidade de controlar eletricidade. Vive em nuvens carregadas de eletricidade e ganha poder se for atingido por raios."',
        visual: 'https://images.gameinfo.io/pokemon/256/p145f332.webp',
        altura: '1,6m',
        peso: '52,6kg',
        categoria: 'Elétrico',
        habilidade: 'Pressão',
        ataque: '253',
        defesa: '185',
        stamina: '207', 
    }
]

// Rotas ------------------------------------------------------------------------

// let pokemon = undefined;

app.get("/", (req, res) => {
    res.render('index', {Pokedex});
});

app.get('/add', (req, res) => {
    res.render('cadastro', {Pokedex});
});

app.post('/cadastro', (req, res) => {
    const pokemon = req.body;

    pokemon.id = Pokedex.length + 1;

    Pokedex.push(pokemon);

    res.redirect("/#cards");
});

app.get('/voltar', (req, res) => {
    res.redirect("/");
})

app.get('/modificar/:id', (req, res) => {
    const id = +req.params.id - 1;

    let escolhido = Pokedex[id];

    res.render('detalhes', {escolhido});
});

// app.post("/updated/:id", (req, res) => {
//     const id = +req.params.id - 1;

//     let pokemon = Pokedex.find(pokemon => pokemon.id == id);

//     const editarPokemon = req.body;

//     editarPokemon.id = id + 1;

//     Pokedex[id] = editarPokemon;

//     pokemon = undefined;

//     res.redirect("/detalhes/#cards");
// });