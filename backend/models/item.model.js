const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set("debug", true);

const itemSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 5
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true
    },
    owner: {
        type: String
    },
    imagename: {
        type: String
    },
    image: {
        data: Buffer,
        contentType: String,
        size: Number,
        name: String,
        imageBase64: String
    },
    stlfilename: {
        type: String
    },
    stlfile: {
        data: Buffer,
        contentType: String,
        size: Number,
        name: String
    },
    dimensions: {
        type: String,
        required: true,
        trim: true
    },
    color: {
        type: String,
        reuquired: true,
        trim: true
    },
    size: {
        type: String,
        reuquired: true
    },
    followingUsers: {
        type: Array
    },
    comments: {
        type: Array
    },
    likes: {
        type: Array
    },
    nrdownloads: {
        type: Number
    },
    // printer settings
    printer: {
        type: String,
        reuqired: true,
        trim: true
    },
    printerbrand: {
        type: String,
        reuqired: true,
        trim: true
    },
    rafts: {
        type: String,
        reuqired: true,
        trim: true
    },
    supports: {
        type: String,
        reuqired: true,
        trim: true
    },
    resolution: {
        type: String,
        reuqired: true,
        trim: true
    },
    notes: {
        type: String,
        reuqired: true,
        trim: true
    }
}, {
    timestamps: true
})

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;