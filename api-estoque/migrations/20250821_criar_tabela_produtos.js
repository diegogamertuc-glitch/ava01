// migrations/20250821_criar_tabela_produtos.js
exports.up = async function (knex) {
  const existe = await knex.schema.hasTable('produtos');
  if (!existe) {
    await knex.schema.createTable('produtos', (table) => {
      table.increments('id').primary();
      table.string('nome').notNullable();
      table.integer('quantidade').notNullable();
      table.float('preco').notNullable();
      table.timestamps(true, true); // created_at / updated_at (opcional)
    });
  }
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('produtos');
};
