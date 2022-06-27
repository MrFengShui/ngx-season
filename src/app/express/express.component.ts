import {
    AfterViewInit,
    Component, ContentChildren,
    ElementRef,
    HostBinding,
    Input,
    OnChanges, OnDestroy, QueryList,
    Renderer2,
    SimpleChanges, ViewChild
} from "@angular/core";
import {animate, AnimationBuilder, AnimationPlayer, style} from "@angular/animations";

import {OCTOPUS_COLOR_PALETTES, OctopusColorPalette, OctopusSpeed} from "../global/enums.utils";
import {coerceNumberProperty} from "@angular/cdk/coercion";
import {BehaviorSubject, Subject} from "rxjs";

@Component({
    selector: 'octo-express-head',
    template: `<ng-content></ng-content>`
})
export class OctopusExpressHead {

    @HostBinding('class') class: string = 'octo-express-head';

}

@Component({
    selector: 'octo-express-item',
    template: `
        <octo-icon class="mr-50">{{icon$ | async}}</octo-icon>
        <span class="octo-express-item-text ml-50">{{text}}</span>
    `
})
export class OctopusExpressItem implements OnDestroy {

    @Input('octoText') text: string = '';

    @HostBinding('class') class: string = 'octo-express-item';

    icon$: Subject<string> = new BehaviorSubject<string>('');

    ngOnDestroy() {
        this.icon$.complete();
    }

}

@Component({
    selector: 'octo-express',
    template: `
        <div class="octo-express-wrapper" #wrapper>
            <div class="octo-express-list sx-100" style="visibility: hidden" #list>
                <ng-content select="octo-express-head"></ng-content>
                <ng-content select="octo-express-item"></ng-content>
            </div>
        </div>
    `
})
export class OctopusExpress implements OnChanges, AfterViewInit {

    @Input('octoColor') color: OctopusColorPalette = 'accent';
    @Input('octoDelay') delay: OctopusSpeed = 'normal';
    @Input('octoIcon') icon: string = 'stream';
    @Input('octoLoop') loop: number | string = 0;

    @ContentChildren(OctopusExpressItem)
    private items!: QueryList<OctopusExpressItem>;

    @ViewChild('wrapper', {read: ElementRef})
    private _wrapper!: ElementRef;

    @ViewChild('list', {read: ElementRef})
    private _list!: ElementRef;

    @HostBinding('class') class: string = 'octo-express';

    private player: AnimationPlayer | null = null;

    constructor(
        private _builder: AnimationBuilder,
        private _element: ElementRef,
        private _render: Renderer2
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['color']) {
            this.renderColor(changes['color'].currentValue);
        }

        if (changes['delay']) {
            this.createAnimation(changes['delay'].currentValue, this.loop);
        }

        if (changes['icon']) {
            this.renderIcon(changes['icon'].currentValue);
        }

        if (changes['loop']) {
            this.createAnimation(this.delay, changes['loop'].currentValue);
        }
    }

    ngAfterViewInit() {
        this.renderColor(this.color);
        this.renderIcon(this.icon);
        this.createAnimation(this.delay, this.loop);
    }

    private createAnimation(speed: OctopusSpeed, loop: number | string, count: number = 1): void {
        if (this.player !== null) {
            this.player.finish();
            this.player = null;
        }

        if (coerceNumberProperty(loop) === 0 || count <= coerceNumberProperty(loop)) {
            let task = setTimeout(() => {
                clearTimeout(task);
                this._render.removeStyle(this._list.nativeElement, 'visibility');

                let origin: number = this._wrapper.nativeElement.clientWidth;
                let offset: number = this._wrapper.nativeElement.clientWidth + this._list.nativeElement.clientWidth;

                this.player = this._builder.build([
                    style({transform: `translateX(${origin}px)`}),
                    animate(`${offset * OctopusExpress.matchSpeed(speed)}ms linear`,
                        style({transform: `translateX(-${offset}px)`}))
                ]).create(this._list.nativeElement);
                this.player.play();
                this.player.onDone(() => {
                    this.createAnimation(speed, loop, count + 1);
                    this.player?.finish();
                    this.player?.destroy();
                    this.player = null;
                });
            }, 1000);
        }
    }

    private static matchSpeed(speed: OctopusSpeed): number {
        switch (speed) {
            case 'fast': return 5;
            case 'normal': return 10;
            case 'slow': return 15;
        }
    }

    private renderColor(color: OctopusColorPalette): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_COLOR_PALETTES.forEach(item =>
                this._render.removeClass(this._element.nativeElement, `octo-express-${item}`));

            if (color === 'primary' || color === 'accent') {
                this._render.addClass(this._element.nativeElement, `octo-express-${color}`)
            }
        });
    }

    private renderIcon(icon: string): void {
        let task = setTimeout(() => {
            clearTimeout(task);

            if (this.items) {
                this.items.forEach(item => item.icon$.next(icon));
            }
        });
    }

}
