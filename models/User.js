const bookshelf   = require('../config/database');
const jwt         = require('jsonwebtoken');
const APP_KEY = `base64:5wPVnvQl0nm/5/aryiu97897ewEuM0HMgFPsX7n0D3rKks=`;
module.exports    = bookshelf.model('User',{
    tableName :'users',
    getAuthorizeToken: async function(user_id,formData, apiName){

        let expireIn = '1y';
        let resData;
        let token_data = {
            user        :[]
        }; 
        await this.where('id',user_id).fetch().then((user)=>{           
            token_data.user = user.toJSON();
            resData = user.toJSON();
        })
        let token = 'jwt '+ jwt.sign(token_data,APP_KEY,{expiresIn:expireIn});
             
        await this.tokenUpdate(user_id,formData,token);
        resData.token = token;
        let send_data = {
            status      :'success',
            data     : resData         
        };
        if(apiName === "LOGIN"){
            send_data.message = "User Login Successfully..!";
        }else if(apiName === "LOGIN"){
            send_data.message = "User Registered Successfully..!";
        }
        return send_data;
    }, 
    tokenUpdate(user_id, data,token){      
        return this.where('id',user_id).save({"token":token}, { patch: true})   
    },   

});