import { Directive, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from "@angular/core";

@Directive({
    selector: '[octopus-form-label]'
})
export class OcotpusFormLabel implements OnChanges, OnInit {

    @Input('required') isRequired: boolean = false;

    @HostBinding('class') class: string = 'octopus-form-label';

    private symbol: HTMLElement = this._render.createText(' * ');

    constructor(
        private _ref: ElementRef<HTMLElement>,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        this.build(changes.isRequired === undefined ? this.isRequired : changes.isRequired.currentValue);
    }

    ngOnInit() {
        this.build(this.isRequired);
    }

    private build(isRequired: boolean): void {
        if (isRequired) {
            this._render.appendChild(this._ref.nativeElement, this.symbol);
        } else {
            this._render.removeChild(this._ref.nativeElement, this.symbol);
        }
    }

}