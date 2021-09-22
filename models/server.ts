import express from 'express';
import cors from 'cors';
import * as socketIO from 'socket.io';
import { createServer, Server as ServerHttp } from 'http'
import { socketController } from '../sockets/controller';

export default class Server {
    app: express.Application;
    port: string;
    paths: any;
    server: ServerHttp;
    io: socketIO.Server

    constructor() {
        
        this.app = express();
        this.port = process.env.PORT as string;
        this.server = createServer(this.app);
        this.io = new socketIO.Server(this.server);
        //this.io.attach(this.server);

        this.paths = {};

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();

        // Sockets
        this.sockets();
    }

    sockets() {

        this.io.on('connection', socketController);

    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Directorio público
        this.app.use(express.static('public'));
    }

    routes() {}

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${ this.port }`);
        });
    }
}