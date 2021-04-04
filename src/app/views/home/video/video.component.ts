import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component, ElementRef, HostBinding, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, map } from "rxjs/operators";

import { ChatMessageModel, MessageRole } from "src/app/models/support.model";

@Component({
    selector: 'app-home-video',
    templateUrl: './video.component.html'
})
export class VideoComponent implements OnInit, AfterViewInit {

    @ViewChild('layout', { read: ElementRef, static: true })
    layout!: ElementRef<HTMLDivElement>;

    @ViewChild('overlay', { read: ElementRef, static: true })
    overlay!: ElementRef<HTMLDivElement>;

    @HostBinding('class') class: string = 'video';

    createTime: Date = new Date();

    fitSize!: number;
    opened!: boolean;
    append!: boolean;
    overlayed!: boolean;
    content!: string;

    chatData!: any;
    chatFlag!: any;
    message!: ChatMessageModel;
    queue!: ChatMessageModel[];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient
    ) {
        this.router.events.pipe(
            filter(value => value instanceof NavigationEnd),
            map(value => this.route)
        ).subscribe(event => {
            switch (event.snapshot.params.action) {
                case 'unit': this.append = false; break;
                case 'list': this.append = true; break;
                default: this.router.navigate(['other', 'error', '404']); break;
            }
        });
    }

    ngOnInit() {
        this.fitSize = 0;
        this.opened = true;
        this.content = '';
        this.queue = [];
    }

    ngAfterViewInit(): void {
        this.chatFlag = {};
        this.http.get('tests/json/chat.data.json', { responseType: 'json' }).subscribe(data => this.chatData = data);

        let element: HTMLElement = this.layout.nativeElement.parentElement?.parentElement || this.layout.nativeElement;
        element.onscroll = (event: Event) => this.overlayed = element.scrollTop >= this.fitSize;
    }

    listenCurrentTimeChange(change: number): void {
        let target: string = Math.floor(change).toString();
        let keyList: string[] = Object.keys(this.chatData).filter(element => parseInt(element) <= parseInt(target));

        if (keyList.length === 0) {
            this.queue.length = 0;
            Object.keys(this.chatFlag).forEach(flag => this.chatFlag[flag] = false);
        } else {
            keyList.forEach(key => {
                if (this.chatFlag[key] === undefined || this.chatFlag[key] === false) {
                    this.chatFlag[key] = true;

                    if (this.chatData[key] !== undefined) {
                        let task: any;
                        Array.from(this.chatData[key]).forEach((item: any, index: number, array: any[]) => task = setTimeout(() => {
                            this.message = item;

                            if (index === array.length - 1) {
                                clearTimeout(task);
                            }
                        }));
                    }
                }
            });
        }
    }

    handleSendMessageAction(event: MouseEvent): void {
        this.message = new ChatMessageModel(MessageRole.MESSAGE_ROLE_REQUEST, 'assets/images/profile.png', new Date(), this.content);
        this.content = '';
    }

}