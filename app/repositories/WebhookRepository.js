import { writeFile } from 'fs';
import webhooks from '../../data/webhooks.json' assert { type: "json" };

class WebhookRepository {
  async insert(webhookData) {
    try {
      return new Promise(async resolve => {
        const id = webhooks[webhooks.length - 1].id + 1;
        const content = [{ id, ...webhookData }];
        const size = content.length;

        const updatedWebhooks = [...webhooks, ...content];
        await saveData(updatedWebhooks);
    
        resolve({ size, content });
      });
    } catch (error) {
      console.error('Error while inserting webhook:', error);
      throw new Error('Failed to insert webhook.');
    }
  }

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
      const content = webhooks.filter(({ url }) => url == urlToFind);
      const size = content.length;

      resolve({ size, content });
    });
  }

  async findById(id) {
    return new Promise(resolve => {
      const idToFind = id;
      const content = webhooks.filter(({ id }) => id == idToFind);
      const size = content.length;

      resolve({ size, content });
    });
  }

  async remove(url) {
    try {
      return new Promise(async resolve => {
        const urlToRemove = url;
        const content = await this.find(urlToRemove);

        const newData = webhooks.filter(({ url }) => url != urlToRemove);
        await saveData(newData);

        resolve(content);
      });
    } catch (error) {
      console.error('Error while removing webhook:', error);
      throw new Error('Failed to remove webhook.');
    }
  }

  async removeById(id) {
    try {
      return new Promise(async resolve => {
        const idToRemove = id;
        const content = await this.findById(idToRemove);

        const newData = webhooks.filter(({ id }) => id != idToRemove);
        await saveData(newData);

        resolve(content);
      });
    } catch (error) {
      console.error('Error while removing webhook:', error);
      throw new Error('Failed to remove webhook.');
    }
  }
}

async function saveData(webhooksArray) {
  const filePath = 'data/webhooks.json';
  const fileWebhooks = JSON.stringify(webhooksArray, null, 2);
  const fileContent = fileWebhooks;

  const envFilePath = 'data/example.env';
  const envFileWebhooks = JSON.stringify(webhooksArray);
  const envFileContent = `WEBHOOK_URLS=${envFileWebhooks}`;

  return new Promise((resolve, reject) => {
    // update data file
    writeFile(filePath, fileContent, 'utf8', (error) => {
      if (error) return reject(error);
      console.log(`Webhooks data updated. Directory: ${filePath}`);
    });

    // update environment file
    writeFile(envFilePath, envFileContent, 'utf8', (error) => {
      if (error) return reject(error);
      console.log(`Environment variabels updated for webhooks.`);
    });

    resolve(`Webhooks data and environment updated.`);
  });
}

export default new WebhookRepository();