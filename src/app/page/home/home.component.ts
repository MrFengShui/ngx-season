import { Platform } from "@angular/cdk/platform";
import { DOCUMENT } from "@angular/common";
import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, Renderer2 } from "@angular/core";

type PlatformSupportInfo = { isBrowser: boolean, isWebkit: boolean };

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
export class HomePageComponent implements OnInit {

    protected readonly DARK_MODE_LOGO: string = 'assets/logo/angular_wordmark_white.png';
    protected readonly LIGHT_MODE_LOGO: string = 'assets/logo/angular_wordmark_black.png';

    protected themeFlag: boolean = false;
    protected themeHoverFlag: boolean = false;
    protected controlToggled: boolean = true;
    protected gridColSizes: string[] = ['auto', '1fr'];
    protected gridRowSizes: string[] = Array.from<string>({ length: 8 }).fill('var(--size-pixel-48)');
    protected gridGap: [number, number] = [16, 8];
    protected support: PlatformSupportInfo = {
        isBrowser: this._platform.isBrowser,
        isWebkit: this._platform.WEBKIT
    };

    constructor(
        private _cdr: ChangeDetectorRef,
        private _element: ElementRef,
        private _renderer: Renderer2,
        private _platform: Platform,

        @Inject(DOCUMENT)
        private _document: Document
    ) {}

    ngOnInit(): void {
        this.changeThemeMode();
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
