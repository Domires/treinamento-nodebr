const assert = require('assert')
const Postgres = require('./../db/strategies/postgres/postgres')
const HeroiSchema = require('./../db/strategies/postgres/schemas/heroiSchema')
const Context = require('./../db/strategies/base/contextStrategy')

const MOCK_HEROI_CADASTRAR = {
    nome: 'Gaviao Negro',
    poder: 'flexas'
}
const MOCK_HEROI_ATUALIZAR = {
    nome: 'Batman',
    poder: 'dinheiro'
}

let context = {}
describe.only('Postgres Strategy', async function () {
    this.timeout(Infinity)
    this.beforeAll(async function () {
        const connection = await Postgres.connect()
        const model = await Postgres.defineModel(connection, HeroiSchema)
        context = new Context(new Postgres(connection, model))
        await context.delete()
        await context.create(MOCK_HEROI_ATUALIZAR)
    })
    it('PostgresSQL Connection', async function () {
        const result = await context.isConnected()
        assert.equal(result, true)
    })
    it('cadastrar', async function () {
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id
        console.log('result', result)
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    it('listar', async function () {
        const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    it('atualizar', async () => {
        const [result] = await context.read({})
        const novoItem = {
            ...MOCK_HEROI_CADASTRAR,
            nome: 'Mulher Maravilha'
        }
        const [update] = await context.update(result.id, novoItem)
        assert.deepEqual(update, 1)
    });
    it('remover por id', async function () {
        const [item] = await context.read({})
        const result = await context.delete(item.id)
        assert.deepEqual(result, 1)
    })
})