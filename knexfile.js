require ('dotenv').config()
const {DATABASE_URL} = process.env

// dev defaults to sqlite3
const development = DATABASE_URL ? {
  client: 'postgresql',
  connection: DATABASE_URL,
} : {
  client: 'sqlite3',
  connection: {filename: './dev.sqlite3'},
  useNullAsDefault: true
}
const pg = {
  client: 'postgresql',
  connection: DATABASE_URL
}

module.exports = {development, production: pg, staging: pg}
