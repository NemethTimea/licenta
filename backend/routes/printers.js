const router = require('express').Router();
let Printer = require('../models/printer.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', (req, res) => {
    console.log(req.body);

    const newPrinter = new Printer({
        printer: req.body.printer,
        model: req.body.model,
        printerbrand: req.body.printerbrand,
        rafts: req.body.rafts,
        password: req.body.password,
        supports: req.body.supports,
        resolution: req.body.resolution,
        notes: req.body.notes
    });

    newPrinter.save()
        .then(() => res.json('Printer added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;