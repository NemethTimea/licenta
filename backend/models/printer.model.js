const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set("debug", true);

const printerSchema = new Schema({
    printer: {
        type: String,
        reuquired: true,
        trim: true
    },
    model: {
        type: String,
        required: true
    },
    printerbrand: {
        type: String,
        reuquired: true,
        trim: true
    },
    rafts: {
        type: String,
        reuquired: true,
        trim: true
    },
    supports: {
        type: String,
        reuquired: true,
        trim: true
    },
    resolution: {
        type: String,
        reuquired: true,
        trim: true
    },
    notes: {
        type: String,
        reuquired: true,
        trim: true
    }
})
const Printer = mongoose.model("Printer", printerSchema);
module.exports = Printer;