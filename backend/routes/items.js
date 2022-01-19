const router = require('express').Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
let Item = require('../models/item.model');

router.route('/').get((req, res) => {
    Item.find()
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Setup multer for storage
var multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join("./public/uploads/"));
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

router.post('/add', upload.single("pictureimage"), (req, res) => {
    console.log(req.body);
    const imageContent = fs.readFileSync(req.file.path);

    const newItem = new Item({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        owner: req.body.owner,
        image:{
            data: imageContent,
            contentType: req.file.mimetype,
            size: req.file.size,
            name: req.file.filename,
            imageBase64: imageContent.toString("base64"),
            followingUsers: []
        },
        dimensions: req.body.dimensions,
        color: req.body.color,
        size: req.body.size,
        comments: [],
        likes: 0
    });
    console.log("menjel mar");
    newItem.save()
    .then(() => res.json('Item added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Item.findById(req.params.id)
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then(() => res.json('Item deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Item.findById(req.params.id)
        .then(items => {
            items.title = req.body.title;
            items.description = req.body.description;
            items.category = req.body.category;
            items.owner = req.body.owner;
            items.dimensions = req.body.dimensions;
            items.color = req.body.color;
            items.size = req.body.size;
            items.comments = Array(req.body.comments);
            items.likes = Number(req.body.likes)
        
            items.save()
                .then(() => res.json("Item updated!"))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;