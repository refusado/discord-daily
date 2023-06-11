import { config } from 'dotenv';
import axios from 'axios';
import tips from './tips.js';

config();

const hour = getCurrentHour();
const text = getMessage();
const urls = JSON.parse(process.env.WEBHOOK_URLS).urls;
const body = {
  "embeds": [
    {
      "title": `:bulb: Daily tip time!` ,
      "description": `#${hour} ${text} \n\n[About](https://github.com/refusado/discord-daily)`,
      "color": 16436796
    }
  ]
}

const requests = urls.map(async url => {
  try {
    const webhook = /https?:\/\/(?:ptb\.|canary\.)?discord\.com\/api(?:\/v\d{1,2})?\/webhooks\/(\d{17,19})\/([\w-]{68})/i;
    if (!webhook.test(url))
      throw new Error("Invalid webhook URL.");

    return await axios.post(url, body);
  } catch (error) {
    if (!error.response) {
      return error
    }
    error.response.failed = true;

    return error.response;
  }
});

const responses = await Promise.all(requests);
responses.forEach((res, i) => {
  if (res instanceof Error) {
    let message = `Request failed for ${urls[i]}`;
        message += `\n Message: ${res.message}`;

    console.log(message);
  } else if (res.failed) {
    let message = `Request failed for ${urls[i]}`;
        message += `\n Status: ${res.status ?? 0}`;
        message += `\n Message: ${res.data.message ?? ""}`;
        message += `\n Code: ${res.data.code ?? 0}`;

    console.log(message);
  } else {
    let message = `Request sent for ${urls[i]}`;
        message += `\n Status: ${res.status}`;

    console.log(message);
  }
});


function getMessage() {
  const randomId = Math.floor(Math.random() * tips.length);
  return tips[randomId];
}

function getCurrentHour() {
  const hours = [10, 15, 20, 23];
  const currentHour = new Date().getHours();

  if (!hours.includes(currentHour))
    return currentHour + 1;

  return currentHour;
}