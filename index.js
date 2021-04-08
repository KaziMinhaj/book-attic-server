require('dotenv').config() // importing dotenv

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 5000

app.use(bodyParser.json())
app.use(cors())

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fzhcz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("bookAttic").collection("books");
    console.log(err);
  app.get('/', (req, res) => {
    res.send('home')
  })
  // perform actions on the collection object
//   client.close();
});



app.listen(port, () => {
  console.log(`Book attic server listening at http://localhost:${port}`)
})