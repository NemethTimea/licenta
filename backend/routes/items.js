const router = require('express').Router();
const fs = require("fs");
let Item = require('../models/item.model');

router.route('/').get((req, res) => {
    Item.find()
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    // const imageContent = fs.readFileSync(req.file.path);

    const newItem = new Item({
        title: req.body.title,
        description: req.body.description,
        category: "Art",
        owner: req.body.owner,
        // image:{
        //     data: imageContent,
        //     contentType: req.file.mimetype,
        //     size: req.file.size,
        //     name: req.file.filename,
        //     imageBase64: imageContent.toString("base64"),
        //     followingUsers: []
        // },
        dimensions: req.body.dimensions,
        color: req.body.color,
        size: "Middle",
        comments: [],
        likes: Number(req.body.likes)
    });

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