//recruiter profile operations

const router = require('express').Router();
//const verify = require('../../auth/TokenValidation');
const Recruiter = require('../../models/Recruiter');

//find recruiter
router.get('/find', async (req,res) => {
    try {
        const recruiter = await Recruiter.find(req.query);
        res.status(200).json(recruiter);
    } catch (error) {
        res.status(400).send(error);
    } 
});

//edit recruiter
router.post("/edit/:id", async (req, res) => {
    try {
        const recruiter = await Recruiter.findByIdAndUpdate(req.params.id , { $set: req.body }, {new: true});
        res.status(200).json(recruiter);
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;