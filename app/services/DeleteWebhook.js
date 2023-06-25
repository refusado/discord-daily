import WebhookRepository from '../repositories/WebhookRepository.js';

export default class DeleteWebhook {
  async execute(content) {
    let id;
    let url;

    if (typeof content == 'number') id = content;
    if (typeof content == 'string') url = content;
    if (typeof content == 'object') {
      if (content.id) id = content.id;
      if (content.url) url = content;
    }

    if (url) return await WebhookRepository.remove(url);
    if (id) return await WebhookRepository.removeById(id);

    throw new Error('Invalid content format. Pass a string or an object with a "url" or "id" property.');
  }
}