exports.up = function(knex) {
  return knex.schema.createTable('excluded', function(t) {
    t.string('id').primary().notNull()
    t.string('reason').notNull()
    t.string('detail').nullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('excluded')
}
