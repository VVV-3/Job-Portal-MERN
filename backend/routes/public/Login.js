//Login for User

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const {loginValidation} = require('../../auth/DetailsValidation');

router.post('/', async (req,res) => {
    //Validation
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if user dosent exist
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('User does not exist exist in DB, please register');

    //Checking password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid Password!');

    //Create and send JSON web token
    const token = await jwt.sign({_id: user._id, jobType: user.jobType}, 'DASSsucc', { expiresIn: '1800s' });
    res.header('session-token', token).send(token);

});

module.exports = router;