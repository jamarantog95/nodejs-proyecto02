
const express = require('express');
const cors = require('cors');
const { mealRouter } = require('../routes/meal.routes');
const { db } = require('../database/db');
const helmet = require('helmet');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const xss = require('xss-clean');
const globalErrorHandler = require('../controllers/error.controller');
const { authRouter } = require('../routes/auth.routes');
const { restaurantRouter } = require('../routes/restaurant.routes');
const { userRouter } = require('../routes/user.routes');
const { orderRouter } = require('../routes/order.routes');

const initModel = require('./initModel');
const AppError = require('../utils/appError');

class Server {
    constructor() {
        //DEFINIMOS LA APLICACIÓN DE EXPRESS Y SE LA ASIGNAMOS A LA PROPIEDAD APP
        this.app = express();
        //DEFINIMOS EL PUERTO QUE LO TENEMOS EN LOS ENVIROMENTS
        this.port = process.env.PORT || 4000;
        // DEFINIMOS EL NRO DE PETICIONES QUE VA A PERMITIR POR LIMITE DE TIEMPO
        this.limiter = rateLimit({
            max: 100,
            windowMs: 60 * 60 * 1000,
            message: 'To many request from this IP, please try again in a hour!'
        });


        this.paths = {
            auth: '/api/v1/auth',
            users: '/api/v1/users',
            restaurants: '/api/v1/restaurants',
            meals: '/api/v1/meals',
            orders: '/api/v1/orders',
        };

        // INVOCAR AL METODO DE CONEXION DE BASE DE DATOS
        this.database();

        // INVOCAMOS AL METODO MIDDLEWARES
        this.middlewares();

        // INVOCAMOS AL METODO DE ROUTES
        this.routes();
    }


    middlewares() {
        //Configura los header para prevenir posibles ataques a la aplicacion
        this.app.use(helmet());

        this.app.use(xss());

        this.app.use(hpp());

        if (process.env.NODE_ENV === 'development') {
            console.log('HOLA ESTOY EN DESARROLLO');
            // Se usa para el MODO DESARROLLO
            this.app.use(morgan('dev'));
        }


        // Utilizamos el LIMITER para todas nuestras rutas que empiecen con api/v1
        this.app.use('/api/v1/', this.limiter);
        // Utilizamos las CORS para permitir acceso a la API
        this.app.use(cors());
        // Utilizamos EXPRESS.JSON para parsear el BODY de la REQUEST
        this.app.use(express.json());
    }


    routes() {
        // Utilizar las rutas de comidas
        this.app.use(this.paths.auth, authRouter);
        this.app.use(this.paths.meals, mealRouter);

        this.app.use(this.paths.restaurants, restaurantRouter);
        this.app.use(this.paths.users, userRouter);
        this.app.use(this.paths.orders, orderRouter);


        this.app.all('*', (req, res, next) => {
            return next(
                new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
            );
        });


        this.app.use(globalErrorHandler);
    }


    database() {
        db.authenticate()
            .then(() => console.log('Database authenticaded'))
            .catch(error => console.error());

        // relations
        initModel();

        // db.sync({ force: true }) // delete values on table
        db.sync()
            .then(() => console.log('Database synced'))
            .catch(error => console.error());
    }

    // METODO LISTEN: esta esuchando solicitudes del puerto 3000
    listen() {
        this.app.listen(this.port, () => {
            console.log("Server is running on port", this.port)
        })

    }
}

module.exports = Server;