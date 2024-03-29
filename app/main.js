import axios from 'axios';
import ReadWebhook from './services/ReadWebhook.js';
import ReadMessage from './services/ReadMessages.js';
import UpdateMessage from './services/UpdateMessage.js';

await main();

async function main() {
  try {
    const webhooks = await getWebhook();
    const message = await getRandomMessage();
    
    const requestBody = {
      "embeds": [
        {
          "title": `:bulb: Daily tip time!` ,
          "description": message.text,
          "color": 16436796
        }
      ]
    }
    
    webhooks.forEach(webhook => sendWebhookRequest(webhook, requestBody));
    
    await editMessage(message.id, { sent: true });
    
    console.log(`Message sent! ID: ${message.id}`);
    console.log(`Triggered webhooks: ${webhooks.length}`);
  } catch (error) {
    console.log(error);
  }
}

async function sendWebhookRequest(webhook, body) {
  try {
    await axios.post(webhook.url, body);
  } catch (error) {
    console.log(error.message);
    console.log(`[ERROR]: Webhook ID '${webhook.id}'`);
  }
}

async function getWebhook(webhook, all = false) {
  const read = new ReadWebhook();
  const webhooks = await read.execute(webhook);

  if (all) return webhooks;
  return webhooks.content;
}

async function getMessage(message, all = false) {
  const read = new ReadMessage();
  const messages = await read.execute(message);

  if (all) return messages;
  return messages.content[0];
}

async function editMessage(id, newContent, keepOld) {
  const update = new UpdateMessage();
  const editedMessage = await update.execute(id, newContent, keepOld);
  return editedMessage;
}

async function getRandomMessage() {
  const messages = await getMessage(null, true);

  const allMessages = messages.content;
  const unsentMessages = allMessages.filter(msg => !msg.sent);
  const unsentSize = unsentMessages.length;

  console.log('-- MESSAGES STATUS --');
  console.log(`  All: ${messages.size}`);
  console.log(`  Sent: ${messages.size - unsentSize}`);
  console.log(`  Unsent: ${unsentSize}`);
  console.log('---------------------');

  if (unsentSize <= 0) throw new Error('There are no unsent messages.');

  const min = 0;
  const max = unsentSize - 1;
  const randomPos = Math.floor(Math.random() * (max - min + 1) + min);

  return unsentMessages[randomPos];
}