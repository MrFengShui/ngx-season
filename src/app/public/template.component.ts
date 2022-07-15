import {ChangeDetectionStrategy, Component, NgZone} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, map, Observable, of} from "rxjs";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'octopus-template-view',
    templateUrl: 'template.component.html'
})
export class OctopusTemplateView {

    select$!: Observable<number>;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _zone: NgZone
    ) {
        let subscription = this._zone.runOutsideAngular(() =>
            this._router.events
                .pipe(
                    filter(value => value instanceof NavigationEnd),
                    map(() => {
                        switch (this._route.snapshot.firstChild?.routeConfig?.path) {
                            default:
                            case 'overview': return 0;
                            case 'api': return 1;
                            case 'example': return 2;
                        }
                    }))
                .subscribe(value => {
                    this.select$ = of(value);
                    subscription.unsubscribe();
                }));
    }

}
