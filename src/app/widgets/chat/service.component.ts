import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { interval, Subscription } from "rxjs";
import { take } from "rxjs/operators";

import { ChatMessageModel, MessageRole } from "src/app/models/support.model";

@Component({
    selector: 'app-widgets-chat-service',
    templateUrl: './service.component.html'
})
export class WidgetsChatServiceComponent implements OnInit, AfterViewInit, AfterViewChecked {

    @ViewChild('content', { read: ElementRef, static: true })
    content!: ElementRef<HTMLElement>;

    array!: ChatMessageModel[];

    ngOnInit() {
        this.array = [];
    }

    ngAfterViewInit() {
        let subscription: Subscription = interval(2500).pipe(take(16)).subscribe(value => {
            this.array.push(
                value % 2 === 0
                    ? new ChatMessageModel(MessageRole.MESSAGE_ROLE_REQUEST, 'assets/images/profile.png',
                        new Date(), 'Hello, my name is Angular. I have a lot of issues in my code. I need your help.')
                    : new ChatMessageModel(MessageRole.MESSAGE_ROLE_RESPONSE, 'assets/images/profile.png',
                        new Date(), 'Okay! I wash I could help you.')
            );

            if (value === 15) {
                subscription.unsubscribe();
            }
        })
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    private scrollToBottom(): void {
        let delta = this.content.nativeElement.scrollHeight - this.content.nativeElement.clientHeight;
        this.content.nativeElement.scrollTop = delta;
    }

}