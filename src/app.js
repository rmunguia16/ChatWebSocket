// Chat comunitario

import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import __dirname from "./utils.js";
import viewsRouter from './routes/views.router.js';

const app = express();

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);

const server = app.listen(3000, () => { console.log('Server is running on port 3000') });
const io = new Server (server);
const messages = [];

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('message', (data) => {
            messages.push(data);
            io.emit('messageLogs', messages);
    });

    socket.on('authenticated', (user) => {
        socket.emit('messageLogs', messages);
        socket.broadcast.emit('newUserConnected', user);
        console.log(user);
    });
});