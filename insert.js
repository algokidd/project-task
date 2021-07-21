const express = require('express')
var mysql = require('mysql')
const bodyParser= require('body-parser')
const app = express()
const port = 3000
app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine','pug')
app.get('/', function(req, res) {
  res.sendFile('index.html',{root:__dirname})
})
app.get('/students', function(req, res) {
    connection.query("SELECT name,roll_no FROM student_data",function(err,rows,fields){
        if(err) throw err
        res.render('students',{title:'Student Details', items:rows})
    })
})

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'students'
})
connection.connect(function(err){
    if(err) throw err;
    console.log("Connected");
})

app.post('/submit',function(req,res){
    
    var sql="INSERT INTO `student_data`(`id`,`name`, `roll_no`) VALUES (null,'"+ req.body.name +"','"+ req.body.roll +"')";
    connection.query(sql, function (err) {
        if (err) throw err
        res.render('index',{title:'Data Saved', message:'Saved Successfully!!'})
      })
      
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})