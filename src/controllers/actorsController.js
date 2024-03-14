const db = require('../database/models/index');
const {validationResult} = require('express-validator');
const { Op } = require('sequelize')

const actorsController = {
    list: (req,res) => {
        db.Actor.findAll()
            .then((actors) => {
                res.render('actors/actorsList',{ actors : actors })
            })
            .catch(error => {
                res.render('errorView',{title:"Error"})
            })  
    },

    search: (req,res) => {
        const {titulo} = req.body
        db.Actor.findAll({
            where: { last_name: {[Op.like]:`%${titulo}%`} }
        })
        .then(result => {
            let actors = result
            res.render('actors/actorsList',{ actors })
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
                res.render('actors/recommendedActors',{ actors : actors })
            })
            .catch(error => {
                res.render('errorView',{title:"Error"})
            })  
    },

    detail: (req,res) => {
        const {id} = req.params
        db.Actor.findByPk(id,{
            include:[{association:'movies'}]
        })
            .then((actor) => {
                res.render('actors/actorDetail',{actor})
            })
            .catch(error => {
                res.render('errorView',{title:"Error"})
            })
    },

    add: (req,res) => {
        res.render('actors/form-create-actors', {title:'New Actor'})
    },

    create: (req,res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.render('actors/form-create-actors', {title:'New Actors', errors:errors.mapped(), oldData:req.body})
        } else {
            const {first_name,last_name,rating} = req.body;
            db.Actor.create({
                first_name,
                last_name,
                rating
            })
            .then(actor => {
                res.redirect('/actors')
            })
            .catch(error => {
                res.render('errorView',{title:"Error"})
            })
        }
    },

    edit: (req,res) => {
        const {id} = req.params
        db.Actor.findByPk(id)
            .then((actor) => {
                const {first_name,last_name,rating} = actor
                actor = {
                    id,
                    first_name,
                    last_name,
                    rating
                };
                res.render('actors/form-update-actor', {title:'Edit Actor', actor:actor })
            })
            .catch(error => {
                res.render('errorView',{title:"Error"})
            })
    },

    update: (req,res) => {
        const id = req.params.id;
        const {first_name,last_name,rating} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            db.Actor.findByPk(id)
            .then((actor) => {
                res.render('actors/form-update-actor', {title:'Edit Actor', actor:actor, errors:errors.mapped(), old:req.body })
            })
            .catch(error => {
                res.render('errorView',{title:"Error"})
            })
        } else {
            db.Actor.update(
                {
                    first_name,
                    last_name,
                    rating
                }, 
                {
                    where : { id }
                }
            )
            .then(actor => {
                res.redirect(`/actors/detail/${id}`)
            })
            .catch(error => {
                res.render('errorView',{title:"Error"})
            })
        }
    },
    
    delete: (req,res) => {
        const {id} = req.params
        db.Actor.destroy({
            where : { id }, force: true
        })
        .then(actor => {
            res.redirect('/actors')
        })
        .catch(error => {
            res.render('errorView',{title:"Error"})
        })   
    }
}

module.exports = actorsController