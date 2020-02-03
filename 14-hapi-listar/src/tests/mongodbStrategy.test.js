const assert = require('assert')
const Mongodb = require('./../db/strategies/mongodb/mongodb')
const HeroiSchema = require('./../db/strategies/mongodb/schemas/heroisSchema')
const Context = require('./../db/strategies/base/contextStrategy')

const MOCK_HEROI_CADASTRAR = {
    nome: 'Batman',
    poder: 'Dinheiro'
}
const MOCK_HEROI_DEFAULT = {
    nome: `Spider Man ${Date.now()}`,
    poder: 'Teia'
}
const MOCK_HEROI_ATUALIZAR = {
    nome: `Patolino ${Date.now()}`,
    poder: 'Velocidade'
}
let MOCK_HEROI_ID = ''
let context = {}
describe('MongoDB Suite de testes', function () {
    this.beforeAll(async function () {
        const connection = Mongodb.connect()
        context = new Context(new Mongodb(connection, HeroiSchema))
        await context.create(MOCK_HEROI_DEFAULT)
        const result = await context.create(MOCK_HEROI_ATUALIZAR)
        MOCK_HEROI_ID = result._id
    })
    it('verificar conexão', async () => {
        const result = await context.isConnected()
        const expected = 'conectado'
        assert.deepEqual(result, expected)
    })
    it('cadastrar', async () => {
        const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)
        assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR)
    })
    it('listar', async () => {
        const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI_DEFAULT.nome })
        const result = { nome, poder }
        assert.deepEqual(result, MOCK_HEROI_DEFAULT)
    })
    it('update', async () => {
        const result = await context.update(MOCK_HEROI_ID, {
            nome: 'Pernalonga'
        })
        assert.deepEqual(result.nModified, 1)
    })
    it('remover', async () => {
        const result = await context.delete(MOCK_HEROI_ID)
        assert.deepEqual(result.n, 1)
    })
})