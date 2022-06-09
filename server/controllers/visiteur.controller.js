
const Visiteur = require("../models/visiteur.model");

module.exports.get_all = (req, res) => {
    Visiteur.find()
        .then(visiteurs => res.json(visiteurs))
        .catch(err => res.status(400).json(err));
}

module.exports.create_visiteur = (req,res) => {
    Visiteur.create(req.body)
        .then(visiteur => res.json(visiteur))
        .catch(err => res.status(400).json(err));
}

module.exports.get_visiteur = (req, res) => {
    Visiteur.findOne({_id: req.params.id})
        .then(visiteur => res.json(visiteur))
        .catch(err => res.status(400).json(err));
}
//actualizar todo el body(el form) en base al id y que regresen lo ingresado
module.exports.update_visiteur = (req, res) => {
    Visiteur.findByIdAndUpdate({_id: req.params.id},req.body,{new:true,runValidators:true}) 
        .then(visiteur => res.json(visiteur))
        .catch(err => res.status(400).json(err));
}

module.exports.delete_visiteur = (req, res) => {
    Visiteur.deleteOne({_id: req.params.id})
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
}
