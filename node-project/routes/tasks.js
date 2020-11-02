const express = require('express'),
    router = express.Router(),
    Task = require("../models/Task")

router.get('/', (req, res)=>{
        Task.find()
        .exec()
        .then(task=>res.status(200).jsonp(task))
    })
    .get('/:id', (req, res) =>{
        Task.findById(req.params.id)
        .exec()
        .then(task=>res.status(200).jsonp(task))
    })
    .post('/', (req, res) =>{
    let task = new Task({
            name: req.body.name,
            desc: req.body.desc,
            created_at: req.body.created_at,
            complete: req.body.complete
        })
        // console.log(task)
        task.save( (err, task) =>{
        if(err) return res.status(500).send(err.message)
        res.status(200).jsonp(task)
        })
    })
    .put('/:id', (req, res)=>{
        Task.findById(req.params.id)
        .exec()
        .then( task  => {
            task.name = req.body.name
            task.desc = req.body.desc
            task.created_at =  req.body.created_at
            task.complete = req.body.complete
            
            task.save( (err, task) =>{
                if(err) return res.status(500).send(err.message)
                res.sendStatus(204)
            })
        })
    })
    .delete('/:id', (req, res) => {
        Task.findById(req.params.id)
        .exec()
        .then(task => {
            task.remove(err =>{
                if(err) return res.status(500).send(err.message)
                res.sendStatus(204)
            })
        })
    })

module.exports = router