import { DOCUMENT } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, NgZone, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject, filter, map, Observable, of, Subject, throttleTime } from "rxjs";

import { NGXSeasonIconName } from "src/app/components/icon/icon.component";

type NavigationMetainfo = { id: string, icon?: NGXSeasonIconName, type?: 'item' | 'section', text: string, link?: string[], nodes?: NavigationMetainfo[] };

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ngx-sui-demo-page',
    templateUrl: './demo.component.html',
    styles: `
        :host {
            &, .layout {
                height: 100%;

                .layout-content {
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
        { id: '1', icon: 'dashboard', link: ['/demo', 'dashboard'], type: 'item', text: '仪表盘' },
        {
            id: '2', icon: 'dashboard', link: ['/demo', 'component'], type: 'section', text: '常规组件展示',
            nodes: [
                { id: '2-1', text: '手风琴', link: ['/demo', 'component', 'accordion'] },
                { id: '2-2', text: '警示框', link: ['/demo', 'component', 'alert'] },
                { id: '2-3', text: '头像', link: ['/demo', 'component', 'avatar'] },
                { id: '2-4', text: '徽章', link: ['/demo', 'component', 'badge'] },
                { id: '2-5', text: '面包屑', link: ['/demo', 'component', 'breadcrumb'] },
                { id: '2-6', text: '按钮', link: ['/demo', 'component', 'button'] },
                { id: '2-7', text: '按钮组', link: ['/demo', 'component', 'button-group'] },
                { id: '2-8', text: '卡片', link: ['/demo', 'component', 'card'] },
                { id: '2-9', text: '轮播器', link: ['/demo', 'component', 'carousel'] },
                { id: '2-10', text: '数码', link: ['/demo', 'component', 'digital'] },
                { id: '2-11', text: '分割器', link: ['/demo', 'component', 'divider'] },
                { id: '2-12', text: '图标', link: ['/demo', 'component', 'icon'] },

                { id: '2-15', text: '列表', link: ['/demo', 'component', 'list'] },
                { id: '2-16', text: '占位符', link: ['/demo', 'component', 'placeholder'] },
                { id: '2-17', text: '进度', link: ['/demo', 'component', 'progress'] },
                { id: '2-18', text: '丝带', link: ['/demo', 'component', 'ribbon'] },
                { id: '2-22', text: '提示框', link: ['/demo', 'component', 'tooltip'] },
            ]
        },
        {
            id: '3', icon: 'form', type: 'section', text: '表单组件展示',
            nodes: [
                { id: '2-2', text: '检查框', link: ['/demo', 'form', 'checkbox'] },
                { id: '2-3', text: '开关', link: ['/demo', 'form', 'check-switch'] },
                // { id: '2-3', text: '邮件输入框', link: ['/demo', 'form', 'email'] },
                // { id: '2-4', text: '输入框', link: ['/demo', 'form', 'number'] },
                { id: '2-5', text: '密码输入框', link: ['/demo', 'form', 'password'] },
                // { id: '2-6', text: '电话输入框', link: ['/demo', 'form', 'phone'] },
                { id: '2-7', text: '搜索输入框', link: ['/demo', 'form', 'search'] },
                { id: '2-8', text: '文字输入框', link: ['/demo', 'form', 'textfield'] },
            ]
        },
        {
            id: '4', icon: 'animation', type: 'section', text: '特效展示',
            nodes: [
                { id: '4-1', text: '背景', link: ['/demo', 'effect', 'background'] },
                { id: '4-5', text: '波纹', link: ['/demo', 'effect', 'ripple'] },
            ]
        }
    ];

    protected themeFlag: boolean = false;
    protected themeHoverFlag: boolean = false;
    protected controlToggled: boolean = true;

    private expanded$: Subject<boolean> = new BehaviorSubject(false);
    private selected$: Subject<boolean> = new BehaviorSubject(false);

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
        this.expanded$.complete();
        this.selected$.complete();
    }

    protected handleChangeThemeEvent(): void {
        this.changeThemeMode();
    }

    protected checkSectionExpanded(nodes: NavigationMetainfo[] | undefined): Observable<boolean> {
        if (nodes) {
            let flag: boolean = false;

            for (let length = nodes.length, i = 0, j = length - 1; i < j; i++, j--) {
                if (this.checkSelected(nodes[i].link, this.source) || this.checkSelected(nodes[j].link, this.source)) {
                    flag = true;
                    break;
                }
            }

            this.expanded$.next(flag);
        } else {
            this.expanded$.next(false);
        }

        return this.expanded$.asObservable().pipe(throttleTime(100));
    }

    protected checkRouteSelected(target: string[] | undefined): Observable<boolean> {
        this.selected$.next(this.checkSelected(target, this.source));
        return this.selected$.asObservable().pipe(throttleTime(100));
    }

    private checkSelected(source: string[] | undefined, target: string[] | undefined): boolean {
        if (!target || !source) return false;

        const sourceURL: string = source.join('/'), targetURL: string = target.join('/');
        return sourceURL === targetURL;
    }

    private changeThemeMode(): void {
        this.themeFlag = !this.themeFlag;
        this._renderer.setAttribute(this._document.body, 'data-theme', this.themeFlag ? 'light' : 'dark');
        this._cdr.markForCheck();
    }

}
