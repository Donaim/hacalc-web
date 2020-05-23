
/*
  Define these ENV variables:

  PGHOST='localhost'
  PGUSER=process.env.USER
  PGDATABASE=process.env.USER
  PGPASSWORD=null
  PGPORT=5432

 */

const { Client } = require('pg')

async function try_connect_resolved(callback) {
    const client = new Client();

    await client.connect().catch(err => callback(err));

    const result = await client.query('SELECT NOW()').catch(err => callback(err));

    callback(null);

    client.end();
}

function try_connect() {
    return new Promise(try_connect_resolved);
}

exports.try_connect = try_connect;

