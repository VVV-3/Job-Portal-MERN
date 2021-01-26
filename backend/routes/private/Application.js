// operations on applications

const router = require('express').Router();
const Application = require('../../models/Application');
//const verify = require('../../auth/TokenValidation');

//make an applicantion for given applicantID and jobId
router.post('/add/:applicantId/:jobId', async (req,res) => {
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

//find applications
router.get('/find', async (req,res) => {
    
    try {
        const applications = await Application.find(req.query).populate('jobOpening')
        .populate({ path:"jobOpening", populate: {path:"recruiter"}})
        .populate('applicant')
        .populate({ path:"applicant", populate: {path:"skills"}});
        res.status(200).json(applications);
       
    } catch (error) {
        res.status(400).json(error);
    };
});

//edit applications
router.post('/edit/:id', async (req,res) => {
    try {
        const application = await Application.findByIdAndUpdate(req.params.id , { $set: req.body }, {new: true}).populate('jobOpening').populate('applicant');
        res.status(200).json(application);
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;