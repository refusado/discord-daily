import RegisterWebhook from './services/RegisterWebhook.js';

async function saveWebhook(webhook) {
  const registerHook = new RegisterWebhook;
  const savedWebhook = await registerHook.execute(webhook);
  return savedWebhook;
}

const validWebhookFormat = 'https://discord.com/api/webhooks/11111111111111111/oooooooooooooo-ooooooooooooooooooooooooo-ooooooooooooooooooooooooooo';
const invalidWebhookFormat = 'https://discord.com/api/webhooks/1/4';
const invalidContentFormat = 14;

// test1
saveWebhook(validWebhookFormat)
.then(console.log)
.catch(console.log);

// test2
saveWebhook(invalidWebhookFormat)
.then(console.log)
.catch(console.log);

// test3
saveWebhook(invalidContentFormat)
  .then(console.log)
  .catch(console.log);