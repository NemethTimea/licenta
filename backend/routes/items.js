const router = require('express').Router();
const path = require("path");
const multer = require("multer");
let Item = require('../models/item.model');
const { upload } = require('@testing-library/user-event/dist/upload');
const { post } = require('jquery');
const download = require('download');
const os = require("os");


// Setup multer for storage
var multerDiskStorageImage = multer.diskStorage({
    destination: function(req, file, cb){
        console.log(file);
        file_path = path.join(path.dirname(path.resolve(process.cwd())), "public/uploads/images")
        if (file.originalname.endsWith(".stl"))
        {
            file_path = path.join(path.dirname(path.resolve(process.cwd())), "public/uploads/stl")
        }
        cb(null, file_path);
    },
    filename: function(req, file, cb){  
        cb(null, file.originalname);
    }
});

var upload_file = multer({
    storage: multerDiskStorageImage
});

router.route('/').get((req, res) => {
    Item.find()
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/:id").get((req, res) => {
    Item.findById(req.params.id)
        .then(item => res.json(item))
        .catch(error => res.status(400).json("Error: " + error.response));
});

router.route("/delete/:id").delete((req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then(() => res.json("Item deleted!"))
        .catch(error => res.status(400).json("Error: " + error));
});

router.route("/follow/:id").post((req, res) => {
    Item.findById(req.params.id)
        .then(item => {
            if (item.followingUsers.includes(req.body.username) || item.owner == req.body.username)
            {
                res.json("not allowed")
                return
            }
            item.followingUsers.push(req.body.username);
            console.log(item.followingUsers);
            item.save()
                .then(() => res.json(item))
                .catch(error => res.status(400).json("Error: " + error));
        })
        .catch(error => res.status(400).json("Error: " + error));
});

router.route("/unfollow/:id").post((req, res) => {
    Item.findById(req.params.id)
        .then(item => {
            item.followingUsers = item.followingUsers.filter((username) => {
                return username !== req.body.username
            });
            item.save()
                .then(() => res.json(item))
                .catch(error => res.status(400).json("Error: " + error));
        })
        .catch(error => res.status(400).json("Error: " + error));
});

router.route('/:id').delete((req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then(() => res.json('Item deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    if (req.body.text !== ""){
        Item.findById(req.params.id)
            .then(items => {
                items.comments.unshift(req.body);
                items.save()
                    .then(() => res.json(items))
                    .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
    }
});

router.route("/editcomment/:id").post((req, res) => {
    var dict = {
        "username" : req.body.username,
        "text" : req.body.text
    }
    if (req.body.text !== ""){
        Item.findById(req.params.id)
            .then(items => {
                items.comments[req.body.position] = dict;
                items.markModified("comments")
                items.save()
                    .then(() => res.json(items))
                    .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
    }
});

router.route("/deletecomment/:id").post((req, res) => {
    Item.findById(req.params.id)
    .then(item => {
        item.comments.splice(req.body.position, 1);
        item.save()
            .then(() => res.json(item))
            .catch(error => res.status(400).json("Error: " + error));
    })
    .catch(error => res.status(400).json("Error: " + error));
})

router.post("/createNewPost", upload_file.fields([{
        name: 'image', maxCount: 1
    }, {
        name: 'stlfile', maxCount: 1
    }]), (req, res) => {

    console.log("REQQQ")
    // console.log(req)
    console.log(req.fields)
    console.log("1. ELJUTT???")

    const newItem = new Item({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        image: upload_file[0],
        imagename: req.body.imagename,
        stlfile: upload_file[1],
        stlfilename: req.body.stlfilename,
        dimensions: req.body.dimensions,
        color: req.body.color,
        size: req.body.size,
        followingUsers: [],
        comments: [],
        likes: [],
        nrdownloads: 0,
        printer: req.body.printer,
        printerbrand: req.body.printerbrand,
        rafts: req.body.rafts,
        supports: req.body.supports,
        resolution: req.body.resolution,
        notes: req.body.notes,
        owner: req.body.owner,
    });
    console.log("2. ELJUTT???");
    console.log(newItem)
    newItem.save()
        .then(() => {
            console.log("Item saved!")
            res.json("Item created!")
        })
        .catch(error => {
            console.log("Error saving item: " + error)
            res.status(400).json("Error: " + error)
        });
});

router.route("/download/:id").post((req, res) => {
    console.log("ITT NEZD:: ")
    console.log(req.params.id)
    Item.findById(req.params.id)
    .then(post => {
        file_path = "http://localhost:3000/uploads/stl/" + post.stlfilename

        result = {
            "post": null,
            "result": "Download FAILED!"
        }

        console.log(file_path)
        console.log(post.stlfilename)

        download_to = path.join(os.homedir(), "Downloads")
        download(file_path, download_to)
        .then(() => {
            console.log("THEN??")
            post.nrdownloads++
            post.save()
            .then(() => {
                result["post"] = post
            })
            .catch(err => res.status(400).json("Could not save."))

            result["result"] = "STL File downloaded SUCCESSFULLY!"
            res.json(result)
        })
        .catch(err => res.status(400).json(result))
    })
    .catch(err => res.status(400).json("Item is missing!"));
})

router.route("/like/:id").post((req, res) => {
    console.log("Like form items.js: ")
    console.log(req.params.id)
    Item.findById(req.params.id)
    .then( post => {
        result = {
            "post": post
        }
        if (!post.likes.includes(req.body.username)){
            post.likes.push(req.body.username);
            post.save()
            .catch(err => res.status(400).json("Could not save the new item."))
        }
        
        res.json(result)
    })
    .catch(error => res.status(400).json("Error: " + error.response));
})

router.route("/dislike/:id").post((req, res) => {
    console.log("Like form items.js: ")
    console.log(req.params.id)
    Item.findById(req.params.id)
    .then( post => {
        result = {
            "post": post
        }
        if (post.likes.includes(req.body.username)){
            post.likes.remove(req.body.username);
            post.save()
            .catch(err => res.status(400).json("Could not save the new item."))
        }
        
        res.json(result);
    })
    .catch(error => res.status(400).json("Error: " + error.response));
})

router.route("/filter/").post((req, res) => {
    Item.find()
    .then((posts) => {
        console.log("filtering with: ", req.body)
        const text = req.body.search
        const result = posts.filter(post => {
            if (req.body.category.length > 0 && !req.body.category.includes(post.category) && text === "") {
                return false;
            }

            console.log("Category OK")
            
            if (text === "")
            {
                return true;
            }

            console.log("text is not empty: ", text === "")

            if (post.owner.includes(text)) return true;
            console.log("post owner does not contain: " + text)
            if (post.title.includes(text)) return true;
            console.log("post title does not contain: " + text)
            if (post.description.includes(text)) return true;
            console.log("post description does not contain: " + text)
            if (post.printerbrand.includes(text)) return true;
            console.log("post printerbrand does not contain: " + text)
            if (post.notes.includes(text)) return true;
            console.log("post notes does not contain: " + text)
            if (post.printer.includes(text)) return true;
            console.log("post printer does not contain: " + text)

            return false;
        });
        
        console.log("filtering DONE")
        res.status(200).json(result);
    })
    .catch(error => res.status(400).json("Error: " + error.response));
});

module.exports = router;