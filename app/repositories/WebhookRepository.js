import { writeFile } from 'fs';
import { webhooks } from "../../data/webhooks.example.js";

export default class WebhookRepository {
  async getAll() {
    const content = webhooks;
    const size = webhooks.length;

    return { size, content };
  }

  async find(id) {
    const idToFind = id;
    const content = webhooks.find(({ id }) => id == idToFind);
    const size = 1;

    return { size, content };
  }

  async save(url) {
    await insertWebhook({
      id: webhooks.length,
      content: url
    });

    const content = url;
    const size = 1;

    return { size, content };
  }
}

async function insertWebhook({ id, content }) {
  const dataDir = 'data/webhooks.example.js';

  const updatedWebhooks = webhooks;
  updatedWebhooks.push({ id, content });

  const webhooksString = JSON.stringify(updatedWebhooks, null, 2);
  const file = `export const webhooks = ${webhooksString};`;

  writeFile(dataDir, file, 'utf8', (err) => {
    if (!err)
      console.log(`New webhook inserted. Directory: ${dataDir}`);
  });
}