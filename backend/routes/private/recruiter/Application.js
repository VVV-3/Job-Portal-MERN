// operations on applications

const router = require('express').Router();
const Application = require('../../../models/Application');
//const verify = require('../../../auth/TokenValidation');

//find all applications for a jobId
router.get('/find/:jobId', async (req,res) => {
    try {
        const applications = await Application.find({$and:[ {jobOpening: mongoose.Types.ObjectId(req.params.jobId)}, {$or:[ {state:"applied"}, {state:"shortlisted"} ]} ]} );
        res.status(200).json(applications);
    } catch (error) {
        res.status(400).send(error);
    };
});

//edit a application by its id
router.post('/edit/:id',(req,res) => {
    Application.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true}, (err, application) => {
        if (err) return res.status(400).json(err);
        res.status(200).send(application);
    });
    //BACKEND PROCESSES !!!
});

module.exports = router;