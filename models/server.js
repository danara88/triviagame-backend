const express = require('express');
const cors = require('cors');

class Server {

  constructor(  ) {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      
    };

    // middlewares, se ejecutan antes de llegar a las rutas
    this.middlewares();

    // rutas
    this.routes();
  }

  async connectDB() {
    await dbConnection();
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
