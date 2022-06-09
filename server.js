const express = require("express");
const app = express();
const cors = require("cors"); //para poder acceder al servidor con una direccion dif
const cookieParser = require("cookie-parser");

//para usar json y obtener datos de la URL:
app.use( express.json(), express.urlencoded({ extended: true }) );

//para usar cookies
app.use(cookieParser());

//nos permite accesar desde un origen distinto
app.use(
    cors({
        //URL del front end, puede cambiar a 3001 ejm
        origin: "http://localhost:3000",
        //credenciales
        credentials:true
    })
)

//inicializa BD:
require("./server/config/mongoose.config");

//importar rutas 
const misRutas= require("./server/routes/visiteur.routes"); //cambiar el nombre de rutas
misRutas(app); //la aplicacion se conecte

//ejecutamos server 
app.listen(8000,() => console.log("Server listo"));