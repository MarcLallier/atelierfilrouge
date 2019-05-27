const mysql = require('mysql')
const connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'guette mon oid',
  database : 'wilder'
})

module.exports = connection
