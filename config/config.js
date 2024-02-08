const dotenv = require("dotenv");

// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();

// const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

module.exports = {
  config: {
    mongo: {
      url: process.env.MONGO_URL,
    },
    server: {
      port: process.env.PORT,
    },
  },
};
