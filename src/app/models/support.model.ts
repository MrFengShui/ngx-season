export enum MessageRole {

    MESSAGE_ROLE_REQUEST = 1, MESSAGE_ROLE_RESPONSE = -1

}

export class ChatMessageModel {

    messageRole!: MessageRole;
    messageAvatar!: string;
    messageDatetime!: Date | undefined;
    messageContent!: string | undefined;

    constructor(messageRole: MessageRole, messageAvatar: string, messageDatetime: Date | undefined, messageContent: string | undefined) {
        this.messageRole = messageRole;
        this.messageAvatar = messageAvatar;
        this.messageDatetime = messageDatetime;
        this.messageContent = messageContent
    }

}