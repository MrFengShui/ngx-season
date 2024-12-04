import { AnimationBuilder, AnimationPlayer, useAnimation } from "@angular/animations";
import { coerceNumberProperty, coerceBooleanProperty } from "@angular/cdk/coercion";
import { TemplatePortal } from "@angular/cdk/portal";
import { Component, OnChanges, AfterViewInit, Input, ViewChild, ElementRef, Renderer2, SimpleChanges, Directive, TemplateRef, ContentChild, AfterContentInit, ViewContainerRef } from "@angular/core";

import { horizontalExtraCollapsionExpanionAnimation } from "src/app/utils/animate.utils";

@Directive({
    selector: '[ngx-sui-LayoutContentSide]'
})
export class NGXSeasonLayoutContentSideDirective {

    constructor(protected _template: TemplateRef<any>) {}

    fetchTemplate(): TemplateRef<any> {
        return this._template;
    }

}

@Directive({
    selector: '[ngx-sui-LayoutContentArea]'
})
export class NGXSeasonLayoutContentAreaDirective {

    constructor(protected _template: TemplateRef<any>) {}

    fetchTemplate(): TemplateRef<any> {
        return this._template;
    }

}

@Component({
    selector: 'ngx-sui-layout-content',
    template: `
        <div class="content-side" ngx-sui-Scrollbar [scrollBarAxis]="toggled ? 'xy-axis' : 'y-axis'" #sideBox>
            <ng-container [cdkPortalOutlet]="sidePortal"></ng-container>
        </div>
        <div class="content-area" ngx-sui-Scrollbar scrollBarAxis="xy-axis" #areaBox>
            <ng-container [cdkPortalOutlet]="areaPortal"></ng-container>
        </div>
        <ng-template><ng-content select="[ngx-sui-LayoutContentSide], [ngx-sui-LayoutContentArea]"></ng-content></ng-template>
    `
})
export class NGXSeasonLayoutContentComponent implements OnChanges, AfterContentInit, AfterViewInit {

    @Input('contentDuration')
    set duration(duration: number | string | null) {
        this._duration = duration ? coerceNumberProperty(duration) : 250;
    }

    get duration(): number {
        return this._duration;
    }

    @Input('contentSideShrinkSize')
    set sideShrinkSize(sideShrinkSize: number | string | null) {
        this._sideShrinkSize = sideShrinkSize ? coerceNumberProperty(sideShrinkSize) : 64;
    }

    get sideShrinkSize(): number {
        return this._sideShrinkSize;
    }

    @Input('contentSideExpandSize')
    set sideExpandSize(sideExpandSize: number | string | null) {
        this._sideExpandSize = sideExpandSize ? coerceNumberProperty(sideExpandSize) : 256;
    }

    get sideExpandSize(): number {
        return this._sideExpandSize;
    }

    @Input('contentToggled')
    set toggled(sideToggled: boolean | string | null) {
        this._toggled = coerceBooleanProperty(sideToggled);
    }

    get toggled(): boolean {
        return this._toggled;
    }

    @ContentChild(NGXSeasonLayoutContentSideDirective)
    protected sideTemplate: NGXSeasonLayoutContentSideDirective | undefined;

    @ContentChild(NGXSeasonLayoutContentAreaDirective)
    protected areaTemplate: NGXSeasonLayoutContentAreaDirective | undefined;

    @ViewChild('sideBox', { read: ElementRef, static: true })
    protected sideBox: ElementRef<HTMLDivElement> | undefined;

    @ViewChild('areaBox', { read: ElementRef, static: true })
    protected areaBox: ElementRef<HTMLDivElement> | undefined;

    private _duration: number = 250;
    private _sideShrinkSize: number = 64;
    private _sideExpandSize: number = 256;
    private _toggled: boolean = false;

    protected sidePortal: TemplatePortal | undefined;
    protected areaPortal: TemplatePortal | undefined;

    private player: AnimationPlayer | undefined;

    constructor(
        protected _builder: AnimationBuilder,
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _vcr: ViewContainerRef,
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'sideShrinkSize') this.changeContentSideSize(coerceNumberProperty(changes['sideShrinkSize'].currentValue));

            if (name === 'sideExpandSize') this.changeContentSideSize(coerceNumberProperty(changes['sideExpandSize'].currentValue));

            if (name === 'toggled') this.changeContentSideToggled(coerceBooleanProperty(changes['toggled'].currentValue), this.sideShrinkSize, this.sideExpandSize, this.duration);
        }
    }

    ngAfterContentInit(): void {
        if (this.sideTemplate) this.sidePortal = new TemplatePortal(this.sideTemplate.fetchTemplate(), this._vcr);

        if (this.areaTemplate) this.areaPortal = new TemplatePortal(this.areaTemplate.fetchTemplate(), this._vcr);
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'layout-content');
        this.changeContentSideSize(this.toggled ? this.sideExpandSize : this.sideShrinkSize);
        this.changeContentSideToggled(this.toggled, this.sideShrinkSize, this.sideExpandSize, this.duration);
    }

    private changeContentSideSize(sideSize: number): void {
        if (sideSize < 0 || !this.sideBox || !this.areaBox) throw new Error();

        this._renderer.setStyle(this.sideBox.nativeElement, 'width', `${sideSize}px`);
        this._renderer.setStyle(this.sideBox.nativeElement, 'min-width', `${sideSize}px`);
        this._renderer.setStyle(this.sideBox.nativeElement, 'max-width', `${sideSize}px`);
    }

    private changeContentSideToggled(toggled: boolean, start: number, final: number, duration: number): void {
        if (this.sideExpandSize < 0 || !this.sideBox || !this.areaBox) throw new Error();

        const element: HTMLElement = this.sideBox.nativeElement;

        if (!this.player) {
            this.player = toggled
            ? this._builder.build(useAnimation(horizontalExtraCollapsionExpanionAnimation, { params: { start, final, duration } })).create(element)
            : this._builder.build(useAnimation(horizontalExtraCollapsionExpanionAnimation, { params: { start: final, final: start, duration } })).create(element);
        }

        this.player.onDone(() => {
            this.changeContentSideSize(toggled ? final : start);

            this.player?.destroy();
            this.player = undefined;
        });
        this.player.onStart(() => this.changeContentSideSize(toggled ? start : final));
        this.player.play();
    }

}

