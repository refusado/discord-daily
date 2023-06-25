import DeleteWebhook from './services/DeleteWebhook.js';
import RegisterWebhook from './services/RegisterWebhook.js';

const webhook = 'https://discord.com/api/webhooks/11111111111111111/oooooooooooooo-ooooooooooooooooooooooooo-ooooooooooooooooooooooooooo';

// saveWebhook(webchook)
// .then(console.log)
// .catch(console.log);

// removeWebhook(3)
//   .then(console.log)
//   .catch(console.log)

async function saveWebhook(webhook) {
  const register = new RegisterWebhook;
  const savedWebhook = await register.execute(webhook);
  return savedWebhook;
}

async function removeWebhook(webhook) {
  const remove = new DeleteWebhook();
  const removedWebhook = await remove.execute(webhook);
  return removedWebhook;
}