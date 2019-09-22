const router = require('express').Router();
const Movies = require('./model');
const varify = require('../signup/routes/verifytoken'); 

router.post('/movies',(req,res) =>{
     if(!req.body.title){
         return res.json({
           meassage: " title can not be empty!"
         });
     }
     const movies = new Movies({
         title:req.body.title,
         year:req.body.year,
         rating:req.body.rating,
         actors:req.body.actors
     });
     movies.save().then(movies=>{
         res.send(movies);
     }).catch(err =>{
        res.status(500).send({
            message : err.message || " some error occured while creating the actore"
        });
     });
});
router.get('/movies',varify,(req,res) =>{
    
    Movies.find().populate('actors').then(movies =>{

        res.send(movies);
    }).catch(err =>{
       res.status(500).send({
           message : err.message || "some error ocurred while retrieving actors"
       });
    });

});

module.exports = router;