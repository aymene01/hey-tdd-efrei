class Connection {
    constructor(type) {
      this.type = type;
      this.isConnected = false;
    }
  
    connect() {
      this.isConnected = true;
    }
  
    disconnect() {
      this.isConnected = false;
    }
  
    query(sql) {
      return `Executed query on ${this.type}: ${sql}`;
    }
  }
  
  export default Connection;
  