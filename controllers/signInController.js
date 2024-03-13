const Male = require('../models/Male')
const Female = require('../models/Female')
const User = require('../models/User')
const bcrypt = require('bcrypt');

exports.signIn = async (req, res) => {
    try {
        const user = req.body;
        const isTaken = await User.findOne({
            "UserName": user.UserName
        });
        console.log(isTaken)
        if (!isTaken) {
            res.redirect('/');
        }
        bcrypt.compare(user.Password, isTaken.Password, async function (err, result) {
            if (result) {
                res.redirect('/home');
            } else {
                res.status(200).json({
                    status: "fail",
                    msg: "Wrong password",
                });
            }
        });

    } catch (err) {
        res.status(400).json({
            status: "fail",
            msg: err.message
        })
    }
}

exports.createUser = async (req, res) => {
    try {
        const user = req.body;
        console.log(user);

        const isTaken = await User.findOne({
            "UserName": user.UserName
        });
        if (isTaken) {
            return res.status(200).json({
                status: "fail",
                msg: "Email is already taken",
            });
        }

        bcrypt.hash(user.Password, 10, async function (err, hash) {
            if (err) {
                return (err);
            }
            await User.create({
                Name: user.Name,
                UserName: user.UserName,
                Email: user.Email,
                Password: hash
            });
        })

        res.redirect('/login');
    } catch (err) {
        res.status(400).json({
            status: "fail",
            msg: err.message
        })
    }

}
