const router = require('express').Router();
const {User} = require('../../models/Users')

router.post('/', async (req,res) => {
    const user = new User({
        jobType: req.body.jobType,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        console.log('A user has been added!');
        res.status(200).send(savedUser);
    }catch(err) {
        res.status(400).send(err);
    }
});

module.exports = router;