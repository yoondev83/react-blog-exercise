const express   =   require ("express");
const app       =   express();
const mongoose  =   require("mongoose");

mongoose.connect("mongodb+srv://yoondev83:rKZUGJAtjhvT9A3O@cluster0.w8r7x.mongodb.net/projectPractice1?retryWrites=true&w=majority/",  {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log("DB is connected")).catch(err=> console.log(err));

app.get("/", (req, res) => {
    res.send("Hii");
});

app.listen(5000, () => console.log("Server has started on Port 5000"));