module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: "5432",
    ssl: true,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    },
  },
  test: {
    username: process.env.DB_USERNAME_TEST,
    password: process.env.DB_PASSWORD_TEST,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST_TEST,
    dialect: "postgres",
    port: "5432",
    ssl: true,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    },
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: "5432",
    ssl: true,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    },
  }
}