
/*
  Define these ENV variables:

  PGHOST='localhost'
  PGUSER=process.env.USER
  PGDATABASE=process.env.USER
  PGPASSWORD=null
  PGPORT=5432

 */

const { Client } = require('pg')

function try_connect(callback) {
    const client = new Client();
    client.connect();
    client.query('SELECT NOW()', (err, res) => {
        callback(err);
    });
}

