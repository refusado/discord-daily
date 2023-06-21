// testing
import WebhookRepository from "../repositories/WebhookRepository.js";

const webhook = new WebhookRepository;
const result = await webhook.save("https://example.com");

console.log(result);