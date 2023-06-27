import DeleteWebhook from './services/DeleteWebhook.js';
import CreateWebhook from './services/CreateWebhook.js';
import ReadWebhook from './services/ReadWebhook.js';
import ReadMessage from './services/ReadMessages.js';
import UpdateMessage from './services/UpdateMessage.js';

const webhook = 'https://discord.com/api/webhooks/11111111111111111/oooooooooooooo-ooooooooooooooooooooooooo-ooooooooooooooooooooooooooo';

// getWebhook()
  // .then(console.log)
  // .catch(console.log)

// getMessage(2)
  // .then(console.log)
  // .catch(console.log)

// saveWebhook(webhook)
  // .then(console.log);

// editMessage(1, { sent: true })
//   .then(console.log)
//   .catch(console.log)

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

async function getMessage(message) {
  const read = new ReadMessage();
  const messages = await read.execute(message);
  return messages;
}
async function editMessage(id, newContent, keepOld) {
  const update = new UpdateMessage();
  const editedMessage = await update.execute(id, newContent, keepOld);
  return editedMessage;
}