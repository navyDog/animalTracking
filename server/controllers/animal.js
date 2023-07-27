const Animal = require('../models/animal');




exports.createAnimal = (req, res, next) => {
    const animal = new Animal({
        name: req.body.name,
        type: req.body.type,
        date: req.body.date,
        coord: req.body.coord
    }); 
    
    animal.save()
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
 };

 exports.getAll = (req,res,next) => {

    Animal.find().then(
        (animals) => {
          
          res.status(200).json(animals);
        }
      ).catch(
        (error) => {

          res.status(400).json({
            error: error
          });
        }
      );
 };

 exports.getOne = (req,res,next) => {
 
    Animal.findOne({
        name: req.params.name
      }).then(
        (thing) => {
          res.status(200).json(thing);
        }
      ).catch(
        (error) => {
          res.status(404).json({
            error: error
          });
        }
      );
 };