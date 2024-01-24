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
                if (!isTaken) {
                    res.status(200).json({
                        status: "fail",
                        msg: "Account not found",
                    });
                }
                bcrypt.compare(user.Password, isTaken.Password, async function (err, result) {
                    if (result) {
                        const [malesData, femalesData] = await Promise.all([Male.find(), Female.find()]);
                        const males = malesData.map(male => ({ ...male.toObject(), PTS: male.Win + male.W15 * 2 }));
                        const females = femalesData.map(female => ({ ...female.toObject(), PTS: female.Win + female.W15 * 2 }));
                        males.sort((a, b) => b.PTS - a.PTS); // Sắp xếp lại mảng females theo trường PTS giảm dần
                        females.sort((a, b) => b.PTS - a.PTS); // Sắp xếp lại mảng females theo trường PTS giảm dần
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

        res.status(200).json({
            status: 'success'
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            msg: err.message
        })
    }

}
