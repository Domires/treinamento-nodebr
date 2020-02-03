const mongoose = require('mongoose')

const heroiSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    poder: {
        type: String,
        require: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})
module.exports = mongoose.model('heroi', heroiSchema)