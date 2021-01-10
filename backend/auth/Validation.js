const Joi = require('joi');

//RegistrationValidation
const registerValidation = (data) => {
    const schema = Joi.object({
        jobType: Joi.string()
        .equal('applicant','recruiter')
        .required(),
        email: Joi.string()
        .email()
        .required(),
        password: Joi.string()
        .min(8)
        .required(),
    });
    return schema.validate(data);
};
module.exports.registerValidation = registerValidation;

//LoginValidation
const loginValidation = (data) => {
    const schema = Joi.object({
        jobType: Joi.string()
        .equal('applicant','recruiter')
        .required(),
        email: Joi.string()
        .email()
        .required(),
        password: Joi.string()
        .min(8)
        .required(),
    });
    return schema.validate(data);
};
module.exports.loginValidation = loginValidation;