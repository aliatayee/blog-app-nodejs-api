const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

//Register
router.post("/register", async (req, res) => {
    try {
        // Get user input
        const { username, email, password } = req.body;
        if (!(email && password && username)) {
            res.status(400).send("All input is required");
        }
        const oldEmail = await User.findOne({ email });
        const oldUsername = await User.findOne({ username });
        if (oldEmail) {
            return res.status(409).send(`${email} already exist`);
        }
        if (oldUsername) {
            return res.status(409).send(`${username} already exist`);
        }
        encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });
        // Create token
        const token = jwt.sign({ user_id: user._id, email }, 'secret', { expiresIn: "2h", });
        const data = { ...user._doc }
        data.token = token;
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
    }

});

// Login
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        // Validate user input
        if (!(username && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ username });
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign({ user_id: user._id, email: user._email }, 'secret', { expiresIn: "2h", });
            const data = { ...user._doc }
            data.token = token;
            res.status(200).json(data);
        } else {
            res.status(400).send("Invalid Credentials");
        }

    } catch (err) {
        console.log(err);
    }
})
module.exports = router; 