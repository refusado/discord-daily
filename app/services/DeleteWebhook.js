import WebhookRepository from '../repositories/WebhookRepository.js';

export default class DeleteWebhook {
  async execute(content) {
    if (content == null)
      throw new Error('Invalid content value.');

    if (typeof content === 'number')
      return await WebhookRepository.removeById(content);

    if (typeof content === 'string')
      return await WebhookRepository.remove(content);

    if (typeof content === 'object') {
      if (content.hasOwnProperty('id'))
        return await WebhookRepository.removeById(content.id);
      
      if (content.hasOwnProperty('url'))
        return await WebhookRepository.remove(content.url);
    }

    throw new Error('Invalid content format. Pass a string or an object with a "url" or "id" property.');
  }
}