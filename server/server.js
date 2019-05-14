var express = require('express');
var bodyParser = require('body-parser');
const _ = require('lodash');
// var {authenticate} = require('./middleware/authenticate');


var {mongoose} = require('./db/mongoose');
const {User} = require('./db/models/User-model');
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
// app.use(authenticate);
app.post('/',(req,res) => {
res.send('here is what impiwe the chop gets back')
    });

    app.post('/createUser', (req,res) => {
        console.log(JSON.stringify(req.body )+ "fdasfdafdafd")
        var user = new User(req.body);
        
        user.isModified('password');
        user.save().then(()=>{
        console.log("fdasfdafdafd")

           return user.generateAuthToken();
        }).then((token) => {
            console.log('returning')
            res.send(user);
        }).catch((err) => {
            res.status(400).send("error happened " + err);
        });
    
        console.log(req.body);
    });

    app.post('/login',(req,res) => {
     let user = new User(req.body)  
        User.findOne({
            'email': req.body['username']
        }, function (err, data) {
            if (data) {
            
            if(data.password === req.body['password'])
                {
                    console.log(data + 'gfsdgfdgdf')
                res.setHeader('Content-Type', 'application/json');
                res.send({ data: data })
                }
                else {
                    res.setHeader('Content-Type', 'application/json');
                    res.send({ data: 'wrong password' })
                }
            }
            else {
                res.setHeader('Content-Type', 'application/json');
                res.send({ data: 'none' })
            }
        });

    });

    // app.get('/getUserInfo',(req,res,next) => {
    //     // console.log(req.user)
    //     res.send('here is what impiwe the chop gets back');
    //     next();
    //         });
        


app.listen(port, () => {
    console.log(`port wide open: ${port}`);
});
