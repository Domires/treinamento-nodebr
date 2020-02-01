const ICrud = require('./interfaces/interfaceCrud')
const Sequelize = require('sequelize')


class Postgres extends ICrud {
    constructor() {
        super()
        this._driver = null
        this._herois = null
    }
    async isConnected() {
        try {
            await this._driver.authenticate()
            return true
        } catch (error) {
            console.log('fail', error)
            return false
        }
    }
    async defineModel() {
        this._herois = this._driver.define('herois', {
            id: {
                type: Sequelize.INTEGER,
                require: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING,
                require: true,
            },
            poder: {
                type: Sequelize.STRING,
                require: true
            }
        }, {
            tableName: 'TB_HEROIS',
            freezeTableName: false,
            timestamps: false
        })
        await this._herois.sync()
    }
    async create(item) {
        const { dataValues } = await this._herois.create(item);
        return dataValues
    }
    async update(id, item) {
        return await this._herois.update(item, { where: { id: id } })
    }
    async delete(id) {
        const query = id ? { id } : {}
        return await this._herois.destroy({ where: query })
    }
    async read(item = {}) {
        return await this._herois.findAll({ where: item, raw: true })
    }
    async connect() {
        this._driver = new Sequelize(
            'heroes',
            'domires',
            '1q2w3e4r',
            {
                host: 'localhost',
                dialect: 'postgres',
                driver: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false
            }
        )
        await this.defineModel()
    }
}

module.exports = Postgres
