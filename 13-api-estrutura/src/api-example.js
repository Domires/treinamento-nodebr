const Hapi = require('hapi');
const Context = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')

const app = Hapi.Server({
    port: 4000
})

async function main() {
    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection, HeroiSchema))
    app.route([
        {
            path: '/herois',
            method: 'GET',
            handler: (require, response) => {
                return context.read()
            }
        }
    ])
    
    await app.start()
    console.log('servidor rodando na porta 4000')
}
main()