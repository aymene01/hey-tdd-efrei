import Message from '../models/Message.js';

export const createMessage = async (req, res) => {
    try {
      const message = await Message.create({ text: req.body.message });
      res.status(201).json({ message });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create message' });
    }
  };
  