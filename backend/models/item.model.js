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
        required: true,
        enum:['Art','Engineering', 'Animals', 'Buildings&Structures' ]
    },
    owner: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String,
        size: Number,
        name: String,
        imageBase64: String
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
        reuquired: true,
        enum: ["Small", "Middle", "Big"],
    },
    followingUsers: {
        type: Array
    },
    comments: {
        type: Array
    },
    likes: {
        type: Number
    }
}, {
    timestamps: true
})

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;