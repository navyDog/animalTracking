const express = require('express');
const router = express.Router();

//import middleware authentification
const auth = require('../middleware/auth');


//import controller for user
const userCtrl = require('../controllers/user');

//les API
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/',auth, userCtrl.getUser);
router.get('/logout', userCtrl.logout);



module.exports = router;