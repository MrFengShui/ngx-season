import { Component } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, map } from "rxjs/operators";

@Component({
    selector: 'app-home-live',
    templateUrl: './live.component.html'
})
export class LiveComponent {

    type!: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.router.events.pipe(
            filter(value => value instanceof NavigationEnd),
            map(value => this.route)
        ).subscribe(event => {
            switch (event.snapshot.params.type) {
                case 'audio':
                case 'video': this.type = event.snapshot.params.type; break;
                default: this.router.navigate(['other', 'error', '404']); break;
            }
        });
    }

}