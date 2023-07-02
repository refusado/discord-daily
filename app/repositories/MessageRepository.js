import { writeFile } from 'fs';
import messages from '../../data/messages.json' assert { type: 'json' }

class MessageRepository {
  async insert(messageData) {
    try {
      return new Promise(async resolve => {
        const id = messages[messages.length - 1].id + 1;
        const content = [{ id, ...messageData }];
        const size = content.length;

        const updatedMessages = [...messages, ...content];
        await saveData(updatedMessages);
    
        resolve({ size, content });
      });
    } catch (error) {
      console.error('Error while inserting message:', error);
      throw new Error('Failed to insert message.');
    }
  }

  async getAll() {
    return new Promise(resolve => {
      const content = messages;
      const size = messages.length;

      resolve({ size, content });
    });
  }

  async find(message) {
    return new Promise(resolve => {
      const content = messages.filter(({ text }) => text == message);
      const size = content.length;

      resolve({ size, content });
    });
  }

  async findById(id) {
    return new Promise(resolve => {
      const idToFind = id;
      const content = messages.filter(({ id }) => id == idToFind);
      const size = content.length;

      resolve({ size, content });
    });
  }

  async remove(message) {
    try {
      return new Promise(async resolve => {
        const content = await this.find(message);

        const newData = messages.filter(({ text }) => text != message);
        await saveData(newData);

        resolve(content);
      });
    } catch (error) {
      console.error('Error while removing message:', error);
      throw new Error('Failed to remove message.');
    }
  }

  async removeById(id) {
    try {
      return new Promise(async resolve => {
        const idToRemove = id;
        const content = await this.findById(idToRemove);

        const newData = messages.filter(({ id }) => id != idToRemove);
        await saveData(newData);

        resolve(content);
      });
    } catch (error) {
      console.error('Error while removing message:', error);
      throw new Error('Failed to remove message.');
    }
  }

  async edit(id, messageData) {
    try {
      return new Promise(async resolve => {
        const messageToEdit = (await this.findById(id)).content[0];
        const index = messages.indexOf(messageToEdit);
  
        messages[index] = { id, ...messageData };
        await saveData(messages);
  
        const content = await this.findById(id);
        resolve(content);
      });
    } catch (error) {
      console.error('Error while editing message:', error);
      throw new Error('Failed to edit message.');
    }
  }
}

async function saveData(messagesArray) {
  const filePath = 'data/messages.json';
  const fileContent = JSON.stringify(messagesArray, null, 2);

  return new Promise((resolve, reject) => {
    writeFile(filePath, fileContent, 'utf8', (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(`Messages data updated. Directory: ${filePath}`);
      }
    });
  });
}

export default new MessageRepository();