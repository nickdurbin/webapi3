module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './api/data/blog.db3',
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    migrations: {
      directory: './api/data/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './api/data/seeds',
    },
  },
};
