const express = require('express');
const app = express();
const mongoose = require('mongoose');


//Connecting to MongoBD
const uri = 'mongodb+srv://user123:user123@cluster0.6a9ks.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true } ,() => console.log('Connected to DB!'));


//Creating Routes

//Public
const registerRoute = require('./routes/public/Register');
const loginRoute = require('./routes/public/Login');

//Private
const applicantRoute = require('./routes/private/Applicant');
const applicationRoute = require('./routes/private/Application');
const jobOpeningRoute = require('./routes/private/JobOpening');
const recruiterRoute = require('./routes/private/Recruiter');
const skillRoute = require('./routes/private/Skill');

// //Applicant
// const applicantProfileRoute = require('./routes/private/applicant/Profile');
// const applicantJobOpeningRoute = require('./routes/private/applicant/JobOpening');
// const applicantApplicationRoute = require('./routes/private/applicant/Application');
// const applicantSkillRoute =  require('./routes/private/applicant/Skill');

// //Recruiter
// const recruiterProfileRoute = require('./routes/private/recruiter/Profile');
// const recruiterJobOpeningRoute = require('./routes/private/recruiter/JobOpening');
// const recruiterApplicantRoute = require('./routes/private/recruiter/Application');
// const recruiterRatingRoute = require('./routes/private/recruiter/Rating');


//Middlewares
app.use(express.json());


//Route Middlewares

//Public
app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);

//Private
app.use('/api/applicant', applicantRoute);
app.use('/api/application', applicationRoute);
app.use('/api/jobOpening', jobOpeningRoute);
app.use('/api/recruiter', recruiterRoute);
app.use('/api/skill', skillRoute);


// //Applicant
// app.use('/api/applicant/profile', applicantProfileRoute);
// app.use('/api/applicant/jobOpening', applicantJobOpeningRoute);
// app.use('/api/applicant/application', applicantApplicationRoute);
// app.use('/api/applicant/skill', applicantSkillRoute);

// //Recruiter
// app.use('/api/recruiter/profile',recruiterProfileRoute);
// app.use('/api/recruiter/jobOpening', recruiterJobOpeningRoute);
// app.use('/api/recruiter/applicant',recruiterApplicantRoute);
// app.use('/api/recruiter/rating', recruiterRatingRoute);

app.listen(5000, () => console.log('Connected to Port 5000 successfully!'));