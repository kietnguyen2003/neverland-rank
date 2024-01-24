const Male = require('../models/Male')
const Female = require('../models/Female')

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



