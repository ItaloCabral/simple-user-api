const mongoose = require('mongoose');

class Connection {

  constructor() {
    this.connect();
  }

  connect() {
    mongoose.connect('mongodb://localhost:27017/simple-user-api', {})
      .then(() => {
        console.log('Connected to database');
      })
      .catch((err: string|object) => {
        console.log('Error connecting to database', err);
      });
  }

}

module.exports = new Connection();
