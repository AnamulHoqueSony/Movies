
module.exports = (app) =>{
    const Actors = require('./model.js');

    app.post('/api/actors',(req,res) =>{
        if(!req.body.name){
            return res.status(400).send({
             message : "name can not empty"  
            });
        }
        const actors = new Actors({
            name : req.body.name,
            birthDay: req.body.birthDay,
            country: req.body.country,
        });

        actors.save().then(data =>{
            res.send(data);
        }).catch(err =>{
            res.status(500).send({
                message : err.message || " some error occured while creating the actore"
            });
        });
    });
    app.get('/api/actors',(req,res) =>{

        Actors.find().then(actors =>{
            res.send(actors);
        }).catch(err =>{
           res.status(500).send({
               message : err.message || "some error ocurred while retrieving actors"
           });
        });

    });
}
