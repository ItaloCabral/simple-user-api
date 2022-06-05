const { Router } = require('express');

const AuthMidleware = require('./Middlewares/AuthMiddleware');
const UsersController = require('./controllers/UsersController');
const LoginController = require('./controllers/LoginController');

const routes = new Router();

routes.get('/users', AuthMidleware, UsersController.list);
routes.post('/users', UsersController.create);

routes.post('/login', LoginController.index);

module.exports = routes;
