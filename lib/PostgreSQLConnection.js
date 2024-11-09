import Connection from './Connection.js';

class PostgreSQLConnection extends Connection {
  constructor() {
    super('PostgreSQL');
  }
}

export default PostgreSQLConnection;
