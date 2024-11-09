class SMSStrategy {
    constructor() {
      this.type = 'SMS';
    }
  
    send(message) {
      console.log(`SMS sent: ${message}`);
      return `SMS sent: ${message}`;
    }
  }
  
  export default SMSStrategy;
  