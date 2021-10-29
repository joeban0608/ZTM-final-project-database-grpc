const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const app = express();
const knex = require("knex");
const handleApiCall = require('./controller/image')
// const Clarifai = require('clarifai')

// const ClarifaiApp = new Clarifai.App({
//   //  apiKey: 'YOUR_API_KEY'
//    apiKey: 'b8962c2705744018a0bd25cbc1434e74'
//   });

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "09870987",
    database: "smartbraindb",
  },
});

db.select("*")
  .from("users")
  .then((data) => {
    // console.log(data);
  });

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send('test, root');
});

app.post("/signin", (req, res) => {
    db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
        bcrypt.compareSync(req.body.password, data[0].hash);
        const isVaild = bcrypt.compareSync(req.body.password, data[0].hash);
        if (isVaild) {
          return db.select('*').from('users')
            .where('email', '=', req.body.email)
            .then(user => {
                res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to get user information'))  
        } else {
            console.log('wrong...')
            return res.status(400).json('wrong keying of signin')
        }
    })
    .catch(err => res.status(400).json('wrong keying of signin'))
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
      return  trx("users")
        .returning("*")
        .insert({
          name: name,
          email: loginEmail[0],
          joined: new Date(),
        })
        .then((user) => {
          res.json(user[0]);
        })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch((err) => res.status(404).json("unable to join"));
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch(err => res.status(400).json("error getting user:", err));
});

app.post("/imageurl" , (req, res) => {
   handleApiCall(req, res)
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
       res.json(entries[0]);
    //    console.log(entries[0])
    })
    .catch(err => res.status(400).json("unable to get entries:"))
});

app.listen(2999, () => {
  console.log("app is running on port 2999");
});
