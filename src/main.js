import { config } from 'dotenv';
import axios from 'axios';
import tips from './tips.js';

config();

const hour = getCurrentHour();
const message = getMessage();
const urls = JSON.parse(process.env.WEBHOOK_URLS).urls;
const body = {
  "embeds": [
    {
      "title": `\`${hour}\`:bulb: Daily tip time!` ,
      "description": message + "\n\n[Source](https://github.com/refusado/discord-daily)",
      "color": 16436796
    }
  ]
}

const requests = urls.map(url => axios.post(url, body));

try {
  const responses = await Promise.all(requests);
  responses.forEach((res, i) => {
    console.log(`Message sent for ${urls[i]}. Status: ${res.status}`);
  });
} catch (err) {
  console.log(err.message);
}



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