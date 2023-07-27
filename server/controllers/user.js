const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ Error: 'Bad request' }));
      })
      .catch(error => res.status(500).json({ Error: 'Unknown Error' }));
  };

  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ Error: 'Paire login/mot de passe incorrecte'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ Error: 'Paire login/mot de passe incorrecte' });
                    }
                    const token = jwt.sign({email: user.email, name: user.name},
                         "jwt-secret-key", {expiresIn: '12h'});
                     
                     res.status(200).cookie('token', token).json({
                        userId: user._id
                     });
                    
                    // json({
                    //     userId: user._id,
                    //     token: jwt.sign(
                    //         { userId: user._id },
                    //         'RANDOM_TOKEN_SECRET',
                    //         { expiresIn: '24h' }
                    //     )
                    // });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };

 exports.getUser = (req, res, next) =>{
    res.json({email: req.email, name: req.name})
 };

 exports.logout = (req, res, next) =>{
        res.clearCookie('token');
        return res.json("Success")
 };