//applicant profile operations

const router = require('express').Router();
//const verify = require('../../../auth/TokenValidation');
const Applicant = require('../../../models/Applicant');

//find a profile
router.get('/find/:id', async (req,res) => {  
    try {
        const applicant = await Applicant.findById(req.params.id).populate('skills');
        res.status(200).json(applicant);
    } catch (error) {
        res.status(400).json(error);
    }  
});


//edit a profile
router.post("/edit/:id", async (req, res) => {
    try {
        const applicant = await Applicant.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json(applicant);
    } catch (error) {
        res.status(400).json(error);
    };
});

module.exports = router;