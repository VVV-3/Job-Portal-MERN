//jobOpening operations

const router = require('express').Router();
const JobOpening = require('../../../models/JobOpening');
//const verify = require('../../../auth/TokenValidation');

//find all joOpenings
router.get('/find', async (req,res) => {
    try {
        const jobs = await JobOpening.find({$or:[ {state:"open"}, {state:"filled"} ]} );
        res.status(200).json(jobs);
    } catch (error) {
        res.status(400).send(error);
    };
});

//rate a jobOpening by its id
router.post('/rate/:id', async (req,res) => {
    JobOpening.findByIdAndUpdate(req.params.id, { $inc: { "rating.numerator": req.body.rating, "rating.denominator": 1 } }, {new: true}, (err, job) => {
        if (err) return res.status(400).json(err);
        res.status(200).send(job);
    });
});
module.exports = router;