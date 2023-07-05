import { Usuario } from '../models/Usuario';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { environments } from '../libs/environments';

const jwtPassword: any = environments.jwt_password;

const params = {
    passReqToCallback: true,
    secretOrKey: jwtPassword,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //Captura o token de requisição
};

const strategy = new Strategy(params, (req: any, payload: any, done: any) => {

    const bearer = req.headers.authorization.split(' ')[ 1 ];

    if (payload.cod_usuario) {
        Usuario.findOne({
            where: {
                cod_usuario: payload.cod_usuario,
                token: bearer
            }
        }).then(user => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        }).catch(error => done(error, false));
    } else {
        return done(null, false);
    }
});

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser((cod_usuario, done) => {
    Usuario.findOne({
        where: {
            cod_usuario: cod_usuario
        }
    }).then((res) => {
        if (res) {
            return done(null, false);
        } else {
            done(null, res);
        }
    });
});

passport.use(strategy);

const authMiddleware = {
    initialize: () => {
        return passport.initialize();
    },
    authenticate: () => {
        const authenticated = passport.authenticate('jwt', jwtPassword);
        return authenticated;
    },
};

export default authMiddleware;