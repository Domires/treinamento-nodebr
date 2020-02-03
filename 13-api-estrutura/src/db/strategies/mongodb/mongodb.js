const ICrud = require('../interfaces/interfaceCrud')
const mongoose = require('mongoose')

class MongoDB extends ICrud {
    constructor(connection, schema) {
        super()
        this._schema = schema
        this._connection = connection
    }
    async isConnected() {
        const state = this._connection.readyState
        // if (state == 1) return 'conectado'
        // if (state == 2) {
        //     await new Promise(resolve => setTimeout(resolve, 100))
        // }
        if (state == 0 || state == 3) return false
        return 'conectado'
    }
    // defineModel() {
    //     const heroiSchema = new mongoose.Schema({
    //         nome: {
    //             type: String,
    //             require: true
    //         },
    //         poder: {
    //             type: String,
    //             require: true
    //         },
    //         insertedAt: {
    //             type: Date,
    //             default: new Date()
    //         }
    //     })
    //     this._schema = mongoose.model('heroi', heroiSchema)
    // }
    static connect() {
        const mongoose = require('mongoose')
        mongoose.connect('mongodb://domires:1q2w3e4r@localhost:27017/herois',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            function (err) {
                if (!err) return
                console.log('Erro na conexão', err)
            }
        )
        const connection = mongoose.connection
        connection.once('open', () => console.log('Database rodando...'))
        return connection;
    }
    create(item) {
        return this._schema.create(item)
    }
    read(item, skip = 0, limit = 10) {
        return this._schema.find(item).skip(skip).limit(limit)
    }
    update(id, item) {
        return this._schema.updateOne({ _id: id }, { $set: item })
    }
    delete(id) {
        return this._schema.deleteOne({ _id: id })
    }
}

module.exports = MongoDB
