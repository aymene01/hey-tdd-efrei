class NotificationSystem {
    constructor() {
      this.subscribers = [];
    }
  
    subscribe(user) {
      this.subscribers.push(user);
    }
  
    unsubscribe(user) {
      this.subscribers = this.subscribers.filter(subscriber => subscriber !== user);
    }
  
    notifyAll(message) {
      this.subscribers.forEach(subscriber => subscriber.update(message));
    }
  }
  
  export default NotificationSystem;
  