import { DataTypes } from 'sequelize';
import { sequelize } from './database.js';

const Message = sequelize.define('Message', {
  text: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Message;
