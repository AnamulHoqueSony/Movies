const jwt = require('jsonwebtoken');
let varified;
module.exports  =  async(req,res,next)=>{
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access  Denied')
    try{
        const Token_Secret="sdjhfjdhkj";
        const verified = await jwt.verify(token,Token_Secret);
        console.log(varified);
        req.user = varified;
        next();
    }catch(err){
        console.log(varified);
        res.status(400).send('Invalid Token');
    }
}