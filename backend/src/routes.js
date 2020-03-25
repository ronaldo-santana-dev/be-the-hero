const express = require('express')
const OngController = require('./controllers/ongController');
const  IncidentController= require('./controllers/incidentController');
const ProfileController = require('./controllers/profileController');
const SessionController = require('./controllers/sessionController');

const routes = express.Router();


routes.post('/session', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id',IncidentController.delete);
module.exports = routes;