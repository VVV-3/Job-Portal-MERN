//Login for User

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const {User} = require('../../models/Users');
const {loginValidation} = require('../../auth/Validation');

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
    res.send('nicu');

});

module.exports = router;