const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const FemalesSchema = new Schema({
    Name:{
        type: String,
        default: ' '
    },
    Played:{
        type: Number,
        default: 0
    },
    Win:{
        type: Number,
        default: 0
    },
    Lose:{
        type: Number,
        default: 0
    },
    SD:{
        type: Number,
        default: 0
    },
    W15:{
        type: Number,
        default: 0
    },
    L15:{
        type: Number,
        default: 0
    },
    Img:{
        type: String,
        default: ''
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
})
const Female = mongoose.model('Female', FemalesSchema);

module.exports = Female;
