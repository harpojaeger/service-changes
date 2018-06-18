require ('dotenv').config()
const {
  PROD_DATABASE_URL,
  STAGE_DATABASE_URL,
  DEV_DATABASE_URL
} = process.env

// dev defaults to sqlite3
const development = DEV_DATABASE_URL ? {
  client: 'postgresql',
  connection: DEV_DATABASE_URL,
} : {
  client: 'sqlite3',
  connection: {filename: './dev.sqlite3'},
  useNullAsDefault: true
}
const production = {
  client: 'postgresql',
  connection: PROD_DATABASE_URL
}
// staging inherits production settings if not set explicitly
const staging = STAGE_DATABASE_URL ? {
  client: 'postgresql',
  connection: STAGE_DATABASE_URL
} : Object.assign({}, production)

module.exports = {development, production, staging}
