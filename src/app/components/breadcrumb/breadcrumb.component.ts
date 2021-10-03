import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { Component, ContentChildren, ElementRef, HostBinding, Input, OnChanges, OnInit, QueryList, Renderer2, SimpleChanges } from "@angular/core";

import { ColorPalette } from "src/app/global/enum.utils";

@Component({
    selector: 'a[octopus-breadcrumb-anchor]',
    template: `
        <octopus-icon [color]="color" margin="4" size="18" rounded="true">{{icon}}</octopus-icon>
        <span class="text-truncate" octopus-tooltip [tooltipColor]="color" [tooltipText]="text" *ngIf="matchBoolean(tip)">{{text}}</span>
        <span class="text-truncate" *ngIf="!matchBoolean(tip)">{{text}}</span>
    `
})
export class OctopusBreadcrumbAnchor implements OnChanges, OnInit {

    @Input('color') color: ColorPalette = 'base';
    @Input('labeled') labeled: boolean | string = true;
    @Input('icon') icon: string = '';
    @Input('text') text: string = '';
    @Input('tip') tip: boolean | string = false;

    @HostBinding('class') class: string = 'octopus-breadcrumb-anchor';

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.color !== undefined) {
            setTimeout(() => this.renderColor(changes.color.previousValue, changes.color.currentValue));
        }

        if (changes.labeled !== undefined) {
            setTimeout(() => this.renderLabeled(coerceBooleanProperty(changes.labeled.currentValue)));
        }
    }

    ngOnInit() {
        setTimeout(() => {
            this.renderColor(undefined, this.color);
            this.renderLabeled(coerceBooleanProperty(this.labeled));
        });
    }

    matchBoolean(flag: boolean | string): boolean {
        return coerceBooleanProperty(flag);
    }

    private renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-base-breadcrumb-anchor' : `octopus-${prevColor}-breadcrumb-anchor`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-breadcrumb-anchor`);
    }

    private renderLabeled(labeled: boolean): void {
        if (labeled) {
            this._render.removeClass(this._ref.nativeElement, 'labeled');
        } else {
            this._render.addClass(this._ref.nativeElement, 'labeled');
        }
    }

}

@Component({
    selector: 'octopus-breadcrumb',
    template: `
        <div class="octopus-breadcrumb-wrapper" #wrapper>
            <ng-container *ngFor="let anchor of anchors; index as i; last as isLast">
                <a octopus-breadcrumb-anchor [color]="color" [labeled]="labeled" [icon]="anchor.icon" [text]="anchor.text" [tip]="tip"></a>
                <octopus-icon [color]="color" *ngIf="!isLast">{{delimiter}}</octopus-icon>
            </ng-container>
        </div>
        <ng-template><ng-content select="a[octopus-breadcrumb-anchor]"></ng-content></ng-template>
    `
})
export class OctopusBreadcrumb {

    @Input('color') color: ColorPalette = 'base';
    @Input('delimiter') delimiter: string = 'double_arrow';
    @Input('labeled') labeled: boolean | string = true;
    @Input('tip') tip: boolean | string = false;

    @ContentChildren(OctopusBreadcrumbAnchor) anchors!: QueryList<OctopusBreadcrumbAnchor>;

    @HostBinding('class') class: string = 'octopus-breadcrumb';

}
