export enum MessageRole {

    MESSAGE_ROLE_REQUEST = 1, MESSAGE_ROLE_RESPONSE = -1

}

export class ChatMessageModel {

    public static MESSAGE_ROLE_REQUEST: number = 1;
    public static MESSAGE_ROLE_RESPONSE: number = -1;

    messageRole!: number;
    messageAvatar!: string;
    messageDatetime!: Date | undefined;
    messageContent!: string | undefined;

    constructor(messageRole: number, messageAvatar: string, messageDatetime: Date | undefined, messageContent: string | undefined) {
        this.messageRole = messageRole;
        this.messageAvatar = messageAvatar;
        this.messageDatetime = messageDatetime;
        this.messageContent = messageContent
    }

}