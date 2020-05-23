const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const multer = require('multer');
const upload = multer()
const PORT = 3000
app.set('views', './Views')
// template engine on precise où se trouvent les vues
app.set('view engine', 'ejs')
// Use pour ajouter le Middleware pour les fichiers statics css / img pdf ...
app.use('/public', express.static('public'))
// app.use(bodyParser.urlencoded({ extended: false }))
const API_END_POINT = "https://api.themoviedb.org/3/"
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images"
const API_KEY = "api_key=64194ae703e2630dd0d31d51af95795c"
//https://api.themoviedb.org/3/movie/388399?api_key=64194ae703e2630dd0d31d51af95795c
//https://api.themoviedb.org/3/search/movie?api_key=64194ae703e2630dd0d31d51af95795c&query=dogville&language=fr-FR
app.get('/', (req, res) => {
    res.render('index')
})
let frenchMovies = [
    { title: "Le fabuleux destin d'Amelie Poulain", year: 2001 },
    { title: "Buffet Froid", year: 1979 },
    { title: "Le dinet de cons", year: 1998 },
    { title: "De Rouille et d'os", year: 2012 },
]
app.get('/movies', (req, res) => {
    const title = 'Films français des 30 dernières années'
    frenchMovies = [
        { title: "Le fabuleux destin d'Amelie Poulain", year: 2001 },
        { title: "Buffet Froid", year: 1979 },
        { title: "Le dinet de cons", year: 1998 },
        { title: "De Rouille et d'os", year: 2012 },
    ]
    res.render('movies', { movies: frenchMovies, title: title })
})
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
// app.post('/movies', urlencodedParser, (req, res) => {
//     console.log(req.body)
//     console.log('titre', req.body.movietitle)
//     const newMovie = { title: req.body.movietitle, year: req.body.movieyear }
//     frenchMovies = [...frenchMovies, newMovie]
//     console.log(frenchMovies);
//     res.sendStatus(201)
// })
app.post('/movies', upload.fields([]), (req, res) => {
    if (!req.body) {
        res.sendStatus(500)
    } else {
        console.log(req.body)
        const formData = req.body
        console.log("formData", formData);
        const newMovie = { title: req.body.movietitle, year: req.body.movieyear }
        frenchMovies = [...frenchMovies, newMovie]
        console.log(frenchMovies);
        res.sendStatus(201)
    }
})
app.get('/movies/add', (req, res) => {
    // res.send('créer votre fiche film !')
    res.render('addMovie')
})

// app.get('/movies/details', (req, res) => {
//     res.render('moviesDetails')
// })

app.get('/movie-search', (req, res) => {
    res.render('movieSearch')
})

// les routes génériques en bas ! importance de l'ordre
app.get('/movie/:id', (req, res) => {
    const id = req.params.id
    // res.send(`Bientôt le film <b>${id}</b>  !`)
    res.render('moviesDetails', { movieId: id })
})
app.get('/movies/:titre', (req, res) => {
    const id = req.params.id
    const titre = req.params.titre
    // res.send(`Bientôt le film <b>${id}</b>  !`)
    res.render('moviesDetails', { title: titre, movieId: id })
})
app.listen(PORT, () => {
    console.log(`the application is listening on port ${PORT}`);
})
