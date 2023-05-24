const mongodb = require('mongodb')
const express = require('express')

const app = express()

app.get('/Books', async (req, res) => {
    const client = new mongodb.MongoClient("mongodb://127.0.0.1:27017")
    await client.connect()

    const db = client.db("BooksDB")

    const dbBooks = await db.collection("Books").find()

    const books = []

   await dbBooks.forEach(b =>{

        books.push(b);
    })
    res.send(books)
})


app.get('/Books/:id', async (req, res) => {
   const _id = new mongodb.ObjectId(req.params.id)
   
   const client = new mongodb.MongoClient("mongodb://127.0.0.1:27017")
   await client.connect()

   const db = client.db("BooksDB")

   db.collection("Books").findOne({_id: _id}, (err, book) => {
    res.send(book)
   })
})

app.listen(8000, () => {
    console.log("http://localhost:8000/")
})






