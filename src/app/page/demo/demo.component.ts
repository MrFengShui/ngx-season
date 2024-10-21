import { DOCUMENT } from "@angular/common";
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, Renderer2 } from "@angular/core";

type NavigationMetainfo = { id: string, icon?: string, text: string, link?: string[], nodes?: NavigationMetainfo[] };

@Component({
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
export class DemoPageComponent implements OnInit, AfterViewInit {

    protected readonly DARK_MODE_LOGO: string = 'assets/logo/angular_wordmark_white.png';
    protected readonly LIGHT_MODE_LOGO: string = 'assets/logo/angular_wordmark_black.png';

    protected readonly NAV_META_INFO_LIST: NavigationMetainfo[] = [
        { 
            id: '2', text: '组件展示', 
            nodes: [
                { id: '2-1', text: '警示框', link: ['/demo', 'alert'] },
                { id: '2-2', text: '头像', link: ['/demo', 'avatar'] },
                { id: '2-3', text: '按钮', link: ['/demo', 'button'] },
            ] 
        }
    ];

    protected themeFlag: boolean = false;
    protected themeHoverFlag: boolean = false;
    protected controlToggled: boolean = true;

    constructor(
        private _cdr: ChangeDetectorRef,
        @Inject(DOCUMENT)
        private _document: Document,
        private _element: ElementRef,
        private _renderer: Renderer2
    ) {}

    ngOnInit(): void {
        this.changeThemeMode();
    }

    ngAfterViewInit(): void {
        
    }

    protected handleChangeThemeEvent(): void {
        this.changeThemeMode();
    }

    private changeThemeMode(): void {
        this.themeFlag = !this.themeFlag;
        this._renderer.setAttribute(this._document.body, 'data-theme', this.themeFlag ? 'light' : 'dark');
        this._cdr.markForCheck();
    }

}