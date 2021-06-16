
const User = require('../models/User');
const bcrypt   = require('bcryptjs');
const mailHelper = require("../helpers/mail");
const jwt         = require('jsonwebtoken');
const UserController = {
    register : async function (req, res) {
        let formData = req.body;
        if(!formData.name || !formData.username || !formData.mobile_number || !formData.password || !formData.email){
            res.json({ "status": 401, "message": "Mandatory fields are missing..!" });
        }
        let lastInsertId;
        User.where('username', formData.username).fetchAll().then(async (existed) => {
            if(existed && existed.toJSON().length > 0){
                return res.json({ "status": 401, "message": "User already exists  with this username" });
            }
            var passwordValue  = bcrypt.hashSync(formData.password, 10);
            let userData = {
                name: formData.name,
                password: passwordValue,
                username: formData.username,
                mobile_number:formData.mobile_number,
                email : formData.email
            }
            await new User(userData).save()        
            .then(async (data)=>{
                lastInsertId = data.id;
                const tokenData = {
                    username: formData.username,
                    password: passwordValue,
                }
                let response = await new User().getAuthorizeToken(lastInsertId, tokenData,"REGISTER");
                return res.json(response);

            })
            .catch((errors) => {  
                console.log(errors);
                return res.json({ "status": 400, "message": "Something went wrong..!" });
            });
        });
        
       
    },
    login: async function (req, res) {
        let formData = req.body;
        if(!formData.username || !formData.password){
            res.json({ "status": 401, "message": "Mandatory fields are missing..!" });
        }
        await User.where('username', formData.username).fetch()
            .then(async (user) => {
                if (!user) {
                    return res.json({ "status": 401, "message": "You have entered invalid username" });
                }
                if (!bcrypt.compareSync(formData.password, user.get('password'))) {
                    return res.json({ "status": 401, "message": `password doesn't match` });;
                }
                let userId = user.get('id');
                return new User().getAuthorizeToken(userId, formData,"LOGIN");
            })
            .then((userData) => {
                return res.json(userData);
            })
            .catch((errors) => {
                console.log(errors);
                return res.json({ "status": 400, "message": "Something went wrong..!" });
            });
    },
    resetPassword: async function (req, res) {
        let formData = req.body;
        if(!formData.token || !formData.password ){
           return res.json({ "status": 401, "message": "Mandatory fields are missing..!" });
        }
        console.log(Date.now())
        const user = await new User().where('reset_pasword_token', formData.token).where('reset_token_expiry', '>=', Date.now()).fetchAll();
        if(user && user.toJSON().length > 0 ){
            let userData = user.toJSON();
            let userId = userData[0]['id'];
            let username = userData[0]['username']
            var passwordValue  = bcrypt.hashSync(formData.password, 10);
            let passwordData = {
                password  : passwordValue 
            }
            new User()
            .where('username', username)
            .save(passwordData, { patch: true})          
            .then(async (data)=>{
                let tokenData = {
                    reset_pasword_token  : '',
                    reset_token_expiry  : ''
                }
                await new User().where('id', userId)
                .save(tokenData, { patch: true}) ;  
                return res.json({ "status": 200, "message": "Password Updated Successfully..!" });         
            })
            .catch((errors) => {  
                return res.json({ "status": 400, "message": "Something went wrong..!" });
            }); 
        }
        else{
            return res.json({ "status": 401, "message": "token is not valid..!" }); 
        }
        

    },
    forgotPassword : async function (req, res) {
        let formData = req.body;
        if(!formData.username ){
            return res.json({ "status": 401, "message": "Please enter username..!" });
        }
        const data = await new User()
        .where('username', formData.username).fetchAll();  
            if(data && data.toJSON().length > 0){
                let userData = data.toJSON();
                let email = userData[0].email;
                let userId = userData[0].id;
                var tokenObject = {
                    email: email,
                    id: userId
                };
                var secret = userId + '_' + email + '_' + new Date().getTime();
                var token = jwt.sign(tokenObject, secret);
                const tokenData = {
                    "reset_pasword_token" : token,
                    "reset_token_expiry" : Date.now() + 86400000
                }
                await this.UpdateUser(tokenData,userId);
                const link = `http://localhost:8000/auth/reset_password?token=${token}`;
                let html = ` Hi \n , Please clink below link to reset password \n ${link}`;
                let mailOptions = {
                    "to":email,
                    "subject":`Reset Password Link`,
                    "html": html
                }
                await  mailHelper(mailOptions);
                // new User()
                //     .where('id', userId)
                //     .save(tokenData, { patch: true})          
                //     .then((data)=>{
                //         return res.json({ "status": 200, "message": "Employee Details Updated Successfully..!" });         
                //     }).catch( (error) => {
                //         console.log(error);
                //     return res.json({ "status": 400, "message": "Something Went Wrong..!" }); 
                //     })
                return res.json({ status : 200, message: 'Kindly check your email for further instructions' });

            }else{
                return res.json({ "status": 401, "message": "username is not valid..!" }); 
            }
                   
        // })
        // .catch((errors) => {  
        //     return res.json({ "status": 400, "message": "Something went wrong..!" });
        // }); 

    }, 
    UpdateUser : async function(tokenData, userId) {
        return await User.where('id', userId).save(tokenData,{method: 'update', patch: false});
    }

}

module.exports = UserController;