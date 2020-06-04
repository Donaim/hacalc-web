
/*
  Define these ENV variables:

  PGHOST='localhost'
  PGUSER=process.env.USER
  PGDATABASE=process.env.USER
  PGPASSWORD=null
  PGPORT=5432

 */

const { Client } = require('pg');

const SHARE_TABLE_NAME = 'hacalcschema.share';

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

async function initialize_client() {
    async function callback(resolve, reject) {
        const client = new Client();

        await client.connect().catch(err => reject(err));
        resolve(client);
    }
    return new Promise(callback);
}

async function get_key_value(client, key) {
    const q = `SELECT value FROM ${SHARE_TABLE_NAME} WHERE id = '${key}'`;
    async function callback(resolve, reject) {
        const response = await client.query(q);
        console.log('response:', response);
        if (response.rows.length !== 1) {
            reject('bad key');
        } else {
            const result = response.rows[0].value;
            resolve(result);
        }
    }
    return new Promise(callback);
}

async function save_key_value(client, key, value) {
    const q = `INSERT INTO ${SHARE_TABLE_NAME} VALUES ('${key}', '${value}')`;
    async function callback(resolve, reject) {
        const response = await client.query(q).catch(err => reject(err));
        resolve(response);
    }
    return new Promise(callback);
}

exports.try_connect = try_connect;
exports.save_key_value = save_key_value;
exports.get_key_value = get_key_value;
exports.initialize_client = initialize_client;

