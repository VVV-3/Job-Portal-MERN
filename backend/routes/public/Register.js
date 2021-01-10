//Registering a User

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const {User} = require('../../models/Users');
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

module.exports = router;