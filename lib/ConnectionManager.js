import MySQLConnection from './MySQLConnection.js';
import PostgreSQLConnection from './PostgreSQLConnection.js';
import SQLiteConnection from './SQLiteConnection.js';

class ConnectionManager {
  constructor() {
    if (ConnectionManager.instance) {
      throw new Error('ConnectionManager is a singleton class and cannot be instantiated directly.');
    }
    this.connections = [];
    ConnectionManager.instance = this;
  }

  static getInstance() {
    if (!ConnectionManager.instance) {
      ConnectionManager.instance = new ConnectionManager();
    }
    return ConnectionManager.instance;
  }

  createConnection(type) {
    let connection;
    switch (type) {
      case 'MySQL':
        connection = new MySQLConnection();
        break;
      case 'PostgreSQL':
        connection = new PostgreSQLConnection();
        break;
      case 'SQLite':
        connection = new SQLiteConnection();
        break;
      default:
        throw new Error(`Unknown connection type: ${type}`);
    }
    this.connections.push(connection);
    return connection;
  }

  closeConnection(connection) {
    connection.disconnect();
  }

  getActiveConnections() {
    return this.connections.filter(conn => conn.isConnected);
  }
}

export default ConnectionManager;
