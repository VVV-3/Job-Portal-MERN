//applicant profile operations

const router = require('express').Router();
//const verify = require('../../auth/TokenValidation');
const Applicant = require('../../models/Applicant');

//find applicant
router.get('/find', async (req,res) => {  
    try {
        const applicant = await Applicant.find(req.query).populate('skills');
        res.status(200).json(applicant);
    } catch (error) {
        res.status(400).json(error);
    }  
});


//edit applicant
router.post("/edit/:id", async (req, res) => {
    try {
        const applicant = await Applicant.findByIdAndUpdate( req.params.id , { $set: req.body }, {new: true}).populate('skills');
        res.status(200).json(applicant);
    } catch (error) {
        res.status(400).json(error);
    };
});

module.exports = router;