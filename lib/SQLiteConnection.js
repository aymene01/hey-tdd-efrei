import Connection from './Connection.js';

class SQLiteConnection extends Connection {
  constructor() {
    super('SQLite');
  }
}

export default SQLiteConnection;
