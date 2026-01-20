import express from "express";
import 'dotenv/config';
import webRouters from "./routers/web";
import getConnection from "./config/config";
const app = express();
const PORT = process.env.PORT || 1080;

// config view engine 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
//config req.body 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// config static files ( image , css ,js )
app.use(express.static('public'))

// config routers
webRouters(app);

getConnection() ;

app.listen(PORT, () => {
  console.log(`lang nghe tai ssss http://localhost:${PORT}`)

});
