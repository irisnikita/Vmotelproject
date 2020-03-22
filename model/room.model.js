// Libraries
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let room = new Schema({
    nameRoom: {
        type: String
    },
    price: {
        type: Number
    },
    amountPeople: {
        type: Number
    },
    nameLeader: {
        type: String
    },
    phone: {
        type: String
    },
    time: {
        timeContract: Number,
        timeStart: Date,
        timeEnd: Date
    },
    deposit: Number,
    owe: Number,
    water: {
        type: Number
    },
    electric: {
        type: Number
    },
    netWork: Number
})

module.exports = mongoose.model('room', room, 'room');
