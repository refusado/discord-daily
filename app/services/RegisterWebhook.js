import WebhookRepository from '../repositories/WebhookRepository.js';

class RegisterWebhook {
  #testUrl(url) {
    const regex = /https?:\/\/(?:ptb\.|canary\.)?discord\.com\/api(?:\/v\d{1,2})?\/webhooks\/(\d{17,19})\/([\w-]{68})/i;
    
    return regex.test(url);
  }

  constructor(content) {
    let url;

    if (typeof content == 'string') {
      url = content;
    } else if (typeof content == 'object') {
      url = content.url;
    }

    if (url) {
      WebhookRepository.save({ url });
      return;
    } else {
      throw new Error('Invalid format.');
    }
  }
}