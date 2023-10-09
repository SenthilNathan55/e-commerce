const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Senthil!555',
  database: 'ecommerce'
})

module.exports=connection;