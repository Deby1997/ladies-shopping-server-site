const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
//pasword
//password:zjLgBUbgUfTGlsyi;

//middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hbvq0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        console.log("problem");
        console.log("problem");
        const productCollection = client.db("LadiesCollection").collection("products");
        app.get('/product', async (req, res) => {

            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })
    }
    finally {

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send("Hello world from bd");
})

app.get('/users', (req, res) => {
    res.send({ id: 1, name: "deby", job: "student" });
})

app.listen(port, () => {
    console.log("Listen to port", port);
})