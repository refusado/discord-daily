import MessageRepository from '../repositories/MessageRepository.js';

export default class UpdateMessage {
  async execute(id, content, keepOldContent = true) {
    if (id == null || !(typeof id === 'number' || typeof id === 'string'))
      throw new Error('Invalid ID.');

    if (typeof content !== 'object' || Array.isArray(content))
      throw new Error('Pass a new content as an object, others formats are invalid.');

    if (content.hasOwnProperty('id')) {
      delete content.id;
      console.log('Property "id" on the content was ignored. You can\'t edit the ID.');
    }

    const message = await MessageRepository.findById(id);

    if (message.size <= 0) {
      console.log(`Message not found in ID "${id}".`);
      return null;
    }

    if (keepOldContent) {
      const oldContent = message.content[0];
      return MessageRepository.edit(id, { ...oldContent, ...content });
    } else {
      return MessageRepository.edit(id, { ...content });
    }
  }
}