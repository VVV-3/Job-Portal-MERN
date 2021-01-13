//rate an applicant

const router = require('express').Router();
//const verify = require('../../../auth/TokenValidation');
const Applicant = require('../../../models/Applicant');

//rate a applicant by their id
router.post('/rate/:id', async (req,res) => {
    Applicant.findByIdAndUpdate(req.params.id, { $inc: { "rating.numerator": req.body.rating, "rating.denominator": 1 } }, {new: true}, (err, applicant) => {
        if (err) return res.status(400).json(err);
        res.status(200).send(applicant);
    });
});

module.exports = router;