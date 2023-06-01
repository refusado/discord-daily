import { config } from 'dotenv';
import axios from 'axios';
config();

const URLS = JSON.parse(process.env.WEBHOOK_URLS).urls;

URLS.forEach(url => {
  try {
    axios.post(url, {
      "embeds": [
        {
          "title": ":bulb: Daily tip time!",
          "description": "Utilize the \"box-sizing: border-box\" property to ensure consistent box sizing and avoid unexpected layout issues.\n\n[Source](https://github.com/refusado/discord-daily)",
          "color": 16436796
        }
      ]
    });
  } catch (err) {
    console.log(err);
  }
});
