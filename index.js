require('dotenv').config() // importing dotenv
const ObjectID = require('mongodb').ObjectID;
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
  const bookCollection = client.db("bookAttic").collection("books");
  const orderCollection = client.db("bookAttic").collection("orders");

  app.post('/addOrder', (req, res) => {
    const newData = req.body
    console.log("data from client:",newData);
    orderCollection.insertOne(newData)
    .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send("Order Confirmed")
    })
  })

  app.post('/addbook', (req, res) => {
    const newData = req.body
    console.log("data from client:",newData);
    bookCollection.insertOne(newData)
    .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
    })
  })
  
  app.get('/allBooks', (req, res) => {
    bookCollection.find()
    .toArray((err, items) => {
        res.send(items)
    })
    })

    app.get('/book/:id', (req, res) => {
        const id = ObjectID(req.params.id);
        bookCollection.find({_id:id})
        .toArray((err, documents) => {
            res.send(documents[0]);
        })

        })

    app.get('/orders/:name', (req, res) => {
        orderCollection.find({name:req.params.name})
        .toArray((err, documents) => {
            res.send(documents);
            console.log(err);
        })

        })
    })

  

  // perform actions on the collection object
//   client.close();

app.listen(port, () => {
  console.log(`Book attic server listening at http://localhost:${port}`)
})