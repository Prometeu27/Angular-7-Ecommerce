const express = require('express');
const bodyparser = require("body-parser");
const app = express();
const postmodel = require('./models/post');
const mongoose = require('mongoose');

app.use(bodyparser.json());

mongoose.connect("mongodb+srv://denis:1TrLiAHxfYGJM6M0@cluster0.j6nhc.mongodb.net/angdb?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("Connected to database");
    })
    .catch(() => {
        console.log("Connection Failed");
    });

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

app.post("/api/posts", (req, res, next) => {
    const post = new postmodel({
        name: req.body.name,
        price: req.body.price
    });
    post.save().then(result => {
        res.status(201).json({
            message: 'Post added successfully',
            postId: result._id
        });
    });
    console.log(post);
    res.status(201).json({
        message: 'Post added successfully'
    });
});

app.get('/api/posts', (req, res, next) => {
    postmodel.find()
        .then((documents) => {
            console.log(documents);
            res.status(200).json({
                message: 'Posts Fetched Successfully',
                posts: documents
            });
        });
});



app.get('/api/posts/:id', (req, res, next) => {
    // id = "6273ae36c450402674bbdca8";
    // console.log("asd");
    // postmodel.findById(id)
    //     .then(result => {
    //         console.log(result.id);

    //     });
    postmodel.findById({ _id: req.params.id }).then(result => {

        postt = new postmodel({
            name: result.name,
            price: result.price
        });
        res.status(200).json({
            byIdPost: postt

        });
    });
})


app.delete("/api/posts/:id", (req, res, next) => {
    postmodel.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({
            message: "Post deleted!"
        });
    });
});



module.exports = app;