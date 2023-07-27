const express = require('express');
const router = express.Router();

// //import middleware authentification
// const auth = require('../middleware/auth');


//import controller for user
const animalCtrl = require('../controllers/animal');

//les API
router.post('/',animalCtrl.createAnimal);
router.get('/',animalCtrl.getAll);
router.get('/:name', animalCtrl.getOne);


module.exports = router;