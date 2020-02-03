const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            config: {
                validate: {
                    failAction: (req, headers, erro) => {
                        throw erro
                    },
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    }
                }
            },
            handler: (request, headers) => {
                try {
                    const { skip, limit, nome } = request.query

                    return this.db.read({ nome: nome }, skip, limit)
                } catch (error) {
                    console.log('ERRO', error)
                    return 'Erro no servidor'
                }
            }
        }
    }

    create() {
        return {
            path: '/herois',
            method: 'POST',
            handler: (request, headers) => {
                const payload = request.payload
                return this.db.create(payload)
            }
        }
    }
}

module.exports = HeroRoutes