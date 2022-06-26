import {AfterViewInit, Component, ElementRef, HostBinding, Input, Renderer2} from "@angular/core";
import {OctopusColorPalette} from "../global/enums.utils";

@Component({
    template: ''
})
abstract class OctopusAbstractStatus {

    @Input('octoTitle') title: string = 'Enter Title Here';
    @Input('octoSubtitle') subtitle: string = 'Enter Subtitle Here';
    @Input('octoContent') content: string = 'Enter Description Here';

    @HostBinding('class') class: string = 'octo-status';

    constructor(
        protected _element: ElementRef,
        protected _render: Renderer2
    ) {
    }

}

@Component({
    selector: 'div[octo-empty-status]',
    template: `
        <img [src]="image" alt="" width="100%" style="grid-row: 1 / 3">
        <div class="title">{{title}}</div>
        <div class="subtitle">{{subtitle}}</div>
        <div class="content">{{content}}</div>
    `
})
export class OctopusEmptyStatus extends OctopusAbstractStatus implements AfterViewInit {

    @Input('octoImage') image: string = 'assets/logo.svg';

    ngAfterViewInit() {
        this._render.addClass(this._element.nativeElement, 'octo-empty-status');
    }

}

@Component({
    selector: 'octo-error-status',
    template: `
        <img [src]="url" alt="" height="256" *ngIf="url !== 'success' && url !== 'warning' && url !== 'failure'">
        <octo-icon [octoColor]="formatIconColor(url)" octoSize="16rem"
                   *ngIf="url === 'success' || url === 'warning' || url === 'failure'">
            {{selectImageIcon(url)}}
        </octo-icon>
        <div class="title mt-100 mb-50">{{title}}</div>
        <div class="content mt-50 mb-150">{{content}}</div>
        <div class="d-flex flex-jc-center w-100 sx-300 px-100" style="box-sizing: border-box">
            <ng-content select="[octo-btn], [octo-solid-btn], [octo-stroke-btn]"></ng-content>
        </div>
    `
})
export class OctopusErrorStatus extends OctopusAbstractStatus implements AfterViewInit {

    @Input('octoURL') url: 'success' | 'warning' | 'failure' | string = 'assets/logo.svg';

    ngAfterViewInit() {
        this._render.addClass(this._element.nativeElement, 'octo-error-status');
    }

    formatIconColor(url: 'success' | 'warning' | 'failure' | string): OctopusColorPalette {
        return url as OctopusColorPalette;
    }

    selectImageIcon(url: 'success' | 'warning' | 'failure' | string): string {
        switch (url) {
            case 'success': return 'verified';
            case 'warning': return 'warning';
            case 'failure':
            default: return 'error';
        }
    }

}
