import { Routes } from '../routes/routes';
import bodyParser from 'body-parser';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import session from 'express-session';
import { environments } from './environments';
import passport from 'passport';

export class App {

    public app: express.Application;
    public route: Routes = new Routes();

    constructor () {
        this.app = express();
        this.config();
        this.middlewares();
        this.route.routes(this.app);
    }

    private middlewares() {
        this.app.use(morgan('tiny'));
        this.app.set('json spaces', 4);
        this.app.set('port', 3000);
        this.app.use(express.json());
    }

    private config() {
        const options: cors.CorsOptions = {
            methods: "GET, OPTIONS, PUT, POST, DELETE",
            origin: "*"
        };

        let secret: any = environments.jwt_password;
        this.app.use(session({ secret: secret }));

        this.app.use(passport.initialize());
        this.app.use(passport.session());

        this.app.use(compression());
        this.app.use(cors(options));
        this.app.use(helmet());
    }
}

export default new App().app;

