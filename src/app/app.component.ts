import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';

import { StorageUtils } from './utils/storage.utils';

@Component({
    selector: 'app-root',
    template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

    utils!: StorageUtils;

    task!: number;
    ipSub!: Subscription;

    constructor(
        private http: HttpClient,
        private render: Renderer2
    ) { }

    ngOnInit() {
        this.utils = StorageUtils.newInstance();
        this.utils.initialize();
    }

    ngAfterViewInit() {
        this.task = setTimeout(() => {
            this.render.setAttribute(document.documentElement, 'class', 'theme ' + this.utils.getTheme() + '-' + this.utils.getMode());
            clearTimeout(this.task);
        });
        this.ipSub = this.http.get('https://ipapi.co/json').subscribe(value => console.log(value));
    }

    ngOnDestroy() {
        if (this.task !== undefined) {
            clearTimeout(this.task);
        }

        if (this.ipSub !== undefined && !this.ipSub.closed) {
            this.ipSub.unsubscribe();
        }
    }

    @HostListener('document:readystatechange', ['$event'])
    listenReadyStateChange(event: Event): void {
        console.log((event.target as Document).readyState);
    }


}
