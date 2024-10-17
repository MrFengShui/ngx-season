import { DOCUMENT } from "@angular/common";
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, Renderer2 } from "@angular/core";

@Component({
    selector: 'ngx-sui-home-page',
    templateUrl: './home.component.html',
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
export class HomePageComponent implements OnInit, AfterViewInit {

    protected readonly DARK_MODE_LOGO: string = 'assets/logo/angular_wordmark_white.png';
    protected readonly LIGHT_MODE_LOGO: string = 'assets/logo/angular_wordmark_black.png';

    protected themeFlag: boolean = false;
    protected themeHoverFlag: boolean = false;

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