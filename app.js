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
  connection.query("SELECT * from student_data where roll_no= '"+ req.body.roll +"'", function(err, result, field){
    if(result.length === 0){
      var sql="INSERT INTO `student_data`(`id`,`name`, `roll_no`) VALUES (null,'"+ req.body.name +"','"+ req.body.roll +"')";
      connection.query(sql, function (err) {
          if (err) throw err
          res.render('index',{title:'Data Saved', message:'Saved Successfully!!'})
        })
      }else{
        res.render('index',{title:'Data not Saved', message:'Roll No already exists!!'})
      } 
      
})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})