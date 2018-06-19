exports.up = function(knex) {
  return knex.schema.table('excluded', function(t) {
    t.renameColumn('id', 'tweet_id')
  })
}

exports.down = function(knex) {
  return knex.schema.table('excluded', function(t) {
    t.renameColumn('tweet_id', 'id')
  })
}
