const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'p@rkie',
    database : 'smart-brain'
  }
});

knex.select('*').from('users').then(data => {
  console.log(data);
});

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req,res) => {
  res.send(database.users);
})

app.post('/signin',(req,res) => signin.handleSignIn(req,res,knex,bcrypt));

app.post('/register', (req,res) => register.handleRegister(req,res,knex,bcrypt));

app.get('/profile/:id', (req,res) => profile.handleProfile(req,res,knex));

app.put('/image', (req,res) => image.handleImage(req,res,knex));

app.post('/imageurl',(req,res) => image.handleAPICall(req,res));

const PORT = process.env.port;

app.listen(PORT, () =>  {
  console.log(`app is running on port ${PORT}`);
});
