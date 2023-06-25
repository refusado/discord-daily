import WebhookRepository from '../repositories/WebhookRepository.js';

export default class ReadWebhook {
  async execute(content) {
    if (content == null)
      return await WebhookRepository.getAll();

    if (typeof content === 'number')
      return await WebhookRepository.findById(content);

    if (typeof content === 'string')
      return await WebhookRepository.find(content);

    if (typeof content === 'object') {
      if (content.hasOwnProperty('id'))
        return await WebhookRepository.findById(content.id);

      if (content.hasOwnProperty('text'))
        return await WebhookRepository.find(content.text);
    }

    throw new Error('Invalid content format. Pass a string or an object with a "id" or "text" property.');
  }
}