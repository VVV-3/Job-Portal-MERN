//Registering a User

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const Applicant = require('../../models/Applicant');
const Recruiter = require('../../models/Recruiter');
const {registerValidation} = require('../../auth/DetailsValidation');


router.post('/', async (req,res) => {
    //Validation
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if user already exists
    const userExists = await User.findOne({email: req.body.email});
    if (userExists) return res.status(400).send('User already exists in DB');

    //Hashing the Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Creating a new User
    const user = new User({
        jobType: req.body.jobType,
        email: req.body.email,
        password: hashPassword
    });

    //Adding user to DB
    try {
        const savedUser = await user.save();
        res.status(200).send('User Registered, Please login !');
    }catch(err) {
        res.status(400).send(err);
    }
});

//We registered user, now we make the respective profile and add to db

//recruiter
router.post('/recruiter', async (req,res) => {

    //Validating if user exists
    const userExists = await User.findOne({email: req.body.email});
    if (!userExists) return res.status(400).send('Register properly dumbass!');

    //validating that profile dosent already exist
    const profileExists = await Recruiter.findOne({email: req.body.email});
    if (profileExists)  return res.status(400).send('Bruh,You already have a profile!')

    //Creating recruiter profile    
    const user = new Recruiter({
        email: req.body.email,
        name: req.body.name,
        contactNo: req.body.contactNo,
        bio: req.body.bio
    });

    //Adding recruiter profile to DB
    try {
        const savedUser = await user.save();
        res.status(200).send('recruiter profile added!');
    }catch(err) {
        res.status(400).send(err);
    }
});

//applicant
router.post('/applicant', async (req,res) => {

    //Validating if user exists
    const userExists = await User.findOne({email: req.body.email});
    if (!userExists) return res.status(400).send('Register properly dumbass!');

    //validating that profile dosent already exist
    const profileExists = await Applicant.findOne({email: req.body.email});
    if (profileExists)  return res.status(400).send('Bruh,You already have a profile!')

    //Creating recruiter profile    
    const user = new Applicant({
        email: req.body.email,
        name: req.body.name,
        education: req.body.education,
        skills: req.body.skills
    });

    //Adding recruiter profile to DB
    try {
        const savedUser = await user.save();
        res.status(200).send('applicant profile added!');
    }catch(err) {
        res.status(400).send(err);
    }
});

module.exports = router;