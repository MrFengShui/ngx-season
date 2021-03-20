import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit, OnDestroy {

    jsonp!: Subscription;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.jsonp = this.http.jsonp('https://ipapi.co/jsonp/', 'callback').subscribe(value => console.log(value));
    }

    ngOnDestroy() {
        if (this.jsonp) {
            this.jsonp.unsubscribe();
        }
    }

}
