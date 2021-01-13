//applicant profile operations

const router = require('express').Router();
//const verify = require('../../../auth/TokenValidation');
const Applicant = require('../../../models/Applicant');

//find a profile
router.get('/find/:id', (req,res) => {    
    Applicant.findById(req.params.id, (err,applicant) => {
        if(err) return res.status(400).send(err);
        res.status(200).json(applicant);
    });
});


//edit a profile
router.post("/edit/:id", async (req, res) => {
    Applicant.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, applicant) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(applicant);
    });
});

module.exports = router;