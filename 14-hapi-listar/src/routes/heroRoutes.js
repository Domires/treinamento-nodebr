const BaseRoute = require('./base/baseRoute')

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            handler: (request, headers) => {
                try {
                    const { skip, limit, nome } = request.query

                    let query = {}
                    if(nome) {
                        query.nome = nome
                    }
                    if(isNaN(skip) || isNaN(limit)) {
                        throw Error('Tipo incorreto')
                    }

                    return this.db.read({ nome: nome }, Number(skip), Number(limit))
                } catch (error) {
                    console.log('ERRO', error)
                    return 'Erro no servidor'
                }
            }
        }
    }
}

module.exports = HeroRoutes