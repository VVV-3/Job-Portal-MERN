//Login for User

const router = require('express').Router();
const bcrypt = require('bcryptjs')
const {User} = require('../../models/Users');
const {registerValidation} = require('../../auth/Validation');