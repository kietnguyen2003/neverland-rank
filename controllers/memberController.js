const Male = require('../models/Male')
const Female = require('../models/Female')

exports.createMember = async (req, res) => {
    try {
        const fileData = req.file;
        const member = req.body;
        if(!fileData){
            return res.status(400).json({
                status: 'fail',
                msg: 'Please choose your Avatar'
            });
        }
        member.Img = fileData.path;
        member.fielName = fileData.filename;
        let createdMember;

        if(!member.gender){
            return res.status(400).json({
                status: 'fail',
                msg: 'Please choose your gender'
            });
        }

        if (member.gender == 'male') {
            createdMember = await Male.create(member);
        } else if (member.gender == 'female') {
            createdMember = await Female.create(member);
        }

        await createdMember.save();

        res.redirect('/home')
        
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err.message
        });
    }
};


exports.getMemberMale = async (req, res) => {
    try {
        const members = await Male.find();
        res.status(200).json({
            status: 'success',
            members
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err.message
        });
    }
}

exports.getMemberFemale = async (req, res) => {
    try {
        const members = await Female.find();
        res.status(200).json({
            status: 'success',
            members
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err.message
        });
    }
}
