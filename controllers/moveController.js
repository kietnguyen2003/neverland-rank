const Male = require('../models/Male.js')
const Female = require('../models/Female.js')


exports.getHome = async (req, res) => {
    const [malesData, femalesData] = await Promise.all([Male.find(), Female.find()]);
    const males = malesData.map(male => ({ ...male.toObject(), PTS: male.Win + male.W15*2 }));
    const females = femalesData.map(female => ({ ...female.toObject(), PTS: female.Win + female.W15*2 }));
    males.sort((a, b) => b.PTS - a.PTS);
    females.sort((a, b) => b.PTS - a.PTS);
    res.render('home', {
        males,
        females
    });
}

exports.getMalePage = async (req, res) => {
    const [malesData, femalesData] = await Promise.all([Male.find(), Female.find()]);
    const males = malesData.map(male => ({ ...male.toObject(), PTS: male.Win + male.W15*2 }));
    const females = femalesData.map(female => ({ ...female.toObject(), PTS: female.Win + female.W15*2 }));
    males.sort((a, b) => b.PTS - a.PTS);
    females.sort((a, b) => b.PTS - a.PTS);
    res.render('maleUpdate', {
        males,
        females
    });
}

exports.getFemalePage = async (req, res) => {
    const [malesData, femalesData] = await Promise.all([Male.find(), Female.find()]);
    const males = malesData.map(male => ({ ...male.toObject(), PTS: male.Win + male.W15*2 }));
    const females = femalesData.map(female => ({ ...female.toObject(), PTS: female.Win + female.W15*2 }));
    males.sort((a, b) => b.PTS - a.PTS);
    females.sort((a, b) => b.PTS - a.PTS);
    res.render('femaleUpdate', {
        males,
        females
    });
}