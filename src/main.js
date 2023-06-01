import { config } from 'dotenv';
import axios from 'axios';
import tips from './tips.js';

config();

const tipNo = Math.floor(Math.random() * tips.length);
await sendHooksMessage(tips[tipNo]);

async function sendHooksMessage(message) {
  const urlArray = JSON.parse(process.env.WEBHOOK_URLS).urls;

  urlArray.forEach(url => {
    try {
      axios.post(url, {
        "embeds": [
          {
            "title": ":bulb: Daily tip time!",
            "description": message + "\n\n[Source](https://github.com/refusado/discord-daily)",
            "color": 16436796
          }
        ]
      });
    } catch (err) {
      console.log(err);
    }
  });
}
