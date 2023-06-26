import MessageRepository from '../repositories/MessageRepository.js';

export default class ReadMessage {
  async execute(content) {
    if (content == null)
      return await MessageRepository.getAll();

    if (typeof content === 'number')
      return await MessageRepository.findById(content);

    if (typeof content === 'string')
      return await MessageRepository.find(content);

    if (typeof content === 'object') {
      if (content.hasOwnProperty('id'))
        return await MessageRepository.findById(content.id);

      if (content.hasOwnProperty('text'))
        return await MessageRepository.find(content.text);
    }

    throw new Error('Invalid content format. Pass a string or an object with a "id" or "text" property.');
  }
}