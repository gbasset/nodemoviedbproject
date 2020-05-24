const express = require('express') // pour express
const app = express()
const bodyParser = require('body-parser') // pour recupérer le body 
const multer = require('multer'); // pour recupérer des infos depuis les forms
const upload = multer()
const jwt = require('jsonwebtoken') // pour créer des tokens et recuperer les contenus du payload
const expressJwt = require('express-jwt') // pour protéger certaines routes

const PORT = 3000
//  il est preferable de placer le secret dans une variable env pour la securité
const secret = 'qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq'

app.set('views', './Views')
// template engine on precise où se trouvent les vues
app.set('view engine', 'ejs')
// Use pour ajouter le Middleware pour les fichiers statics css / img pdf ...
app.use('/public', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressJwt({ secret: secret }).unless({ path: ['/', '/login', '/movies', '/movies-details', '/movie-search'] }))

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

app.get('/login', (req, res) => {
    res.render('login', { title: 'Espace membre' })
})
const fakeUser = { email: '12345', password: 'qsd' }

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/login', urlencodedParser, (req, res) => {
    if (!req.body) {
        res.sendStatus(500)
    } else {
        if (fakeUser.email === req.body.email && fakeUser.password === req.body.password) {
            const myToken = jwt.sign({ iss: 'http://expressMovie.fr', user: 'moderator', test: 'test' }, secret)
            res.json(myToken)
        }
        else {
            res.sendStatus(401)
        }
    }
})

app.get('/member-only', (req, res) => {
    console.log('req.user', req.user);
    res.send(req.user)
})
app.listen(PORT, () => {
    console.log(`the application is listening on port ${PORT}`);
})
