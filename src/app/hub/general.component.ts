import {Component, NgZone, OnDestroy} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, map, Observable, of, Subscription} from "rxjs";

import {FULL_LINKS, RouterListLink} from "../app.component";

@Component({
    selector: 'octopus-general-view',
    templateUrl: 'general.component.html'
})
export class OctopusLinkHubView implements OnDestroy {

    private readonly COMPONENT_LINKS: RouterListLink[] = [
        {icon: 'help', link: ['..', 'accordion'], text: 'Accordion'},
        {icon: 'help', link: ['..', 'badge'], text: 'Badge'},
        {icon: 'help', link: ['..', 'button'], text: 'Button'},
        {icon: 'help', link: ['..', 'carousel'], text: 'Carousel'},
        {icon: 'help', link: ['..', 'express'], text: 'Express'},
        {icon: 'help', link: ['..', 'icon'], text: 'Icon'},
        {icon: 'help', link: ['..', 'label'], text: 'Label'},
        {icon: 'help', link: ['..', 'paginator'], text: 'Paginator'},
        {icon: 'help', link: ['..', 'queue'], text: 'Queue'},
        {icon: 'help', link: ['..', 'sidenav'], text: 'Sidenav'},
        {icon: 'help', link: ['..', 'table'], text: 'Table'},
        {icon: 'help', link: ['..', 'tabs'], text: 'Tabs'},
        {icon: 'help', link: ['..', 'toolbar'], text: 'Toolbar'},
        {icon: 'help', link: ['..', 'tooltip'], text: 'Tooltip'},
        {icon: 'help', link: ['..', 'tree'], text: 'Tree'}
    ];
    private readonly CHART_LINKS: RouterListLink[] = [
        {icon: 'help', link: ['..', 'area-chart'], text: 'Area Chart'},
        {icon: 'help', link: ['..', 'bar-chart'], text: 'Bar Chart'},
        {icon: 'help', link: ['..', 'boxplot-chart'], text: 'Box Plot Chart'},
        {icon: 'help', link: ['..', 'candlestick-chart'], text: 'Candle Stick Chart'},
        {icon: 'help', link: ['..', 'doughnut-chart'], text: 'Doughnut Chart'},
        {icon: 'help', link: ['..', 'line-chart'], text: 'Line Chart'},
        {icon: 'help', link: ['..', 'pie-chart'], text: 'Pie Chart'},
        {icon: 'help', link: ['..', 'radar-chart'], text: 'Radar Chart'},
        {icon: 'help', link: ['..', 'scatter-chart'], text: 'Scatter Chart'},
        {icon: 'help', link: ['..', 'stack-chart'], text: 'Stack Chart'},
        {icon: 'help', link: ['..', 'waterfall-chart'], text: 'Waterfall Chart'},
    ];
    private readonly EFFECT_LINKS: RouterListLink[] = [
        {icon: 'help', link: ['..', 'overflow'], text: 'Overflow'},
        {icon: 'help', link: ['..', 'ripple'], text: 'Ripple'},
        {icon: 'help', link: ['..', 'shadow'], text: 'Shadow'}
    ];
    private readonly OVERLAY_LINKS: RouterListLink[] = [
        {icon: 'help', link: ['..', 'dialog'], text: 'Dialog'},
        {icon: 'help', link: ['..', 'drawer'], text: 'Drawer'},
        {icon: 'help', link: ['..', 'toast'], text: 'Toast'}
    ];
    private readonly TOOL_LINKS: RouterListLink[] = [
        {icon: 'help', link: ['..', 'holder'], text: 'Holder'},
        {icon: 'help', link: ['..', 'split-line'], text: 'Split Line'},
        {icon: 'help', link: ['..', 'status'], text: 'Status'}
    ];

    list$: Observable<RouterListLink[]> = of([]);

    private subscription!: Subscription;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _zone: NgZone
    ) {
        this.listenRouterOutletChange();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    private listenRouterOutletChange(): void {
        this.subscription = this._zone.runOutsideAngular(() =>
            this._router.events
                .pipe(
                    filter(value => value instanceof NavigationEnd),
                    map(() => this._route.snapshot.queryParams)
                )
                .subscribe(value => {
                    switch (value['category']) {
                        case 'components':
                            this.list$ = of(this.COMPONENT_LINKS);
                            break;
                        case 'charts':
                            this.list$ = of(this.CHART_LINKS);
                            break;
                        case 'effects':
                            this.list$ = of(this.EFFECT_LINKS);
                            break;
                        case 'overlay':
                            this.list$ = of(this.OVERLAY_LINKS);
                            break;
                        case 'tools':
                            this.list$ = of(this.TOOL_LINKS);
                            break;
                        default:
                            this.list$ = of(FULL_LINKS);
                            break;
                    }
                }));
    }

}
