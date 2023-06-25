import MessageRepository from './repositories/MessageRepository.js';
import DeleteWebhook from './services/DeleteWebhook.js';
import CreateWebhook from './services/CreateWebhook.js';
import ReadWebhook from './services/ReadWebhook.js';

const webhook = 'https://discord.com/api/webhooks/11111111111111111/oooooooooooooo-ooooooooooooooooooooooooo-ooooooooooooooooooooooooooo';

// saveWebhook(webhook)
//   .then(console.log)
//   .catch(console.log);

removeWebhook(3)
  .then(console.log)
  .catch(console.log)

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

// getWebhook()
  // .then(console.log)
  // .catch(console.log)

// console.log(await MessageRepository.insert({ text: 'test', sent: false }));
// console.log(await MessageRepository.getAll());
// console.log(await MessageRepository.find('test'));
// console.log(await MessageRepository.findById(34));
// console.log(await MessageRepository.remove('test'));
// console.log(await MessageRepository.removeById(42));