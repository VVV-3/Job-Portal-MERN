//skill operations

const router = require('express').Router();
//const verify = require('../../auth/TokenValidation');
const Skill = require('../../models/Skill');

//add new skill
router.post('/add', async (req,res) => {
    console.log(req.body.name);
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

//find all skills
router.get('/find', async (req,res) => {
    try {
        const skills = await Skill.find(req.query);
        res.status(200).json(skills);
    } catch (error) {
        res.status(400).send(error);
    };
});

//edit a skill
router.post('/edit/:id',async (req,res) => {
    try {
        const skills = await Skill.findOneAndUpdate(req.params.id, { $set: req.body }, {new: true});
        res.status(200).json(skills);
    } catch (error) {
        res.status(400).send(error);
    };
})

module.exports = router;