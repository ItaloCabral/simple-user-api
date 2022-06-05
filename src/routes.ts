const { Router } = require('express');

const UsersController = require('./controllers/UsersController');

const routes = new Router();

routes.get('/users', UsersController.list);
routes.post('/users', UsersController.create);

module.exports = routes;
