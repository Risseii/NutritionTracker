const VisiteurController = require("../controllers/visiteur.controller");
const UserController = require("../controllers/user.controller");

const {authenticate} = require("../config/jwt.config");

module.exports = (app) => {
    app.post('/api/visiteur',authenticate, VisiteurController.create_visiteur);
    app.get('/api/visiteur',authenticate, VisiteurController.get_all);
    app.get('/api/visiteur/:id',authenticate, VisiteurController.get_visiteur);
    app.put('/api/visiteur/:id',authenticate, VisiteurController.update_visiteur);
    app.delete('/api/visiteur/:id',authenticate, VisiteurController.delete_visiteur);
    app.post('/api/register',UserController.register);
    app.post('/api/login',UserController.login);
    app.get('/api/logout',UserController.logout);
    app.get('/api/usuario',authenticate, UserController.get_all);
}