import MessageRepository from './repositories/MessageRepository.js';
import DeleteWebhook from './services/DeleteWebhook.js';
import CreateWebhook from './services/CreateWebhook.js';
import ReadWebhook from './services/ReadWebhook.js';
import ReadMessage from './services/ReadMessages.js';

const webhook = 'https://discord.com/api/webhooks/11111111111111111/oooooooooooooo-ooooooooooooooooooooooooo-ooooooooooooooooooooooooooo';

// saveWebhook(webhook)
//   .then(console.log)
//   .catch(console.log);

// removeWebhook(3)
//   .then(console.log)
//   .catch(console.log)

// getWebhook({ url: "https://example.com" })
  // .then(console.log)
  // .catch(console.log)


async function saveWebhook(webhook) {
  const register = new CreateWebhook();
  const savedWebhook = await register.execute(webhook);
  return savedWebhook;
}

async function removeWebhook(webhook) {
  const remove = new DeleteWebhook();
  const removedWebhook = await remove.execute(webhook);
  return removedWebhook;
}

async function getWebhook(webhook) {
  const read = new ReadWebhook();
  const webhooks = await read.execute(webhook);
  return webhooks;
}

async function getMessages(message) {
  const read = new ReadMessage();
  const messages = await read.execute(message);
  return messages;
}