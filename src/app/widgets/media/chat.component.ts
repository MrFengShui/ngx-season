import { Component, HostBinding, Input, OnInit } from "@angular/core";

import { ChatMessageModel, MessageRole } from "src/app/models/support.model";
import { MediaChatModel } from "src/app/models/view/media.model";
import { MediaFactory } from "src/app/utils/media.factory";

@Component({
    selector: 'app-widgets-media-chat',
    templateUrl: './chat.component.html'
})
export class WidgetsMediaChatComponent implements OnInit {

    @Input('model') model: MediaChatModel | undefined;

    @HostBinding('class') class: string = 'chat';

    content: string = '';

    ngOnInit() {

    }

    handleSendMessageAction(event: MouseEvent): void {
        if (this.model !== undefined) {
            let factory: MediaFactory = MediaFactory.newInstance();
            this.model.message = factory.createChatMessageModel(ChatMessageModel.MESSAGE_ROLE_REQUEST, 'assets/images/profile.png');
            this.model.message.messageContent = this.content;
            this.content = '';
        }
    }

}