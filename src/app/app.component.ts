import { ApplicationRef, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { CHART_LIST, COMPONENT_LIST, CONTAINER_LIST, DemoRouterLinkModel, FORM_LIST, LAYOUT_LIST, POPUP_LIST } from './demo/demo.utils';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

    @ViewChild('border', { read: ElementRef, static: true })
    private border!: ElementRef<HTMLElement>;

    @ViewChild('north', { read: ElementRef, static: true })
    private north!: ElementRef<HTMLElement>;

    breadcrumb$: Subject<Array<{ icon: string, text: string }>> = new Subject();

    chartList!: DemoRouterLinkModel[];
    componentList!: DemoRouterLinkModel[];
    containerList!: DemoRouterLinkModel[];
    formList!: DemoRouterLinkModel[];
    layoutList!: DemoRouterLinkModel[];
    popupList!: DemoRouterLinkModel[];

    private subscription!: Subscription;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _ref: ApplicationRef,
        private _zone: NgZone
    ) {
        this._zone.runOutsideAngular(() =>
            setInterval(() => this._zone.run(() => this._ref.tick()), 250));
        this.subscription = this._router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => this._route.snapshot.children)
        ).subscribe(route => this.breadcrumb$.next(this.buildBreadcrumb(route)));
    }

    ngOnInit() {
        this.chartList = CHART_LIST;
        this.componentList = COMPONENT_LIST;
        this.containerList = CONTAINER_LIST;
        this.formList = FORM_LIST;
        this.layoutList = LAYOUT_LIST;
        this.popupList = POPUP_LIST;
    }

    ngOnDestroy() {
        this.breadcrumb$.complete();

        if (this.subscription !== undefined && !this.subscription.closed) {
            this.subscription.unsubscribe();
        }
    }

    calcSize(): string {
        return `calc(${this.border.nativeElement.children[0].clientHeight}px - ${this.north.nativeElement.clientHeight}px)`;
    }

    private buildBreadcrumb(routes: ActivatedRouteSnapshot[], list: Array<{ icon: string, text: string }> = []): Array<{ icon: string, text: string }> {
        if (routes.length === 1) {
            list.push({ icon: routes[0].data.icon === undefined ? 'home' : routes[0].data.icon, text: routes[0].data.breadcrumb });
            list = this.buildBreadcrumb(routes[0].children, list);
        }

        return list;
    }

}
