// sudo docker ps
// sudo docker exec -it 227c0d747e43 mongo -u domires -p 1q2w3e4r --authenticationDatabase herois

// // databases
// show dbs

// // mudando o contexto para uma database específica
// use herois

// // mostrar coleções de documentos
// show colections

db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

db.herois.find()
db.herois.find().pretty()

for (let i = 0; i <= 100; i++) {
    db.herois.insert({
        nome: `Clone-${i}`,
        poder: 'Velocidade',
        dataNascimento: '1998-01-01'
    })
}

db.herois.count()
db.herois.findOne()
db.herois.find().limit(10).sort({ nome: -1 })
db.herois.find({}, { poder: 1, _id: 0 })

// create
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

// read
db.herois.find()

// update
db.herois.update({ _id: ObjectId("5e347a4f531282017debdf73") }, { nome: 'Batman' })
db.herois.update({ _id: ObjectId("5e347b65531282017debdf86") }, { $set: { nome: 'Robin' } })

// delete
db.herois.remove({})