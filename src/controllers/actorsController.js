const db = require('../database/models/index');

const actorsController = {
    list: (req,res) => {
        db.Actor.findAll()
            .then((actors) => {
                res.render('actorsList',{ actors : actors })
            })
            .catch(error => {
                res.send("Por aca no es")
            })  
    },

    recomended: (req,res) => {
        db.Actor.findAll({
                order : [
                    ['rating','DESC']
                ],
                limit : 5
            })
            .then((actors) => {
                res.render('recommendedActors',{ actors : actors })
            })
            .catch(error => {
                res.send("Por aca no es")
            })  
    },

    detail: (req,res) => {
        const {id} = req.params
        db.Actor.findByPk(id)
            .then((actor) => {
                res.render('actorDetail',{ actor:actor })
            })
            .catch(error => {
                res.send("Por aca no es")
            })
    }
}

module.exports = actorsController