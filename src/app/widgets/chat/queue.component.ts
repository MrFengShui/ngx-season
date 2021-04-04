import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";

import { ChatMessageModel, MessageRole } from "src/app/models/support.model";

@Component({
    selector: 'app-widgets-chat-queue',
    templateUrl: './queue.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetsChatQueueComponent implements OnChanges, OnInit, DoCheck {

    @Input('size') size!: string | number;
    @Input('message') message!: ChatMessageModel;
    @Input() queue!: ChatMessageModel[];

    @Output() queueChange: EventEmitter<ChatMessageModel[]> = new EventEmitter();

    @ViewChild('content', { read: ElementRef, static: true })
    content!: ElementRef<HTMLElement>;

    @HostBinding('class') class: string = 'chat-queue';

    length!: number

    constructor(private cdr: ChangeDetectorRef) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.message !== undefined) {
            let value: ChatMessageModel = changes.message.currentValue;

            if (value !== undefined) {
                this.queue.push(new ChatMessageModel(value.messageRole, value.messageAvatar, value.messageDatetime, value.messageContent));
                this.queueChange.emit(this.queue);
            }

            if (!changes.message.firstChange) {
                this.autoResponse();
            }
        }
    }

    ngOnInit() {
        if (this.queue === undefined) {
            this.queue = [];
        }

        this.length = this.queue.length;
    }

    ngDoCheck() {
        if (this.queue.length !== this.length) {
            this.scrollToBottom();
            this.cdr.detectChanges();
            this.length = this.queue.length;
        }

        this.cdr.markForCheck();
    }

    private scrollToBottom(): void {
        let delta = this.content.nativeElement.scrollHeight - this.content.nativeElement.clientHeight;
        this.content.nativeElement.scrollTop = delta;
    }

    private autoResponse(): void {
        this.queue.push(new ChatMessageModel(MessageRole.MESSAGE_ROLE_RESPONSE, 'assets/images/profile.png', new Date(), 'I will response to you later.'))
        this.queueChange.emit(this.queue);
    }

}