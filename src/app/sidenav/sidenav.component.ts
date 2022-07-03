import {Direction} from "@angular/cdk/bidi";
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {
    AfterViewInit,
    Component, ContentChild, Directive,
    ElementRef,
    HostBinding,
    Input,
    OnChanges, Renderer2,
    SimpleChanges, TemplateRef,
    ViewChild
} from "@angular/core";
import {animate, AnimationBuilder, AnimationPlayer, style} from "@angular/animations";

import {OctopusColorPalette, OctopusSidenavMode} from "../global/enums.utils";

@Directive({
    selector: '[octo-sidenav]'
})
export class OctopusSidenav {

    constructor(public _template: TemplateRef<any>) {
    }

}

@Directive({
    selector: '[octo-sidenav-content]'
})
export class OctopusSidenavContent {

    constructor(public _template: TemplateRef<any>) {
    }

}

@Component({
    selector: 'octo-sidenav-container',
    template: `
        <div class="octo-sidenav-container-wrapper" [class.flex-row-pos]="direction === 'ltr'"
             [class.flex-row-neg]="direction === 'rtl'">
            <div class="octo-sidenav" [octoShadow]="8" octo-overflow [octoColor]="color"
                 [class.over]="mode === 'over'" #sidenav>
                <ng-container [ngTemplateOutlet]="navbar._template"></ng-container>
            </div>
            <div class="octo-sidenav-content" octo-overflow [octoColor]="color"
                 [style.min-width]="mode === 'push' ? 'calc(100% - ' + minSize + ')' : ''"
                 [style.max-width]="mode === 'push' ? 'calc(100% - ' + minSize + ')' : ''" #sidectn>
                <ng-container [ngTemplateOutlet]="content._template"></ng-container>
            </div>
        </div>
        <ng-content select="octo-sidenav, octo-sidenav-content"></ng-content>
    `
})
export class OctopusSidenavContainer implements OnChanges, AfterViewInit {

    @Input('octoColor') color: OctopusColorPalette = 'base';
    @Input('octoDir') direction: Direction = 'ltr';
    @Input('octoMode') mode: OctopusSidenavMode = 'side';
    @Input('octoMin') minSize: string | null = '4rem';
    @Input('octoMax') maxSize: string | null = '16rem';

    @Input('octoState')
    get state() { return this._state; }
    set state(_state: any) { this._state = coerceBooleanProperty(_state); }
    private _state: boolean = true;

    @ContentChild(OctopusSidenav) navbar!: OctopusSidenav;
    @ContentChild(OctopusSidenavContent) content!: OctopusSidenavContent;

    @ViewChild('sidenav', {read: ElementRef})
    private sidenav!: ElementRef;

    @ViewChild('sidectn', {read: ElementRef})
    private sidectn!: ElementRef;

    @HostBinding('class') class: string = 'octo-sidenav-container';

    constructor(
        private _builder: AnimationBuilder,
        private _render: Renderer2
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['minSize']) {
            this.createAnimation(this.state, changes['minSize'].currentValue, this.maxSize);
        }

        if (changes['maxSize']) {
            this.createAnimation(this.state, this.minSize, changes['maxSize'].currentValue);
        }

        if (changes['state']) {
            this.createAnimation(changes['state'].currentValue, this.minSize, this.maxSize);
        }
    }

    ngAfterViewInit() {
        this.createAnimation(this.state, this.minSize, this.maxSize);
    }

    private createAnimation(state: any, minSize: any, maxSize: any): void {
        let task = setTimeout(() => {
            clearTimeout(task);

            let player: AnimationPlayer | null = this._builder.build([
                style({
                    minWidth: coerceBooleanProperty(state) ? minSize : maxSize,
                    maxWidth: coerceBooleanProperty(state) ? minSize : maxSize
                }),
                animate('100ms linear', style({
                    minWidth: coerceBooleanProperty(state) ? maxSize : minSize,
                    maxWidth: coerceBooleanProperty(state) ? maxSize : minSize
                }))
            ]).create(this.sidenav.nativeElement);
            player.onDone(() => player = null);
            player.play();
        });
    }

}
