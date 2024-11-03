import { DOCUMENT } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, NgZone, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { Title, VERSION } from "@angular/platform-browser";
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject, debounceTime, filter, map, Observable, of, Subject, throttleTime } from "rxjs";

type NavigationMetainfo = { id: string, icon?: string, text: string, link?: string[], nodes?: NavigationMetainfo[] };

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ngx-sui-demo-page',
    templateUrl: './demo.component.html',
    styles: `
        :host {
            &, .ngx-sui-layout {
                height: 100%;

                .ngx-sui-content {
                    height: calc(100% - #{var(--layout-header-height)} - #{var(--layout-footer-height)})
                }
            }
        }
    `
})
export class DemoPageComponent implements OnInit, OnDestroy {

    protected readonly DARK_MODE_LOGO: string = 'assets/logo/angular_wordmark_white.png';
    protected readonly LIGHT_MODE_LOGO: string = 'assets/logo/angular_wordmark_black.png';

    protected readonly NAV_META_INFO_LIST: NavigationMetainfo[] = [
        { 
            id: '2', text: '组件展示', 
            nodes: [
                { id: '2-1', text: '手风琴', link: ['/demo', 'accordion'] },
                { id: '2-2', text: '警示框', link: ['/demo', 'alert'] },
                { id: '2-3', text: '头像', link: ['/demo', 'avatar'] },
                { id: '2-4', text: '徽章', link: ['/demo', 'badge'] },
                { id: '2-5', text: '按钮', link: ['/demo', 'button'] },
                { id: '2-6', text: '按钮组', link: ['/demo', 'button-group'] },
                { id: '2-7', text: '卡片', link: ['/demo', 'card'] },
                { id: '2-8', text: '轮播器', link: ['/demo', 'carousel'] },
                { id: '2-14', text: '进度', link: ['/demo', 'progress'] },
                { id: '2-17', text: '丝带', link: ['/demo', 'ribbon'] },
            ] 
        }
    ];

    protected selected$: Subject<boolean> = new BehaviorSubject(false);

    protected themeFlag: boolean = false;
    protected themeHoverFlag: boolean = false;
    protected controlToggled: boolean = true;

    private source: string[] | undefined;

    constructor(
        private _route: ActivatedRoute,
        private _cdr: ChangeDetectorRef,
        @Inject(DOCUMENT)
        private _document: Document,
        private _renderer: Renderer2,
        private _router: Router,
        private _title: Title,
        private _ngZone: NgZone
    ) {
        this._ngZone.runOutsideAngular(() => 
            this._router.events.pipe(
                filter(events => events instanceof NavigationEnd),
                map(() => {
                    const parent: ActivatedRouteSnapshot = this._route.snapshot;
                    const parentPath: string = parent.routeConfig?.path as string;
                    const parentTitle: string = parent.routeConfig?.title as string;

                    const child: ActivatedRouteSnapshot = parent.children[0];
                    const childPath: string = child.routeConfig?.path as string;
                    const childTitle: string = child.routeConfig?.title as string;

                    return { route: [`/${parentPath}`, `${childPath}`], title: `${parentTitle}——${childTitle}` };
                })
            ))
            .subscribe(result => 
                this._ngZone.run(() => {
                    this.source = result.route;

                    let task = setTimeout(() => {
                        clearTimeout(task);

                        this._title.setTitle(result.title);
                        this._cdr.markForCheck();
                    });
                }));
    }

    ngOnInit(): void {
        this.changeThemeMode();
    }

    ngOnDestroy(): void {
        this.selected$.complete();
    }

    protected handleChangeThemeEvent(): void {
        this.changeThemeMode();
    }

    protected checkRouteSelected(target: string[] | undefined): Observable<boolean> {
        if (!target || !this.source) return of(false);
        
        let flag: boolean = target.length === this.source.length;

        for (let i = 0; i < target.length; i++) {
            if (target[i] !== this.source[i]) {
                flag = false;
                break;
            }
        }

        this.selected$.next(flag);
        return this.selected$.asObservable().pipe(throttleTime(10));
    }

    private changeThemeMode(): void {
        this.themeFlag = !this.themeFlag;
        this._renderer.setAttribute(this._document.body, 'data-theme', this.themeFlag ? 'light' : 'dark');
        this._cdr.markForCheck();
    }

}