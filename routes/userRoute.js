const express = require('express');

const user_route = express();
// i madee this variable app,not from the tutorial

//const app =   express();

const multer = require('multer');
const path = require('path');

// Update views path
user_route.set('views', '../views/users')
//user_route.set('views', path.join(__dirname, '../../views/users'));

//app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'views'));

user_route.set('view engine','ejs');
//user_route.set('views','../views/users');


// going to comment real code above.


//user_route.set('views', path.join(__dirname, "views"));
const bodyParser = require('body-parser');

user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));




const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname, '../public/userImages'));

        },
        filename:function(req,file,cb){
            const name = Date.now()+'-'+file.originalname;
            cb(null,name);

    }
})

const upload = multer({storage:storage});

const userController = require('../controllers/userController');

user_route.get('/register',userController.loadRegister);

user_route.post('/register',upload.single('image'),userController.insertUser);
module.exports = user_route;
