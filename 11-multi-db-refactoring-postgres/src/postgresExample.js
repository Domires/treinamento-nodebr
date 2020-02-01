const Sequelize = require('sequelize')
const driver = new Sequelize(
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

async function main() {
    const Herois = driver.define('herois', {
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
    await Herois.sync()
    await Herois.create({
        nome: 'Lanterna Verde',
        poder: 'Anel'
    })


    const result =  await Herois.findAll({ raw: true })
    console.log('result', result)
}

main()