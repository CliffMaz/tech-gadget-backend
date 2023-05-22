import jwt from "jsonwebtoken";


const verify = (req, res, next) =>{
    const token = req.header("authtoken");

    if(!token) return res.status(401).send("Access denied");

    try{

        const verified=jwt.verify(token,process.env.JWT_TOKEN);
        
        req.user=verified;
        
        next();

    }catch(err){

        res.status(400).send("invalid or expired token");
    }
}

export default verify;