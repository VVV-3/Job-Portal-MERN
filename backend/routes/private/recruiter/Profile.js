//recruiter profile operations

const router = require('express').Router();
//const verify = require('../../../auth/TokenValidation');
const Recruiter = require('../../../models/Recruiter');

//find a profile
router.get('/find/:id', (req,res) => {    
    Recruiter.findById(req.params.id, (err,recruiter) => {
        if(err) return res.status(400).send(err);
        res.status(200).json(recruiter);
    });
});


//edit a profile
router.post("/edit/:id", async (req, res) => {
    Recruiter.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, profile) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(profile);
    });
});

module.exports = router;