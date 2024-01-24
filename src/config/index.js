const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Neverland');
        console.log('Connect to database success');
    } catch (err) {
        console.error('Connect failure:');
    }
}

module.exports = { connect };
