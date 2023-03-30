const jwt = require("jsonwebtoken");
const JWT_SECRET = "thisisasecret";

const fetchuser = (req, res, next) =>{

    //get user from the jwt token and id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
    try {   
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        //it is the route which is gonna be called
        next();
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
    
}

module.exports = fetchuser;