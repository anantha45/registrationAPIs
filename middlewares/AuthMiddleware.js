const jwt         = require('jsonwebtoken');
const APP_KEY = `base64:5wPVnvQl0nm/5/aryiu97897ewEuM0HMgFPsX7n0D3rKks=`;
var AuthMiddleware = {
    // Auth:function(ExceptRoute = null){

    //     return function(req, res, next){

    //         if(ExceptRoute.filter(v=>(_.isPatternMatch(req.originalUrl,v) || req.originalUrl === v)).length > 0){
    //             return next();
    //         }
    //         else{
    //             return res.status(403).json({'status':'error','message':'Token mismatch or unauthorize access.'})
    //         }
    //     }
    // },
    UserToken:function(req,res,next){
        try{
            if(req.headers.authorization){                   
                let token = req.headers.authorization.split("jwt ");
                var decoded = jwt.verify(token[1], APP_KEY);
                if(decoded){
                    next();
                }  
            }else{
                return res.json({status: 401, message :'This token is invalid.'});
            }
        }
        catch(e){
            console.log(e)
            return res.json({status: 401, message :'This token is invalid.'});
        }        
    }
}


module.exports = AuthMiddleware;