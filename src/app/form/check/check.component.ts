import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, HostBinding, HostListener, Input, Output, Renderer2, SimpleChanges, ViewChild } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { of } from "rxjs";

import { AbstractOctopusToggle } from "src/app/global/base.utils";
import { ColorPalette } from "src/app/global/enum.utils";

let checkID: number = 0;

@Component({
    selector: 'octopus-checkbox',
    template: `
        <label class="octopus-checkbox-wrapper" [for]="'octopus-checkbox-' + (id$ | async)">
            <input type="checkbox" [id]="'octopus-checkbox-' + (id$ | async)" [checked]="checked" (change)="updateChange(input.checked)" class="d-none" #input>
            <span class="material-icons" [class.active]="checked || indeterminated">{{updateState(checked,
                indeterminated)}}</span>
            <span class="octopus-checkbox-content" #content>
                <ng-content></ng-content>
            </span>
        </label>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => OctopusCheckbox),
        multi: true
    }]
})
export class OctopusCheckbox extends AbstractOctopusToggle implements AfterViewInit {

    @Input('indeterminated') indeterminated: boolean = false;

    @Output('indeterminatedChange') indeterminatedChange: EventEmitter<boolean> = new EventEmitter();
    @Output('selectedChange') selectedChange: EventEmitter<boolean> = new EventEmitter();

    @ViewChild('content', { read: ElementRef, static: true })
    private content!: ElementRef<HTMLElement>;

    @HostBinding('class') class: string = 'octopus-checkbox';

    @HostListener('click')
    handleClickAction(): void {
        this.updateChange(!this.checked);
    }

    constructor(
        protected _ref: ElementRef,
        protected _render: Renderer2
    ) {
        super(_ref, _render);
    }

    ngAfterViewInit() {
        this.id$ = of(++checkID);

        if (this.content.nativeElement.childElementCount === 0 && this.content.nativeElement.textContent?.length === 0) {
            this._render.setStyle(this._ref.nativeElement, 'width', 'fit-content');
        }
    }

    updateState(selected: boolean, indeterminated: boolean): string {
        if (indeterminated) {
            return 'indeterminate_check_box';
        } else {
            return selected ? 'check_box' : 'check_box_outline_blank';
        }
    }

    protected renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-checkbox' : `octopus-${prevColor}-checkbox`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-checkbox`);
    }

}