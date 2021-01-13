//skill operations

const router = require('express').Router();
//const verify = require('../../../auth/TokenValidation');
const Skill = require('../../../models/Skill');

//find all skills
router.get('/find', async (req,res) => {
    try {
        const skills = await Skill.find();
        res.status(200).json(skills);
    } catch (error) {
        res.status(400).send(error);
    };
});

//add new skill
router.post('/add', async (req,res) => {
    const skill = new Skill({
        name: req.body.name
    });
    
    //adding to DB
    try {
        const saveSkill = await skill.save();
        res.status(200).json(saveSkill);
    }catch(err) {
        res.status(400).send(err);
    }
});

module.exports = router;