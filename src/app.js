// Chat comunitario

import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import __dirname from "./utils.js";
import viewsRouter from './routes/views.router.js';
import Swal from "sweetalert2";

import path from 'path'
const PORT = 4000
const app = express();

const server = app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });

const io = new Server (server);

//Config

/* const storage = multer.diskStorage({
    destination: (req, file, cb) => { //cb => callback
        cb(null, 'src/public/img') //el null hace referencia a que no envie errores
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`) //concateno la fecha actual en ms con el nombre del archivo
        //1232312414heladera-samsung-sv
    }
}) */

//Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true })) //URL extensas



app.engine('handlebars', handlebars.engine()) //Defino que voy a trabajar con hbs y guardo la config
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

const mensajes = [];


//Conexion de Socket.io
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('mensaje', info => {
            console.log(info);
            mensajes.push(info);
            io.emit('mensajes', mensajes);
    });

    socket.on('authenticated', (user) => {
        socket.emit('messageLogs', messages);
        socket.broadcast.emit('newUserConnected', user);
        console.log(user);
    });


});

app.use('/static', express.static(path.join(__dirname, '/public'))) //path.join() es una concatenacion de una manera mas optima que con el +
//app.use('/api/product', routerProd)
//HBS
app.get('/static', (req, res) => {
    res.render('chat',{
        rutaCSS: "style",
        rutaJS: "chat"
    })
})