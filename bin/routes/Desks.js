var express = require('express');
var router = express.Router();
var Desk = require('../models/DeskModel.js');

router
    .get('/', (req, res, next) => {
        Desk.find()
            .select('-__v')
            .then(Desks => res.send(Desks))
            .catch(next);
    })

    .post('/', (req, res, next) => {
        new Desk(req.body) //author does instead of req.body
            .save()
            .then(desk => res.send(desk))
            .catch(next);
    })


    .get('/:id', (req, res, next) => {
        const id = req.params.id;
        Desk.findById(id).lean()
            .then(desk => res.send(desk))
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        Desk.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(desk => {
                res.send(desk);
            })
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Desk.findByIdAndRemove(req.params.id)
            .then(response => {
                res.send({ removed: response ? true : false });
            })
            .catch(next);

    });

module.exports = router;