import knex from 'knex'
import config from '../config/config.js'


// const mysqlClient = knex(config.mysql)

// mysqlClient.schema.dropTableIfExists('productos')

// mysqlClient.schema.createTable('productos', table => {
//     table.increments('id')
//     table.string('name')
//     table.integer('price')
//     table.string('url')
// })
//     .then( () => console.log('tabla productos creada con éxito'))
//     .catch((err) => {console.log(err); throw err})
//     .finally(() => {
//         mysqlClient.destroy
//     })



//-----------------------------------
// Crear tabla en SQLite3


try {
    const sqliteClient = knex(config.sqlite3)
    await sqliteClient.schema.createTable('mensajes', table => {
        table.string('email')
        table.string('text')
        console.log('Tabla Sqlite creada')
        sqliteClient.destroy

    })
    
} catch (error) {
    throw error
}
