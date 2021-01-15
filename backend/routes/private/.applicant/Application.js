// operations on applications

const router = require('express').Router();
const Application = require('../../../models/Application');
//const verify = require('../../../auth/TokenValidation');

//make an applicantion for given applicantID and jobId
router.post('/make/:applicantId/:jobId', async (req,res) => {
    //create a document
    const application = new Application({
        jobOpening: req.params.jobId,
        applicant: req.params.applicantId,
        sop: req.body.sop,
        state: req.body.state
    });
    
    //adding to DB
    try {
        const saveApplication = await application.save();
        res.status(200).json(saveApplication);
    }catch(err) {
        res.status(400).send(err);
    }
});

//find all applications
router.get('/find/', async (req,res) => {
    try {
        const applications = await Application.find({applicant: mongoose.Types.ObjectId(req.params.applicantId)}).populate('jobOpening').populate('applicant');
        res.status(200).json(applications);
    } catch (error) {
        res.status(400).send(error);
    };
});

module.exports = router;