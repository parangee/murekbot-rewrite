const knex = require('knex')({
    ...require('./config').database,
    useNullAsDefault: true
})


knex.schema.hasTable('guilds').then(res => {
    if (!res) {
        knex.schema.createTable('guilds', t => {
            t.string('id').notNullable().primary()
            t.json('commands').notNullable().defaultTo('[]')
        }).then(() => {
            console.log('migration complete')
        })
    }
    knex.destroy()
})


