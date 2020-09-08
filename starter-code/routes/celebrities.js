const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity');


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

router.get('/celebrities/new', (req, res, next) => {
  res.render('celebrities/new');
})

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


router.post('/celebrities', (req, res, next)=> {
  const name = req.body.name;
  const occupation = req.body.occupation;
  const catchPhrase = req.body.catchPhrase;

  Celebrity.create({
    name: name,
    occupation: occupation, 
    catchPhrase: catchPhrase,
  })
  .then(celeb => {
    console.log(`New celeb was created: ${celeb}`);
    res.redirect(`/celebrities/${celeb._id}`);
  }).catch(err => {
    console.log(err);
  })
})

router.get('/celebrities/:id/edit', (req,res,next)=> {
  const id = req.params.id;
  Celebrity.findById(id)
  .then(celebFromDB => {
    console.log(celebFromDB);
    // render an edit form with the data from the book
    res.render('celebrities/edit', { celebedit: celebFromDB })
  })
  .catch( error => {
    next(error);
  })
})

router.post('/celebrities/:id/delete', (req,res,next) => {
  const id = req.params.id;
  Celebrity.findByIdAndRemove(id)
  .then(() => {
    res.redirect('/celebrities');
  })
  .catch( error => {
    next(error);
  })
})



module.exports = router;