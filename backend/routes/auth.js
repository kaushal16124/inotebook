const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = "bhdjsdakdgadadadwaudaudzkjc" //secret key used to generate authentication token
var fetchuser = require('../middleware/fetchuser')

// ROUTE 1 : Endpoint to create a user /api/auth/createuser. No login required.
router.post('/createuser', [
    body('name').isLength({ min: 5 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    let success=false;
    //Error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send({ success,errors: errors.array() });
    }

    //Check unique email
    try {

        //await - Wait for promise to be resolved as it is inside an async function.
        // First let the code find if the user already exists (in this case)
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success,error: "Duplicate user" })
        }
        //encrypting password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });

        //parameter to be passed for generating authtoken
        const data = {
            user: {
                id: user.id
            }
        }
        //token to verify a user session
        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true
        res.json({ success,authtoken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured!")
    }

    // .then(user => res.json(user)).catch(err=> {console.log(err)
    // res.json({error :'Please enter unique value'})
    // });


})

// ROUTE 2 : Endpoint to authenticate a user /api/auth/createuser
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    let success=false;
    //Error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success=false
            return res.status(400).json({ error: "Invalid credentials. Kindly check and re-try" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success=false
            return res.status(400).json({ success,error: "Invalid credentials. Kindly check and re-try" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({ success,authtoken })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured!")
    }

})

// ROUTE 3 : Endpoint to get user details of the authenticated user /api/auth/getuser Login required

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured!")
    }

})

module.exports = router