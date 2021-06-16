const nodemailer  = require('nodemailer');
const config = require("../config/cred");
const _ = require("lodash");
const defaultOption = {
    from    : `${config.EMAIL_FROM}<${config.EMAIL_FROM}>`,
    subject : '',
    text    : '',
    html    : ''
}


const transporter = nodemailer.createTransport({
    host: config.serverURLs.EMAIL_HOST,
    port: config.serverURLs.EMAIL_PORT,
    secure: true, 
    auth: {
        user: config.serverURLs.EMAIL_USER,
        pass: config.serverURLs.EMAIL_PASS
    }, // need to change in production
    tls: {
        rejectUnauthorized: false
    }

},defaultOption);
const sendMail = function(mailOptions){
    return new Promise(function(resolve, reject) {
        transporter.sendMail(mailOptions,(error, info)=>{
            if(error){
                console.log(error,"mail");
                reject(error);
            }else{
                resolve(info);
            }
        })
    });
}

module.exports =  function(mailOptions){

    mailOptions.to = _.isArray(mailOptions.to) ? mailOptions.to.join(',') : mailOptions.to;
    // mailOptions.bcc = 'rituraj@matrixnmedia.com';

    if(mailOptions.template && typeof mailOptions.template === 'object'){

        let template = mailOptions.template;

        return EmailTemp.render((template.path||'/'),(template.data||{})).then((response)=>{
            mailOptions['html'] = response;
            mailOptions = _.omit(mailOptions,'template');
            return sendMail(mailOptions);
        })
        .then((response)=>{
            return response;
        })
        .catch((errors)=>{
            return errors;
        });
    }else{
        return sendMail(mailOptions);
    }
}


