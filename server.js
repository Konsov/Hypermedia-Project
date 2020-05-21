var express = require('express')
var app = express()

const { Pool } = require('pg');
const pool = new Pool({
    user: "gkhdthfcbqtvvx",
    password: "65dfcca59ab75b6a0e957d537cf7fe3c2cb6f47ea41b25b982338a096c231549",
    host: "ec2-54-246-85-151.eu-west-1.compute.amazonaws.com",
    port: 5432,
    database: "d6brmv5hu2coro"
});

pool.connect()
.then(() => console.log("Connected successfuly"))

//set port
var port = process.env.PORT || 8080

app.use(express.static(__dirname + "/public"))

//routes
app.get("/",function(req, res){
    res.render("index")
})


app.listen(port, function(){
    console.log("App Running " + port + " "+ pool)
})