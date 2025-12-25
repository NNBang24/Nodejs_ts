import 'dotenv/config' ;
// require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// config view engine 
app.set('view engine', 'ejs') ;
app.set('views',__dirname +'/views')
app.get('/' ,(req, res) => {
  res.render("home.ejs")
})

app.get('/', (req, res) => {
  res.send(`<h1 style="color: red">hello word</h1>`)

});
app.get('/bang', (req, res) => {
  res.send("hello Bang")

});

app.listen(PORT, () => {
  console.log(`lang nghe tai http://localhost:${PORT}`)
  console.log("env prot :", process.env.PORT)
});
