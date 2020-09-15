const router = require('express').Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require('../users/usersModel');

router.post('/register', (req, res) => {
    const user = req.body
    const valid = validateUser(user)

    if (valid) {
        const hash = bcryptjs.hashSync(user.password, 8);
        user.password = hash

        Users.add(user)
            .then(thenRes => {
                const token = makeJwt(thenRes);

                res.status(201).json({ data: thenRes, token });
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({
            message: "Invalid information, plese verify and try again",
        });
    }
})

router.post('/login', (req, res) => {
    const creds = req.body;
    const valid = validateCredentials(creds);

    if (valid) {
        Users.getBy({ username: creds.username })
            .then(([user]) => {
                if (user && bcryptjs.compareSync(creds.password, user.password)) {
                    const token = makeJwt(user);

                    res.status(200).json({
                        token
                    });
                } else {
                    res.status(401).json({ message: "You shall not pass!" });
                }
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({
            message: "Invalid information.",
        });
    }
})

function validateUser(user) {
    return user.username && user.password ? true : false;
}

function validateCredentials(creds) {
    return creds.username && creds.password ? true : false;
}


function makeJwt({ id, username, department }) {
    const payload = {
        username,
        department,
        subject: id,
    };
    const config = {
        jwtSecret: "Zombie Conqueror",
    };
    const options = {
        expiresIn: "1d",
    };

    return jwt.sign(payload, config.jwtSecret, options);
}


module.exports = router