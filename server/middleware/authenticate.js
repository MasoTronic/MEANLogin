var {User} = require('../db/models/User-model');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    console.log(req)
    User.findByToken(token).then((user)=>{
        console.log(user + 'got my user details back');
        if(!user)
        {
            return Promise.reject("no user found");
        }
         req.user = user;
         req.token = token;
         next();
    }).catch((err) => {
        res.status(401).send(err);
    });
    console.log(JSON.stringify(token));
}

module.exports = {authenticate};