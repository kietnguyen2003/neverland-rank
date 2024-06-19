const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: 'src/config.env'});

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connect to database success to NeverlandRank');
    } catch (err) {
        console.error('Connect failure:');
    }
}

module.exports = { connect };
