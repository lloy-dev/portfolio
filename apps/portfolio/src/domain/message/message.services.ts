import type { CreateMessageInput } from "@domain";
import type { MessageRepository } from "@infrastructure";

interface MessageService {
  createMessage(data: CreateMessageInput): Promise<boolean>;
}

class DefaultMessageService implements MessageService {
  private messageRepository: MessageRepository;

  constructor(messageRepository: MessageRepository) {
    this.messageRepository = messageRepository;
  }

  createMessage(data: CreateMessageInput): Promise<boolean> {
    return this.messageRepository.createMessage(data);
  }
}

export default DefaultMessageService;
export type { MessageService };
