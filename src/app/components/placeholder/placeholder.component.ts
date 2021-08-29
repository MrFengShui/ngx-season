import { Direction } from "@angular/cdk/bidi";
import { coerceNumberProperty } from "@angular/cdk/coercion";
import { Component, ElementRef, HostBinding, HostListener, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from "@angular/core";
import { Subject } from "rxjs";

import { MediaType, Ratio } from "src/app/global/enum.utils";

@Component({
    selector: '[octopus-action-placeholder]',
    template: `<div class="placeholder-action" #wrapper></div>`
})
export class OctopusActionPlaceholder implements OnChanges, OnInit {

    @Input('size') size: number | string = 32;

    @ViewChild('wrapper', { read: ElementRef, static: true })
    private wrapper!: ElementRef<HTMLElement>;

    @HostBinding('class') class: string = 'octopus-placeholder';

    constructor(private _render: Renderer2) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.size !== undefined) {
            setTimeout(() => this.renderSize(coerceNumberProperty(changes.size.currentValue)));
        }
    }

    ngOnInit() {
        setTimeout(() => this.renderSize(coerceNumberProperty(this.size)));
    }

    private renderSize(size: number): void {
        this._render.setStyle(this.wrapper.nativeElement, 'width', `calc(${size}px * 21 / 9)`);
        this._render.setStyle(this.wrapper.nativeElement, 'height', `${size}px`);
    }


}

@Component({
    selector: '[octopus-icon-placeholder]',
    template: `
        <div class="placeholder-icon" #wrapper>
            <span class="material-icons" #icon>person</span>
        </div>
    `
})
export class OctopusIconPlaceholder implements OnChanges, OnInit {

    @Input('size') size: number | string = 32;

    @ViewChild('wrapper', { read: ElementRef, static: true })
    private wrapper!: ElementRef<HTMLElement>;

    @ViewChild('icon', { read: ElementRef, static: true })
    private icon!: ElementRef<HTMLElement>;

    @HostBinding('class') class: string = 'octopus-placeholder';

    constructor(private _render: Renderer2) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.size !== undefined) {
            setTimeout(() => this.renderSize(coerceNumberProperty(changes.size.currentValue)));
        }
    }

    ngOnInit() {
        setTimeout(() => this.renderSize(coerceNumberProperty(this.size)));
    }

    private renderSize(size: number): void {
        this._render.setStyle(this.wrapper.nativeElement, 'width', `${size}px`);
        this._render.setStyle(this.wrapper.nativeElement, 'height', `${size}px`);
        this._render.setStyle(this.icon.nativeElement, 'font-size', `calc(${size}px - 0.5rem * 2)`);
    }

}

@Component({
    selector: 'octopus-meta-placeholder',
    template: `
        <div class="d-flex align-items-center">
            <div octopus-icon-placeholder size="48"></div>
            <div class="flex-fill mx-75">
                <div class="placeholder-bar"></div>
                <div class="placeholder-bar"></div>
            </div>
            <div octopus-action-placeholder size="36"></div>
        </div>
    `
})
export class OctopusMetaPlaceholder {

    @HostBinding('class') class: string = 'octopus-placeholder';

}

@Component({
    selector: 'octopus-media-placeholder',
    template: `
        <div class="placeholder-media" #wrapper>
            <span class="material-icons">{{name$ | async}}</span>
        </div>
    `
})
export class OctopusMediaPlaceholder implements OnChanges, OnInit {

    @Input('ratio') ratio: Ratio = '16:9';
    @Input('type') type: MediaType = 'image';

    @ViewChild('wrapper', { read: ElementRef, static: true })
    private wrapper!: ElementRef<HTMLElement>;

    @HostBinding('class') class: string = 'octopus-placeholder';

    @HostListener('window:resize')
    private listenHostResize(): void {
        setTimeout(() => this.renderRatio(this.ratio));
    }

    name$: Subject<string> = new Subject();

    constructor(private _render: Renderer2) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.type !== undefined) {
            setTimeout(() => this.renderMediaType(changes.type.currentValue));
        }

        if (changes.ratio !== undefined) {
            setTimeout(() => this.renderRatio(changes.ratio.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => {
            this.renderMediaType(this.type);
            this.renderRatio(this.ratio);
        });
    }

    private renderMediaType(type: MediaType): void {
        switch (type) {
            case 'audio': this.name$.next('library_music'); break;
            case 'image': this.name$.next('photo_library'); break;
            case 'video': this.name$.next('video_library'); break;
        }
    }

    private renderRatio(ratio: Ratio): void {
        let pair: string[] = ratio.split(':');
        this._render.setStyle(this.wrapper.nativeElement, 'height',
            `${this.wrapper.nativeElement.clientWidth * coerceNumberProperty(pair[1]) / coerceNumberProperty(pair[0])}px`);
    }

}

@Component({
    selector: 'octopus-paragraph-placeholder',
    template: ''
})
export class OctopusParagraphPlaceholder implements OnChanges, OnInit {

    @Input('lines') lines: number | string = 4;

    @HostBinding('class') class: string = 'octopus-placeholder';

    constructor(
        private _ref: ElementRef<HTMLElement>,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.lines !== undefined) {
            setTimeout(() => this.renderDOM(coerceNumberProperty(changes.lines.currentValue)));
        }
    }

    ngOnInit() {
        setTimeout(() => this.renderDOM(coerceNumberProperty(this.lines)));
    }

    private renderDOM(lines: number): void {
        let children: HTMLCollection = this._ref.nativeElement.children;

        for (let i = children.length - 1; i >= 0; i--) {
            this._render.removeChild(this._ref.nativeElement, children.item(i));
        }

        for (let i = 0; i < lines; i++) {
            let element: HTMLElement = this._render.createElement('div');
            this._render.setAttribute(element, 'class', 'placeholder-bar');

            if (i === lines - 1) {
                this._render.addClass(element, 'w-75');
            }

            this._render.appendChild(this._ref.nativeElement, element);
        }
    }

}

@Component({
    selector: 'octopus-nodata-placeholder',
    templateUrl: './nodata.component.html'
})
export class OctopusNoDataPlaceholder {

    @Input('icon') icon: string = 'assets/icons/nodata.png';
    @Input('text') text: string = 'No Data Available';

    @HostBinding('class') class: string = 'octopus-nodata-placeholder';

}

@Component({
    selector: 'octopus-loading-placeholder',
    templateUrl: './loading.component.html'
})
export class OctopusLoadingPlaceholder implements OnChanges, OnInit {

    @Input('icon') icon: string = 'assets/icons/spinner.png';
    @Input('direction') direction: 'cw' | 'ccw' = 'cw';
    @Input('duration') duration: number | string = 2500;
    @Input('text') text: string = 'Loading...';

    @ViewChild('rotate', { read: ElementRef, static: true })
    private rotate!: ElementRef<HTMLElement>;

    @HostBinding('class') class: string = 'octopus-loading-placeholder';

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.duration !== undefined) {
            setTimeout(() => this._render.setStyle(this.rotate.nativeElement, 'animation-duration',
                `${coerceNumberProperty(changes.duration.currentValue)}ms`));
        }
    }

    ngOnInit() {
        setTimeout(() => {
            let parent: HTMLElement = this._render.parentNode(this._ref.nativeElement);
            this._render.setStyle(parent, 'position', 'relative');
            this._render.setStyle(this.rotate.nativeElement, 'animation-duration', `${coerceNumberProperty(this.duration)}ms`);
        });
    }

}