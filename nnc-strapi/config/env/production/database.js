module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'mysql',
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'nnc'),
        username: env('DATABASE_USERNAME', 'nncpi'),
        password: env('DATABASE_PASSWORD', 'nncboxrhino345#'),
      },
      options: {},
    },
  },
});
