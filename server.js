var express = require('express')
var app = express()
app.use(express.json())
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./backend/spec.yaml');

app.use('/backend/swaggerui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const { Pool } = require('pg');
const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "postgres"
});

/*const pool = new Pool({
    user: "gkhdthfcbqtvvx",
    password: "65dfcca59ab75b6a0e957d537cf7fe3c2cb6f47ea41b25b982338a096c231549",
    host: "ec2-54-246-85-151.eu-west-1.compute.amazonaws.com",
    port: 5432,
    database: "d6brmv5hu2coro"
});*/



start()
async function start(){
  await connect()
}

async function connect() {
  try {
    await pool.connect()
    console.log("Connected")
  } catch (e){
    console.error(`Failed to connect ${e}`)
  }
}

async function readEmployees() {
  try {
    const result = await pool.query("select * from person")
    return result.rows
  } catch(e) {
    return e
  }
}

async function readEmployee(data) {
  try {
    const result = await pool.query("select * from person where id=$1",[data])
    return result.rows
  } catch(e) {
    return e
  }
}

async function readEmployeeService(data) {
  try {
    const result = await pool.query("select id, name, description from service where id IN "+ 
                                    "(SELECT id_service FROM person_involved where id_person " +
                                    "IN (SELECT id FROM person where id =$1))",[data])
    return result.rows
  } catch(e) {
    return e
  }
}

async function createEmployees(employeeName){
  try {
    await pool.query("insert into employees (name) values ($1)", [employeeName])
    return true
  } catch(e) {
    console.log(e)
    return false
  }
}

async function deleteEmployees(id){
  try {
    await pool.query("delete from employees where id = $1", [id])
    return true
  } catch {
    return false
  }
}
//set port
var port = process.env.PORT || 8080

app.use(express.static(__dirname + "/public"))

//routes
app.get("/",function(req, res){
    res.render("index")
})

app.get("/backend/person", async (req,res) => {
  const rows = await readEmployees()
  res.setHeader("content-type", "application/json")
  res.send(JSON.stringify(rows))
})

app.get("/backend/person/:id", async (req,res) => {
  const rows = await readEmployee(req.params.id)
 
  res.setHeader("content-type", "application/json")
  res.send(JSON.stringify(rows[0]))
})

app.get("/backend/person/:id/service", async (req,res) => {
  const rows = await readEmployeeService(req.params.id)
 
  res.setHeader("content-type", "application/json")
  res.send(JSON.stringify(rows))
})

app.post("/backend", async (req,res) => {
  let result= {}
  try {
    const reqJson = req.body;
    await createEmployees(reqJson.todo)
    result.success = true
  } catch (e){
    result.success = false
  }finally {
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(result))
  }
})

app.listen(port, function(){
    console.log("App Running " + port + " "+ pool)
})

app.get('/person', function(req,res,next) {
  res.json([{id: 4, name: "Mario Rossi"}])
})