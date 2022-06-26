import {animate, AnimationBuilder, AnimationPlayer, state, style, transition, trigger} from "@angular/animations";
import {coerceNumberProperty} from "@angular/cdk/coercion";
import {
    AfterViewInit,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    Renderer2,
    SimpleChanges
} from "@angular/core";
import {interval, map, Observable} from "rxjs";

import {OctopusRatio} from "../global/enums.utils";

@Component({
    animations: [
        trigger('BRIGHT_MORE_LESS', [
            state('more', style({filter: 'brightness(1.25)'})),
            state('less', style({filter: 'brightness(0.75)'})),
            transition('more <=> less', animate('1000ms 250ms linear'))
        ])
    ],
    template: ''
})
abstract class OctopusAbstractHolder {

    @HostBinding('class') class: string = 'octo-holder';

    flag$: Observable<boolean> = interval(1250).pipe(map(value => value % 2 === 0));

}

@Component({
    selector: 'div[octo-bars-holder]',
    template: `
        <div [@BRIGHT_MORE_LESS]="(flag$ | async) ? 'less' : 'more'"
             class="holder" [class.w-50]="isLast" [class.mb-50]="isFirst" [class.mt-50]="isLast"
             [class.my-50]="!isFirst && !isLast" style="border-radius: 0.125rem;height: 1rem;"
             *ngFor="let item of createLines(lines); first as isFirst; last as isLast"></div>
    `
})
export class OctopusBarsHolder extends OctopusAbstractHolder implements AfterViewInit {

    @Input('octoLines') lines: number | string = 8;

    constructor(
        private _element: ElementRef,
        private _render: Renderer2
    ) {
        super();
    }

    ngAfterViewInit() {
        this._render.addClass(this._element.nativeElement, 'octo-bars-holder');
    }

    createLines(lines: number | string): number[] {
        return Array.from({length: coerceNumberProperty(lines)}).map((_, index) => index);
    }

}

@Component({
    selector: 'div[octo-media-holder]',
    template: ''
})
export class OctopusMediaHolder extends OctopusAbstractHolder implements OnChanges, OnDestroy, AfterViewInit {

    @Input('octoRatio') ratio: OctopusRatio = '1:1';

    private player: AnimationPlayer | null = null;

    constructor(
        private _builder: AnimationBuilder,
        private _element: ElementRef,
        private _render: Renderer2
    ) {
        super();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['ratio']) {
            this.renderRatio(changes['ratio'].currentValue);
        }
    }

    ngAfterViewInit() {
        this._render.addClass(this._element.nativeElement, 'octo-media-holder');
        this._render.addClass(this._element.nativeElement, 'holder');
        this.renderRatio(this.ratio);
        this.createAnimation(true);
    }

    ngOnDestroy() {
        if (this.player !== null) {
            this.player.destroy();
            this.player = null;
        }
    }

    private createAnimation(flag: boolean): void {
        if (this.player === null) {
            this.player = this._builder.build([
                style({filter: flag ? 'brightness(1.25)' : 'brightness(0.75)'}),
                animate('1000ms linear', style({filter: flag ? 'brightness(0.75)' : 'brightness(1.25)'}))
            ]).create(this._element.nativeElement);
        }
        this.player.onDone(() => {
            let task = setTimeout(() => {
                clearTimeout(task);
                this.player = null;
                this.createAnimation(!flag);
            },250);
        });
        this.player.play();
    }

    private renderRatio(ratio: OctopusRatio): void {
        let ratios: string[] = ratio.split(':');
        let task = setTimeout(() => {
            clearTimeout(task);
            this._render.setStyle(this._element.nativeElement, 'height',
                `${this._element.nativeElement.clientWidth * coerceNumberProperty(ratios[1]) / coerceNumberProperty(ratios[0])}px`);
        });
    }

}

@Component({
    selector: 'div[octo-user-holder]',
    template: `
        <div [@BRIGHT_MORE_LESS]="(flag$ | async) ? 'less' : 'more'"
             class="holder" style="border-radius: 50%;margin-right: 0.5rem;width: 3rem;height: 3rem;"></div>
        <div class="bars" style="margin-left: 0.5rem;height: 3rem;">
            <div [@BRIGHT_MORE_LESS]="(flag$ | async) ? 'less' : 'more'" class="holder" style="height: 1rem"></div>
            <div [@BRIGHT_MORE_LESS]="(flag$ | async) ? 'less' : 'more'" class="holder" style="height: 1rem"></div>
        </div>
    `
})
export class OctopusUserHolder extends OctopusAbstractHolder implements AfterViewInit {

    constructor(
        private _element: ElementRef,
        private _render: Renderer2
    ) {
        super();
    }

    ngAfterViewInit() {
        this._render.addClass(this._element.nativeElement, 'octo-user-holder');
    }

}
