import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    HostBinding, Input, NgZone, OnChanges,
    QueryList, Renderer2, SimpleChanges,
    ViewChildren
} from "@angular/core";
import {
    CdkStep,
    CdkStepHeader,
    CdkStepper
} from "@angular/cdk/stepper";
import {animate, AnimationBuilder, AnimationPlayer, style} from "@angular/animations";
import {Directionality} from "@angular/cdk/bidi";
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {Subscription} from "rxjs";

import {OCTOPUS_COLOR_PALETTES, OctopusColorPalette} from "../global/enums.utils";

@Component({
    selector: 'octo-stepper-header',
    template: `<ng-content></ng-content>`
})
export class OctopusStepperHeader extends CdkStepHeader implements OnChanges, AfterViewInit {

    @Input('octoColor') color: OctopusColorPalette = 'primary';

    @Input('octoActive')
    get active() { return this._active; }
    set active(_active: any) { this._active = coerceBooleanProperty(_active); }
    private _active: boolean = false;

    @HostBinding('class') class: string = 'octo-stepper-header';

    constructor(
        _element: ElementRef,
        private _render: Renderer2
    ) {
        super(_element);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['active']) {
            this.renderActive(changes['active'].currentValue);
        }

        if (changes['color']) {
            this.renderColor(changes['color'].currentValue);
        }
    }

    ngAfterViewInit() {
        this.renderActive(this.active);
        this.renderColor(this.color);
    }

    private renderActive(active: boolean): void {
        let task = setTimeout(() => {
            clearTimeout(task);

            if (active) {
                this._render.addClass(this._elementRef.nativeElement, 'active');
            } else {
                this._render.removeClass(this._elementRef.nativeElement, 'active');
            }
        });
    }

    private renderColor(color: OctopusColorPalette): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_COLOR_PALETTES.forEach(item =>
                this._render.removeClass(this._elementRef.nativeElement, `octo-stepper-header-${item}`));

            if (color !== 'base') {
                this._render.addClass(this._elementRef.nativeElement, `octo-stepper-header-${color}`);
            }
        });
    }

}

@Component({
    selector: 'octo-step',
    template: `<ng-template><ng-content></ng-content></ng-template>`,
    providers: [{provide: CdkStep, useExisting: OctopusStep}]
})
export class OctopusStep extends CdkStep {

}

@Component({
    selector: 'octo-stepper',
    template: `
        <div class="octo-stepper-head">
            <ng-container *ngFor="let step of steps; index as i; last as isLast">
                <octo-stepper-header [octoActive]="i <= selectedIndex" [octoColor]="step.hasError ? 'failure' : color">
                    <div octo-ripple></div>
                    <div class="octo-stepper-head-mark">
                        <octo-icon *ngIf="step.completed">done</octo-icon>
                        <ng-container *ngIf="!step.completed">
                            <span style="font-size: 1.5rem;font-weight: bold;"
                                  *ngIf="selectedIndex !== i">{{i + 1}}</span>
                            <octo-icon *ngIf="selectedIndex === i">edit</octo-icon>
                        </ng-container>
                    </div>
                    <div class="octo-stepper-head-text">
                        <span class="octo-stepper-label">{{step.label}}</span>
                        <span class="octo-stepper-error" *ngIf="step.hasError">{{step.errorMessage}}</span>
                    </div>
                </octo-stepper-header>
                <hr class="octo-stepper-joint" *ngIf="!isLast">
            </ng-container>
        </div>
        <octo-split-line></octo-split-line>
        <div class="octo-stepper-body">
            <div class="octo-stepper-loader" [class.active]="i === selectedIndex" *ngFor="let step of steps; index as i">
                <div class="octo-stepper-loader-wrapper" #loader>
                    <ng-container [ngTemplateOutlet]="step.content"></ng-container>
                </div>
            </div>
        </div>
        <octo-split-line></octo-split-line>
        <div class="octo-stepper-foot sx-50">
            <button octo-btn (click)="previous()" [style.visibility]="selectedIndex === 0 ? 'hidden' : 'visible'">
                {{backLabel}}
            </button>
            <button octo-btn (click)="selectedIndex === steps.length - 1 ? reset() : next()">
                {{selectedIndex === steps.length - 1 ? doneLabel : nextLabel}}
            </button>
        </div>
        <ng-template><ng-content></ng-content></ng-template>
    `,
    providers: [
        {provide: CdkStepper, useExisting: OctopusStepper}
    ]
})
export class OctopusStepper extends CdkStepper {

    @Input('octoColor') color: OctopusColorPalette = 'primary';
    @Input('octoBackLabel') backLabel: string = 'Back';
    @Input('octoNextLabel') nextLabel: string = 'Next';
    @Input('octoDoneLabel') doneLabel: string = 'Done';

    @ContentChildren(OctopusStep) override steps!: QueryList<OctopusStep>;

    @ViewChildren('loader', {read: ElementRef})
    private loaders!: QueryList<ElementRef>;

    @HostBinding('class') class: string = 'octo-stepper octo-shadow-2';

    private subscription!: Subscription;

    constructor(
        _cdr: ChangeDetectorRef,
        _dir: Directionality,
        _element: ElementRef,
        private _builder: AnimationBuilder,
        private _render: Renderer2,
        private _zone: NgZone
    ) {
        super(_dir, _cdr, _element);
    }

    override ngOnDestroy() {
        super.ngOnDestroy();

        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    override ngAfterViewInit() {
        super.ngAfterViewInit();
        this.initialize(this.selectedIndex);
        this.listenSelectionChange()
    }

    private initialize(index: number): void {
        if (this.loaders) {
            this.loaders.forEach((loader, i) => {
                if (i === index) {
                    this._render.setStyle(loader.nativeElement, 'visibility', 'visible');
                } else {
                    this._render.setStyle(loader.nativeElement, 'visibility', 'hidden');
                }
            });
        }
    }

    private listenSelectionChange(): void {
        this.subscription = this._zone.runOutsideAngular(() =>
            this.selectionChange.asObservable().subscribe(value => {
                if (value.selectedIndex < value.previouslySelectedIndex) {
                    value.selectedStep.reset();
                    value.previouslySelectedStep.reset();
                }

                this.createEnterAnimate(value.selectedIndex, value.previouslySelectedIndex,
                    value.selectedIndex > value.previouslySelectedIndex);
                this.createExitAnimate(value.previouslySelectedIndex, value.selectedIndex,
                    value.selectedIndex > value.previouslySelectedIndex);
            }));
    }

    private createEnterAnimate(currIndex: number, prevIndex: number, flag: boolean): void {
        let currBox: any = this.loaders.get(currIndex)?.nativeElement;
        let prevBox: any = this.loaders.get(prevIndex)?.nativeElement;
        let player: AnimationPlayer | null = this._builder.build([
            style({transform: flag ? 'translateX(100%)' : 'translateX(-100%)'}),
            animate('1000ms linear', style({transform: 'translateX(0%)'}))
        ]).create(currBox);
        player.onStart(() => {
            this._render.removeStyle(currBox, 'visibility');
            this._render.removeStyle(prevBox, 'visibility');
        });
        player.onDone(() => player = null);
        player.play();
    }

    private createExitAnimate(currIndex: number, prevIndex: number, flag: boolean): void {
        let currBox: any = this.loaders.get(currIndex)?.nativeElement;
        let prevBox: any = this.loaders.get(prevIndex)?.nativeElement;
        let player: AnimationPlayer | null = this._builder.build([
            style({transform: 'translateX(0%)'}),
            animate('1000ms linear', style({transform: flag ? 'translateX(-100%)' : 'translateX(100%)'}))
        ]).create(currBox);
        player.onStart(() => {
            this._render.removeStyle(currBox, 'visibility');
            this._render.removeStyle(prevBox, 'visibility');
        });
        player.onDone(() => player = null);
        player.play();
    }

}
