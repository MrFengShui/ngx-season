import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component, ElementRef, HostBinding, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Subscription, timer } from "rxjs";
import { filter, map } from "rxjs/operators";

import { ChatMessageModel } from "src/app/models/support.model";
import { MediaCommentModel, MediaMetaModel, MediaPlayViewModel } from "src/app/models/view/media.model";
import { createUnitAnchor } from "src/app/utils/data.utils";
import { MediaFactory } from "src/app/utils/media.factory";

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

    model!: MediaPlayViewModel;

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

    timerSub!: Subscription;

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
        let factory: MediaFactory = MediaFactory.newInstance();
        this.model = factory.createPlayViewModel();
        this.fitSize = 0;
        this.opened = true;
        this.content = '';
        this.queue = [];
    }

    ngAfterViewInit(): void {
        this.timerSub = timer(5000).subscribe(() => {
            this.model.meta = new MediaMetaModel('Title', 'Subtitle', 'Description', 0, new Date(), 0, 0, [], 'assets/images/profile.png', 'Channel Name', 0, false, false);
            this.model.comment = new MediaCommentModel('assets/images/profile.png', 'Channel Name', '', []);
            this.model.recommend = createUnitAnchor(3, 1, 18);
        },
            error => console.log(error), () => this.timerSub.unsubscribe());

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

}