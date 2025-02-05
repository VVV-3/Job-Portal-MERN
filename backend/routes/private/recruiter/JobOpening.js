//jobOpening operations

const router = require('express').Router();
const JobOpening = require('../../../models/JobOpening');
const mongoose = require('mongoose');
//const verify = require('../../../auth/TokenValidation');

//make jobOpening
router.post('/make/:recruiterId', async (req,res) => {
    //create a document
    const job = new JobOpening({
        title: req.body.title,
        recruiter: req.params.recruiterId,
        maxApplicants: req.body.maxApplicants,
        maxPositions: req.body.maxPositions,
        deadline: req.body.deadline,
        skills: req.body.skills,
        jobType: req.body.jobType,
        duration: req.body.duration,
        salary: req.body.salary
    });
    
    //adding to DB
    try {
        const saveJob = await job.save();
        res.status(200).json(saveJob);
    }catch(err) {
        res.status(400).send(err);
    }
});

//find jobOpenings for certain recruiter
router.get('/find/:recruiterId', async (req,res) => {
    try {
        const jobs = await JobOpening.find({$and:[ {recruiter: mongoose.Types.ObjectId(req.params.recruiterId)}, {$or:[ {state:"open"}, {state:"filled"} ]} ]} ).populate('skills').populate('recruiter');
        res.status(200).json(jobs);
    } catch (error) {
        res.status(400).send(error);
    };
})

//edit a certain jobOpening
router.post('/edit/:id', async (req, res) => {

    JobOpening.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true}, (err, job) => {
        if (err) return res.status(400).json(err);
        res.status(200).send(job);
    });
});

//delete a certain jobOpening
router.post('/delete/:id', async (req,res) => {
    JobOpening.findByIdAndUpdate(req.params.id, { $set: {state: 'closed'} }, (err, job) => {
        if (err) return res.status(400).json(err);
        res.status(200).send('deleted boi!');
    });
});

module.exports = router;