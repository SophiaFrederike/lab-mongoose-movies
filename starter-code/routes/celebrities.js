const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity');
const { route } = require('.');

/* GET home page */
router.get('/celebrities', (req, res, next) => {
     // get all the books
  Celebrity.find().then(celebritiesFromDB => {
    // render a view and pass in the books
    console.log(celebritiesFromDB)
    res.render('celebrities/index' ,{ celebrityList: celebritiesFromDB })
      }) 
     .catch(err => {
         next(err)
     });
  
});

router.get('/celebrities/:id', (req,res, next) => {
    const id = req.params.id;
    Celebrity.findById(id)
    .then((celebFromDB )=> {
        res.render('celebrities/show', celebFromDB);
      }) 
      .catch(err => {
        next(err)
      })
      });

module.exports = router;