import { getWebhooks } from "../../database/db.js";

class WebhookRepository {
  get(id) {
    const allWebHooks = getWebhooks();
    let size, content;

    if (isNaN(id)) {
      content = allWebHooks;
      size = allWebHooks.length;
    } else {
      content = allWebHooks.find(webhook => webhook.id == id);
      size = 1;
    }

    if (content) {
      return { size, content }
    }

    return {
      error: "Not found."
    }
  }
}

const webhooks = new WebhookRepository;

const content = webhooks.get(1);

console.log(content);