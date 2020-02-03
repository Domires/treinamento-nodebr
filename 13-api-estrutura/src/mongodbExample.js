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

// setTimeout(() => {
    // const state = connection.readyState
    // console.log('state', state)
// }, 1000)
// 0 disconectado
// 1 conectado
// 2 conctando
// disconectando

const heroiSchema = mongoose.Schema({
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
const model = mongoose.model('heroi', heroiSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'dinheiro'
    })
    console.log('result cadastrar', resultCadastrar)

    const listItem = await model.find()
    console.log('itens', listItem)
}
main()

