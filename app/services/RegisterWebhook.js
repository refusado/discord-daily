import WebhookRepository from '../repositories/WebhookRepository.js';

export default class RegisterWebhook {
  async execute(content) {
    let url;
    if (typeof content == 'string') url = content;
    if (typeof content == 'object') url = content.url;
    if (!url) throw new Error('Invalid content format. Pass a string or an object with a "url" property.');
    if (!isWebhookValid(url)) throw new Error('Invalid webhook URL.');

    const saved = await WebhookRepository.insert({ url });
    return saved;
  }
}

function isWebhookValid(webhook) {
  const regex = /https?:\/\/(?:ptb\.|canary\.)?discord\.com\/api(?:\/v\d{1,2})?\/webhooks\/(\d{17,19})\/([\w-]{68})/i;
  return regex.test(webhook);
}