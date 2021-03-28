import { OnDestroy } from "@angular/core";
import { AfterViewInit, Component } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { interval, Subscription } from "rxjs";
import { filter, map, take } from "rxjs/operators";

import { OTHER_ERROR } from "src/app/data/other.error.data";


@Component({
    selector: 'app-error',
    templateUrl: './error.component.html'
})
export class ErrorComponent implements OnDestroy, AfterViewInit {

    error!: any;
    count!: number;
    flag!: boolean;

    routerSub!: Subscription;
    timerSub!: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.routerSub = this.router.events.pipe(
            filter(value => value instanceof NavigationEnd),
            map(value => this.route)
        ).subscribe(event => this.error = OTHER_ERROR[event.snapshot.params.code]);
    }

    ngAfterViewInit() {
        this.flag = false;

        this.timerSub = interval(1000).pipe(take(7)).subscribe(value => {
            this.flag = true;
            this.count = 6 - value - 1;

            if (this.count === -1) {
                this.router.navigate(['/']);
            }
        })
    }

    ngOnDestroy() {
        if (this.timerSub !== undefined) {
            this.timerSub.unsubscribe();
        }

        if (this.routerSub !== undefined) {
            this.routerSub.unsubscribe();
        }
    }

}
