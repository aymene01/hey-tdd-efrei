import EmailStrategy from '../strategies/EmailStrategy.js';
import SMSStrategy from '../strategies/SMSStrategy.js';

class User {
  constructor(name) {
    this.name = name;
    this.notificationStrategy = new EmailStrategy(); // Default strategy
    this.notificationStrategies = [this.notificationStrategy];
  }

  update(message) {
    this.notificationStrategies.forEach(strategy => {
      try {
        strategy.send(message);
      } catch (error) {
        console.error(`Failed to send notification: ${error.message}`);
      }
    });
  }

  setNotificationStrategy(type) {
    switch(type) {
      case 'Email':
        this.notificationStrategy = new EmailStrategy();
        break;
      case 'SMS':
        this.notificationStrategy = new SMSStrategy();
        break;
      default:
        throw new Error('Unknown notification strategy');
    }
    this.notificationStrategies = [this.notificationStrategy];
  }

  setNotificationStrategyInstance(strategy) {
    this.notificationStrategy = strategy;
    this.notificationStrategies = [strategy];
  }

  setNotificationStrategies(types) {
    this.notificationStrategies = types.map(type => {
      if (type === 'Email') return new EmailStrategy();
      if (type === 'SMS') return new SMSStrategy();
      throw new Error('Unknown notification strategy');
    });
  }
}

export default User;
