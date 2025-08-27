// knexfile.js
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      // pode usar outro nome; este é o arquivo do banco
      filename: './estoque.sqlite3'
    },
    migrations: {
      directory: './migrations'
    },
    useNullAsDefault: true
  }
};
