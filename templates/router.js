var express = require('express');
var router = express.Router();
var {modelName} = require({modelPath});

router
    .get('/', (req, res, next) => {
        {modelName}.find()
            .select('-__v')
            .then({pluralName} => res.send({pluralName}))
            .catch(next);
    })

    .post('/', (req, res, next) => {
        new {modelName}(req.body) //author does instead of req.body
            .save()
            .then({name} => res.send({name}))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const id = req.params.id;
        {modelName}.findById(id).lean()
            .then({name} => res.send({name}))
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        {modelName}.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then({name} => {
                res.send({name});
            })
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        {modelName}.findByIdAndRemove(req.params.id)
            .then(response => {
                res.send({ removed: response ? true : false });
            })
            .catch(next);

    });

module.exports = router;