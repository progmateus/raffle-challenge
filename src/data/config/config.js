module.exports = {
  username: 'admin',
  password: 'admin',
  database: 'database',
  host: 'localhost',
  dialect: "postgres",
  repositoryMode: true,
  define: {
    timestamps: true
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}