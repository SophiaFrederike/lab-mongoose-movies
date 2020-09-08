const express = require('express');
const router  = express.Router();
const Movie = require('../models/Movie');

router.get('/movies/new', (req,res,next)=> {
    res.render('movies/new')
})

router.post('/movies', (req, res, next)=> {
    const title = req.body.title;
    const genre = req.body.genre;
    const plot = req.body.plot;
    const cast = req.body.cast;
  
    Movie.create({
     title,
      genre, 
      plot,
      cast
    })
    .then(movie => {
      console.log(`New movie was created: ${movie}`);
      res.redirect(`/movies/${movie._id}`);
    }).catch(err => {
     next(err);
    })
  })



module.exports = router;