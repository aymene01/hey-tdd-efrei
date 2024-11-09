class EmailStrategy {
    constructor() {
      this.type = 'Email';
    }
  
    send(message) {
      console.log(`Email sent: ${message}`);
      return `Email sent: ${message}`;
    }
  }
  
  export default EmailStrategy;
  