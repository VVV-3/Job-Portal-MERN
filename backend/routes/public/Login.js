//Login for User

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Applicant = require('../../models/Applicant');
const Recruiter = require('../../models/Recruiter');
const {loginValidation} = require('../../auth/DetailsValidation');

router.post('/', async (req,res) => {
    console.log(req.body);
    //Validation
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if user dosent exist
    const user = await User.findOne({email: req.body.email});
    console.log(user);
    if (!user) return res.status(400).send('User does not exist exist in DB, please register');

    //Checking password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid Password!');

    //Create and send JSON web token
    //const token = await jwt.sign({_id: user._id, jobType: user.jobType}, 'DASSsucc', { expiresIn: '18000s' });
    
    //Finding ProfileID
    if (user.jobType === 'applicant') {
        const profile = await Applicant.findOne({email: user.email});
        const token = await jwt.sign({id: user._id, profile_id:profile._id, jobType: user.jobType}, 'DASSsucc', { expiresIn: '18000s' });
        res.cookie('session-token', token).json({
            id: user._id,
            profile_id: profile._id,
            jobType: user.jobType,
            email: user.email
        });
    }
    else{
        const profile = await Recruiter.findOne({email: user.email});
        const token = await jwt.sign({id: user._id, profile_id:profile._id, jobType: user.jobType}, 'DASSsucc', { expiresIn: '18000s' });
        res.cookie('session-token', token).json({
            id: user._id,
            profile_id: profile._id,
            jobType: user.jobType,
            email: user.email
        });
    }

});

module.exports = router;