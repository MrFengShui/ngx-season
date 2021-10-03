import { animate, state, style, transition, trigger } from "@angular/animations";
import { Directionality } from "@angular/cdk/bidi";
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { CdkStep, CdkStepHeader, CdkStepLabel, CdkStepper, CdkStepperNext, CdkStepperPrevious, StepperOptions, STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { DOCUMENT } from "@angular/common";
import { AfterContentInit, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, forwardRef, HostBinding, Inject, Input, OnChanges, OnInit, Optional, QueryList, Renderer2, SimpleChanges, TemplateRef } from "@angular/core";

import { ColorPalette } from "src/app/global/enum.utils";

@Directive({
    selector: '[octopus-step-label]'
})
export class OctopusStepLabel extends CdkStepLabel { }

@Directive({
    selector: '[octopus-step-header]'
})
export class OctopusStepHeader extends CdkStepHeader {

    @HostBinding('class') class: string = 'octopus-step-header';

}

@Directive({
    selector: '[octopus-step-action]'
})
export class OctopusStepAction {

    constructor(public _template: TemplateRef<any>) { }

}

@Component({
    selector: 'octopus-step',
    template: `<ng-template><ng-content></ng-content></ng-template>`
})
export class OctopusStep extends CdkStep implements AfterContentInit {

    @ContentChild(OctopusStepAction)
    private _action!: OctopusStepAction;

    action!: TemplateRef<any>;

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2,
        @Inject(forwardRef(() => OctopusStepper))
        _stepper: OctopusStepper,
        @Optional()
        @Inject(STEPPER_GLOBAL_OPTIONS)
        _options?: StepperOptions
    ) {
        super(_stepper, _options);
    }

    ngAfterContentInit() {
        this.action = this._action._template;
    }

}

@Directive({
    selector: 'button[octopus-stepper-next]'
})
export class OctopusStepperNext extends CdkStepperNext {

    @HostBinding('class') class: string = 'octopus-stepper-next';

    constructor(
        @Inject(forwardRef(() => OctopusStepper))
        _stepper: OctopusStepper
    ) {
        super(_stepper);
    }

}

@Directive({
    selector: 'button[octopus-stepper-previous]'
})
export class OctopusStepperPrevious extends CdkStepperPrevious {

    @HostBinding('class') class: string = 'octopus-stepper-previous';

    constructor(
        @Inject(forwardRef(() => OctopusStepper))
        _stepper: OctopusStepper
    ) {
        super(_stepper);
    }

}

@Component({
    animations: [
        trigger('MOVE', [
            state('show', style({
                transform: 'translateX(0%)'
            })),
            state('hide', style({
                transform: 'translateX(100%)'
            })),
            transition('show => hide', animate('250ms ease-in-out')),
            transition('hide => show', animate('250ms ease-in-out')),
        ]),
    ],
    selector: 'octopus-stepper',
    template: `
        <div class="octopus-stepper-wrapper">
            <div class="octopus-stepper-head">
                <ng-container *ngFor="let step of steps; index as i; last as isLast">
                    <a octopus-step-header octopus-ripple (click)="i === 0 ? reset() : selectedIndex = i">
                        <span class="octopus-step-header-logo mr-25">
                            <octopus-icon *ngIf="step.completed">check</octopus-icon>
                            <span *ngIf="!step.completed">{{i + 1}}</span>
                        </span>
                        <span class="octopus-step-header-text ml-25">{{step.label}}</span>
                    </a>
                    <div class="octopus-step-line" *ngIf="!isLast"></div>
                </ng-container>
            </div>
            <div class="octopus-stepper-body">
                <div class="octopus-step" [class.d-none]="i !== selectedIndex"
                    [@MOVE]="i === selectedIndex ? 'show' : 'hide'" 
                    *ngFor="let step of steps; index as i">
                    <ng-container [ngTemplateOutlet]="step.content"></ng-container>
                </div>
            </div>
            <div octopus-divider *ngIf="control"></div>
            <div class="octopus-stepper-foot" *ngIf="control">
                <ng-container *ngFor="let step of steps; index as i">
                    <div class="octopus-stepper-action" [class.d-none]="i !== selectedIndex"
                        [@MOVE]="i === selectedIndex ? 'show' : 'hide'">
                        <ng-container [ngTemplateOutlet]="step.action"></ng-container>
                    </div>
                </ng-container>
            </div>
        </div>
    `
})
export class OctopusStepper extends CdkStepper implements OnChanges, OnInit {

    @Input('color') color: ColorPalette = 'base';

    @Input('control') set control(_control: any) { this._control = coerceBooleanProperty(_control); }

    get control(): any { return this._control; }

    private _control: any = false;

    @ContentChildren(OctopusStep, { descendants: true }) _steps!: QueryList<OctopusStep>;

    @HostBinding('class') class: string = 'octopus-stepper';

    readonly steps: QueryList<OctopusStep> = new QueryList();

    constructor(
        _dir: Directionality,
        private _cdr: ChangeDetectorRef,
        private _ref: ElementRef,
        private _render: Renderer2,
        @Inject(DOCUMENT)
        private _doc: any
    ) {
        super(_dir, _cdr, _ref, _doc);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.color !== undefined) {
            setTimeout(() => this.renderColor(changes.color.previousValue, changes.color.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => this.renderColor(undefined, this.color));
    }

    previous(): void {
        super.previous();
        this.steps.get(this.selectedIndex + 1)?.reset();
        this.steps.get(this.selectedIndex)?.reset();
    }

    private renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-base-stepper' : `octopus-${prevColor}-stepper`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-stepper`);
    }

}