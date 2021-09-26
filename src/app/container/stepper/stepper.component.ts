import { Directionality } from "@angular/cdk/bidi";
import { CdkStep, CdkStepHeader, CdkStepLabel, CdkStepper } from "@angular/cdk/stepper";
import { AfterContentInit, ChangeDetectorRef, Component, ContentChildren, Directive, ElementRef, HostBinding, HostListener, Input, OnChanges, OnInit, QueryList, Renderer2, SimpleChanges } from "@angular/core";

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

@Component({
    selector: 'octopus-step',
    template: `
        <div class="octopus-step-wrapper">
            <ng-content></ng-content>
        </div>
    `
})
export class OctopusStep extends CdkStep {

    @HostBinding('class') class: string = 'octopus-step';

    @HostListener('click')
    private listenHostClick(): void {
        this.select();
    }

}

@Component({
    selector: 'octopus-stepper',
    template: `
        <div class="octopus-stepper-wrapper">
            <div class="octopus-stepper-head">
                <ng-container *ngFor="let labelItem of labelList; index as i">
                    <a octopus-step-header octopus-ripple>
                        <span class="octopus-step-header-logo mr-25">
                            <octopus-icon>check</octopus-icon>
                        </span>
                        <span class="octopus-step-header-text ml-25">{{labelItem}}</span>
                    </a>
                    <div class="octopus-step-line" *ngIf="i !== labelList.length - 1"></div>
                </ng-container>
            </div>
            <div class="octopus-stepper-body">
                <ng-content select="octopus-step"></ng-content>
            </div>
        </div>
    `
})
export class OctopusStepper extends CdkStepper implements OnChanges, OnInit {

    @Input('color') color: ColorPalette = 'base';

    @ContentChildren(OctopusStep)
    private osteps!: QueryList<OctopusStep>;

    @HostBinding('class') class: string = 'octopus-stepper';

    labelList: string[] = [];

    constructor(
        _dir: Directionality,
        private _cdr: ChangeDetectorRef,
        private _ref: ElementRef,
        private _render: Renderer2
    ) {
        super(_dir, _cdr, _ref, undefined);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.color !== undefined) {
            setTimeout(() => this.renderColor(changes.color.previousValue, changes.color.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => this.renderColor(undefined, this.color));
    }

    ngAfterContentInit() {
        super.ngAfterContentInit();
        this.osteps.forEach(step => this.labelList.push(step.label));
    }

    private renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-base-stepper' : `octopus-${prevColor}-stepper`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-stepper`);
    }

}