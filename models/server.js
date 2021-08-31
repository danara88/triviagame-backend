const express = require('express');
const cors = require('cors');
const { connectDB } = require('../db/config');

class Server {

  constructor(  ) {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      user: '/api/users',
      auth: '/api/auth',
      category: '/api/categories',
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
    this.app.use(this.paths.user, require('../routes/user'));
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.category, require('../routes/category'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running at ', this.port);
    });
  }

}

module.exports = Server;
