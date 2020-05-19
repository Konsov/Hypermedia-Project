var express = require('express')
var app = express()

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

//set port
var port = process.env.PORT || 8080

app.use(express.static(__dirname + "/public"))

//routes
app.get("/",function(req, res){
    res.render("index")
})

app.get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

app.listen(port, function(){
    console.log("App Running" + port)
})