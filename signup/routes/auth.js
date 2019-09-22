const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/',async(req,res) =>{
    const user = await User.find()
    res.send(user);
});

router.post ('/signup',async(req,res) =>{

    const salt = await bcrypt.genSalt(10);
    const hassPassword = await bcrypt.hash(req.body.password,salt);

    let user = await User.findOne({userName:req.body.userName});
     if(user) return res.status(400).send('userNmae already exist');

     user = new User({
        userName :req.body.userName,
        password:hassPassword
    });
    try{
        const savedUser = await user.save();
        const Token_Secret="sdjhfjdhkj" ;
        const token = jwt.sign({_id:user._id},Token_Secret);
        res.header('auth-token',token).send(token);
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/login',async(req,res) =>{

     const user = await User.findOne({userName:req.body.userName});
     if(!user) return res.status(400).send('userNmae or password is wrong');

    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass)return res.status(400).send("Invalid password");
    const Token_Secret="sdjhfjdhkj" ;
    const token = jwt.sign({_id:user._id},Token_Secret);
    res.header('auth-token',token).send(token);
});




module.exports = router;
