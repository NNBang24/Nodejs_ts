import express from "express" ;
import 'dotenv/config' ;
import webRouters from "./routers/web";
const app = express();
const PORT = process.env.PORT || 8080;

// config view engine 
app.set('view engine', 'ejs') ;
app.set('views',__dirname +'/views')

// config routers
webRouters(app) ;
// config static files ( image , css ,js )
app.use(express.static('public'))
app.listen(PORT, () => {
  console.log(`lang nghe tai http://localhost:${PORT}`)
  console.log("env prot :", process.env.PORT)
});
