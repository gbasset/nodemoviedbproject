const express = require('express')
const app = express()
const PORT = 3000
app.set('views', './Views')
// template engine on precise où se trouvent les vues
app.set('view engine', 'ejs')
// Use pour ajouter le Middleware pour les fichiers statics css / img pdf ...
app.use('/public', express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/movies', (req, res) => {
    res.render('movies')
})

app.get('/movies/add', (req, res) => {
    // res.send('créer votre fiche film !')
    res.render('addMovie')
})

// app.get('/movies/details', (req, res) => {
//     res.render('moviesDetails')
// })

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
    res.render('moviesDetails', { title: titre })
})

app.listen(PORT, () => {
    console.log(`the application is listening on port ${PORT}`);
})
