const router = require('express').Router();
const nodemailer = require("nodemailer");
const path = require("path");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let User = require("../models/user.model");
let Item = require("../models/item.model");

require("dotenv").config();

const transporter = require('@sendgrid/mail')
transporter.setApiKey(process.env.SENDGRID_API_KEY)

// Setup multer for storage
var multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join("../public/uploads/"));
    },
    filename: function(req, file, cb){  
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

var multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")){
        cb(null, true);
    }
    else {
        cb("Please upload only images.", false);
    }
};

var upload = multer({
    storage: multerDiskStorage,
    fileFilter: multerFilter
});

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

function sendConfirmationEmail(name, email, confirmation_code){
    transporter.send({
        to: email,
        from: process.env.MAIL,
        subject: "Please confirm your account",
        text: "Hi",
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:3000/login/${confirmation_code}>Confirm</a>
        </div>`
    }).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error.response.body);
    });
}

router.post('/register/user/', (req, res) => {
    bcrypt.hash(req.body.password, 10, (error, hashedpwd) => {
        if (error){
            res.json(error);
            return;
        }
        const token = jwt.sign({email: req.body.email}, process.env.SECRET)
        const newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: hashedpwd,
            about: req.body.about,
            printer: Boolean(req.body.printer),
            follows: [],
            followers: [],
            favourites: [],
            status: 'Pending',
            confirmation_code: token
        });
        
        sendConfirmationEmail(newUser.firstname + " " + newUser.lastname, newUser.email, token);
        
        newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    });
});

function auth(username, password, callback){
    User.findOne({username: username}, (error, user) => {
        if (!user) {
            return callback(new Error("User not found!"));
        }
        bcrypt.compare(password, user.password, (error, result) => {
            if (error){
                return callback(error);
            }
            if (result){
                return callback(null, user);
            }
            return callback("Passwords does not match");
        })
    });
}

router.post("/login/user/", (req, res) => {
    auth(req.body.username, req.body.password, (error, user) => {
        if (error){
            res.send("error");
        }
        if (user){
            clientUser = {
                uid: user._id,
                username: user.username,
                email: user.email,
                about: user.about,
                firstname: user.firstname,
                lastname: user.lastname,
                status: user.status
            }
            res.send(clientUser);
        } else {
            res.send("null");
        }
    });
});

router.get("/:username", (req, res) => {
    User.findOne({username: req.params.username})
    .then((user) => {
        clientUser = {
            uid: user._id,
            username: user.username,
            email: user.email,
            about: user.about,
            firstname: user.firstname,
            lastname: user.lastname,
            follows: user.follows,
            followers: user.followers,
            favourites: [],
            posts: []
        }

        Item.find()
        .then(posts => {
            clientUser.posts = posts.filter(post => {
                return user.username === post.owner
            })
            clientUser.favourites = posts.filter(post => {
                return post.followingUsers.includes(user.username)
            })
            res.status(200).json(clientUser)
        })
        .catch(error => res.status(400).json("Error: " + error));
    })
    .catch(error => res.status(400).json("Error: " + error));
});

router.post("/confirm/", (req, res) => {
    if (req.body.ccode){
        User.findOne({confirmation_code: req.body.ccode})
            .then((user) => {
                if (!user){
                    res.status(404).send({message: "User not found!"});
                }
                
                user.status = "Active";
                user.save().catch(error => res.status(400).json("Error: " + error));
            })
            .catch(error => { console.log("error", error); })
    }
});

router.route("/hasprinter/").post((req, res) => {
    User.findById(req.body.userId)
        .then((user) => {
            res.json({hasprinter: user.printer});
        })
        .catch(error => res.status(400).json("Error: " + error));
});

router.route("/follow/:id").post((req, res) => {
    User.findById(req.params.id)
    .then((user) => {
        user.followers.push(req.body.username)
        user.save()
        .then((response) => { 
            User.findOne({username: req.body.username})
            .then((logged_in_user) => {
                logged_in_user.follows.push(user.username)
                logged_in_user.save()
                .then(() => {res.status(200).json(user.followers)})
                .catch(error => res.status(400).json("Error: " + error));
            })
            .catch(error => res.status(400).json("Error: " + error));
        })
        .catch(error => res.status(400).json("Error: " + error));
    })
    .catch(error => res.status(400).json("Error: " + error));
});

router.route("/unfollow/:id").post((req, res) => {
    User.findById(req.params.id)
    .then((user) => {
        user.followers = user.followers.filter((follower) => {
            return req.body.username !== follower
        })
        user.save()
        .then((response) => {
            User.findOne({username: req.body.username})
            .then((logged_in_user) => {
                logged_in_user.follows = logged_in_user.follows.filter((uname) => {
                    return user.username !== uname
                })
                logged_in_user.save()
                .then(() => {res.status(200).json(user.followers)})
                .catch(error => res.status(400).json("Error: " + error));
            })
            .catch(error => res.status(400).json("Error: " + error));
        })
        .catch(error => res.status(400).json("Error: " + error));
    })
    .catch(error => res.status(400).json("Error: " + error));
});

router.route("/edit/:id").post((req, res) => {
    console.log("helloooo --- ", req.body)
    User.findById(req.params.id)
    .then((user) => {
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.about = req.body.about;
        user.follows = req.body.follows;
        user.followers = req.body.followers;

        clientUser = {
            uid: user._id,
            username: user.username,
            email: user.email,
            about: user.about,
            firstname: user.firstname,
            lastname: user.lastname,
            follows: user.follows,
            followers: user.followers,
            favourites: [],
            posts: []
        }

        user.save()
        .then(() => {
            Item.find()
            .then(posts => {
                clientUser.posts = posts.filter(post => {
                    return user.username === post.owner
                })
                clientUser.favourites = posts.filter(post => {
                    return post.followingUsers.includes(user.username)
                })
                res.status(200).json(clientUser)
            })
            .catch(error => res.status(400).json("Error: " + error));
        })
        .catch(error => res.status(400).json("Error: " + error));
    })
    .catch(error => res.status(400).json("Error: " + error));
});

router.route("/filter/").post((req, res) => {
    User.find()
    .then((users) => {
        console.log("filtering with: ", req.body)
        const text = req.body.search
        result = []
        users.filter(user => {
            if (req.body.have_printer && !user.printer) return false;

            var cuser = {
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username
            }

            if (text === "") result.push(cuser);
            else if (user.firstname.includes(text)) result.push(cuser);
            else if (user.lastname.includes(text)) result.push(cuser);
            else if (user.about.includes(text)) result.push(cuser);
            else if (user.username.includes(text)) result.push(cuser);
            else if (req.body.have_printer && user.printer) result.push(cuser);
            return false;
        });
        console.log("filtering DONE")
        res.status(200).json(result);
    })
    .catch(error => {
        console.log(error)
        res.status(400).json("Error: " + error.response)
    });
});

module.exports = router;