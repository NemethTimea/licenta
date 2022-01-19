const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set("debug", true);

const printerSchema = new Schema({
    printer: {
        type: String,
        reuqired: true,
        trim: true
    },
    model: {
        type: String,
        required: true
    },
    printerbrand: {
        type: String,
        reuqired: true,
        trim: true
    },
    user:{
        type: String,
        required: true,
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
})
const Printer = mongoose.model("Printer", printerSchema);
module.exports = Printer;