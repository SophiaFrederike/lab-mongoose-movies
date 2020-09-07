const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity');
mongoose.connect('mongodb://localhost/starter-code', {
  useNewUrlParser: true,
});

const celebrities = [
    {name: "Lady Gaga",
        occupation: "singer",
    catchPhrase: "Uh la la "
    },
    {name: "Tina Tuner",
    occupation: "singer",
catchPhrase: "What's love "

    },
    {name: "Ben Stiller",
    occupation: "actor",
catchPhrase: "Blablabla"

    },
];

Celebrity.insertMany(celebrities)
.then(data => {
  console.log(`Success! Added ${data.length} celebrities to the database`)
  mongoose.connection.close();
})
.catch (err => {
  console.log(err)
});