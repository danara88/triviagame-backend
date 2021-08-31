const express = require('express');
const cors = require('cors');
const { connectDB } = require('../db/config');

class Server {

  constructor(  ) {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      
    };

    this.dbConnection();

    this.middlewares();

    this.routes();
  }

  async dbConnection() {
    await connectDB();
  }

  middlewares() {
    this.app.use( express.json() );
    this.app.use(cors());
  }

  routes() {

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running at ', this.port);
    });
  }

}

module.exports = Server;
