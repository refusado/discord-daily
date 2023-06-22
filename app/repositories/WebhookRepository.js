import { writeFile } from 'fs';
import { webhooks } from '../../data/webhooks.example.js';

class WebhookRepository {
  async getAll() {
    return new Promise(resolve => {
      const content = webhooks;
      const size = webhooks.length;

      resolve({ size, content });
    });
  }

  async find(url) {
    return new Promise(resolve => {
      const urlToFind = url;
      const content = webhooks.find(({ url }) => url == urlToFind);
      const size = 1;

      resolve({ size, content });
    });
  }

  async findById(id) {
    return new Promise(resolve => {
      const idToFind = id;
      const content = webhooks.find(({ id }) => id == idToFind);
      const size = 1;

      resolve({ size, content });
    });
  }

  async save(data) {
    try {
      const id = webhooks.length
      const content = { id, ...data };
      const size = 1;

      await insertWebhook(content);
  
      return { size, content };
    } catch (error) {
      console.error('Error while saving webhook:', error);
      throw new Error('Failed to save webhook.');
    }
  }
}

async function insertWebhook(newWebhook) {
  const filePath = 'data/webhooks.example.js';

  const updatedWebhooks = [...webhooks, newWebhook];
  const webhooksString = JSON.stringify(updatedWebhooks, null, 2);

  const fileContent = `export const webhooks = ${webhooksString};`;

  return new Promise((resolve, reject) => {
    writeFile(filePath, fileContent, 'utf8', (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(`New webhook inserted. Directory: ${filePath}`);
      }
    });
  });
}

export default new WebhookRepository();