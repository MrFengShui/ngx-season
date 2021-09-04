import { TemplatePortal } from "@angular/cdk/portal";
import { AfterContentInit, Component, ContentChild, Directive, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef } from "@angular/core";
import { Subject } from "rxjs";

import { ValidationType } from "./field.utils";

@Component({
    selector: 'label[octopus-form-label]',
    template: `
        <ng-template #template>
            <ng-content></ng-content>
        </ng-template>
    `
})
export class OcotpusFormLabel {

    @Input('required') isRequired: boolean = false;

    @ViewChild('template', { read: TemplateRef, static: true })
    private template!: TemplateRef<any>;

    @HostBinding('class') class: string = 'octopus-form-label';

    constructor(private _vcr: ViewContainerRef) { }

    createPortal(): TemplatePortal<any> {
        if (this.template === undefined) {
            throw new Error('Error: ');
        }

        return new TemplatePortal(this.template, this._vcr);
    }

}

@Component({
    selector: '[octopus-form-valid]',
    template: `<ng-content></ng-content>`
})
export class OcotpusFormValidation implements OnChanges, OnInit {

    @Input('state') state: ValidationType = 'hint';

    @HostBinding('class') class: string = 'octopus-form-valid';

    constructor(
        private _ref: ElementRef<HTMLElement>,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.state !== undefined) {
            setTimeout(() => this.renderState(changes.state.previousValue, changes.state.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => this.renderState(undefined, this.state));
    }

    private renderState(prevState: ValidationType | undefined, currState: ValidationType): void {
        this._render.removeClass(this._ref.nativeElement, prevState === undefined ? 'valid-hint' : `valid-${prevState}`);
        this._render.addClass(this._ref.nativeElement, `valid-${currState}`);
    }

}

@Component({
    selector: 'input[octopus-form-input]',
    template: ''
})
export class OcotpusFormInput {

    @HostBinding('class') class: string = 'octopus-form-input';

}

@Component({
    selector: 'octopus-form-field',
    templateUrl: './field.component.html'
})
export class OctopusFormField implements OnInit, AfterContentInit {

    @Input('appearance') appearance: string = 'outline';
    @Input('state') validState: string = '';

    @ContentChild(OcotpusFormInput, { read: ElementRef, static: true })
    private input!: ElementRef<OcotpusFormInput>;

    @HostBinding('class') class: string = 'octopus-form-field';

    state$: Subject<boolean> = new Subject();

    constructor(private _render: Renderer2) { }

    ngOnInit() {
        this.state$.next(false);
    }

    ngAfterContentInit() {
        setTimeout(() => {
            let element: HTMLInputElement = this.input.nativeElement as unknown as HTMLInputElement;
            element.onfocus = () => this.state$.next(true);
            element.onblur = () => this.state$.next(false);
        });
    }

}

@Directive({
    selector: '[octopus-form-postfix]'
})
export class OcotpusFormPostfix {

    @HostBinding('class') class: string = 'octopus-form-postfix';

}

@Directive({
    selector: '[octopus-form-prefix]'
})
export class OcotpusFormPrefix {

    @HostBinding('class') class: string = 'octopus-form-prefix';

}