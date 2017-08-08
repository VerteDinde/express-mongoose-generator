[![Build Status](https://travis-ci.org/DamienP33/express-mongoose-generator.svg?branch=master)](https://travis-ci.org/DamienP33/express-mongoose-generator)
# express-mongoose-generator-promise

A mongoose model, REST controller and Express router code generator for Express.js 4 application. Branched from DamienP33's mongoose generator and converted to ES6 syntax/promisified.

## Installation
```bash
$ npm install -g express-mongoose-generator-promisified
```

## Usage
### Non-Interactive mode
Generates a Mongoose model and a RESTful Express router :
```bash
$ mongoose-gen -m car -f carDoor:number,color -r
        create: ./models/cardModel.js
        create: ./routes/cardRoutes.js
        create: ./controllers/cardController.js
```

##### Options

  - `-m, --model <modelName>` - the model name.
  - `-f, --fields  <fields>` - the fields (name1:type,name2:type).
  - `-r, --rest` - enable generation REST.
  - `-t, --tree <tree>`        files tree generation grouped by (t)ype or by (m)odule

##### Available types
  - string
  - number
  - date
  - boolean
  - array
  - objectId

### Interactive mode

Generates a Mongoose model and a RESTful Express router :
```bash
$ mongoose-gen
Model Name : car
Available types : string, number, date, boolean, array
Field Name (press <return> to stop adding fields) : door
Field Type [string] : number
Field Name (press <return> to stop adding fields) : color
Field Type [string] : 
Field Name (press <return> to stop adding fields) : owner
Field Type [string] : objectId
Reference (model name referred by the objectId field) : User
Field Name (press <return> to stop adding fields) : 
Generate Rest (yes/no) ? [yes] : 
Files tree generation grouped by Type or by Module (t/m) ? [t] : 
        create: ./models/carModel.js
        create: ./routes/carsRoutes.js
        create: ./controllers/carController.js
```

## Rendering
### Model
models/carModel.js :
```javascript
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var carSchema = new Schema({
	"color" : String,
	"door" : Number,
    "owner" : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('car', carSchema);
```

### Router
routes/carRoutes.js :
```javascript
var express = require('express');
var router = express.Router();
var carModel = require('../models/carModel.js');
/**
 * carRouter.js
 *
 * @description :: Server-side logic for managing cars.
 */

/*
 * GET
 */
router.get('/', (req, res, next) => {
    carModel.find()
        .select('-__v')
        .then(cars => res.send(cars))
        .catch(next);
    })
/*
 * GET
 */
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    carModel.findById(id).lean()
        .then(car => res.send(car))
        .catch(next);
    })

/*
 * POST
 */
router.post('/', (req, res, next) => {
    new carModel(req.body)
        .save()
        .then(car => res.send(car))
        .catch(next);
})

/*
 * PUT
 */
router.put('/:id', (req, res, next) => {
    carModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(car => {
            res.send(car);
        })
        .catch(next);
    })

/*
 * DELETE
 */
router.delete('/:id', (req, res, next) => {
    carModel.findByIdAndRemove(req.params.id)
        .then(response => {
            res.send({ removed: response ? true : false });
        })
        .catch(next);
    })

module.exports = router;

```


### With files tree generation by module
```bash
Files tree generation grouped by Type or by Module (t/m) ? [t] : m
        create: ./car
        create: ./car/carModel.js
        create: ./car/carController.js
        create: ./car/carRoutes.js
```

You then only have to add router in app.js file and MongoDB connection whit Mongoose.
app.js :
```javascript
var routes = require('./routes/index');
var cars = require('./routes/carRoutes');
 ...

app.use('/', routes);
app.use('/cars', cars);
 ...
 
```

## Licence

Copyright (c) 2017 Keeley Hammond & Chris Wallace
Licensed under the [MIT license](LICENSE).
