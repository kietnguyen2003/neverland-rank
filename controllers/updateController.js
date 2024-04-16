const Male = require('../models/Male')
const Female = require('../models/Female')
const cloudinary = require('cloudinary');

exports.updateMalePage = async (req, res) => {
    try {
        res.redirect('/male');
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err.message
        });
    }
}

exports.updateFemalePage = async (req, res) => {
    try {
        res.redirect('/female');
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err.message
        });
    }
}

exports.doneUpdate = async (req, res) => {
    try {
        const data = req.body.data;
        const gender = req.body.gender;
        var males = await Male.find();
        var females = await Female.find();
        if (gender == 'males') {
            for (const male of males) {
                // Lấy thông tin từ data tương ứng với male
                const updatedInfo = data.find(item => item.Name.toString() == male.Name.toString());

                if (updatedInfo) {
                    // Cập nhật các trường mong muốn, ví dụ:
                    male.Win = updatedInfo.Win;
                    male.Lose = updatedInfo.Lose;
                    male.SD = updatedInfo.SD;
                    male.W15 = updatedInfo.W15;
                    male.L15 = updatedInfo.L15;
                }
                await male.save();
            }
        } else {
            for (const female of females) {
                // Lấy thông tin từ data tương ứng với male
                const updatedInfo = data.find(item => item.Name.toString() == female.Name.toString());

                if (updatedInfo) {
                    // Cập nhật các trường mong muốn, ví dụ:
                    female.Win = updatedInfo.Win;
                    female.Lose = updatedInfo.Lose;
                    female.SD = updatedInfo.SD;
                    female.W15 = updatedInfo.W15;
                    female.L15 = updatedInfo.L15;
                }
                await female.save();
            }
        }

        res.status(200).json({
            status: 'success',
            msg: 'Cập nhật thành công, bấm vào logo để quay lại trang chủ'
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err.message
        });
    }
}

exports.deleteMember = async (req, res) => {
    try {
        const gender = req.body.id;
        const memberName = req.body.name;
        console.log(req.body)
        if (gender == 'females') {
            const female = await Female.findOne({ Name: memberName });
            if (female) {
                await female.deleteOne(); // or female.deleteOne();
                // Xóa Img trên cloundinary
                await cloudinary.uploader.destroy(female.Img);
                return res.status(200).json({
                    status: 'success',
                    msg: 'Xóa thành viên thành công, bấm vào logo để quay lại trang chủ'
                });
            }
        }
        else if (gender == 'males') {
            const male = await Male.findOne({ Name: memberName });

            if (male) {
                await male.deleteOne(); // or female.deleteOne();
                await cloudinary.uploader.destroy(male.Img);
                return res.status(200).json({
                    status: 'success',
                    msg: 'Xóa thành viên thành công, bấm vào logo để quay lại trang chủ'
                });
            }
        } else {
            return res.status(200).json({
                status: 'fail',
                msg: 'Không hỗ trợ giới tính khác'
            });
        }
    } catch (error) {
        return res.status(200).json({
            status: 'fail',
            msg: error.message
        });
    }
};

