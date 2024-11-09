import Connection from './Connection.js';

class MySQLConnection extends Connection {
  constructor() {
    super('MySQL');
  }
}

export default MySQLConnection;
