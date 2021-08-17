import { Component, Directive, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from "@angular/core";

@Directive({
    selector: '[octopus-form-valid]'
})
export class OcotpusFormValidation implements OnChanges, OnInit {

    @Input('state') state: string = 'hint';

    @HostBinding('class') class: string = 'octopus-form-valid';

    constructor(
        private _ref: ElementRef<HTMLElement>,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        this.build(changes.state === undefined ? this.state : changes.state.currentValue);
    }

    ngOnInit() {
        this.build(this.state);
    }

    private build(state: string): void {
        setTimeout(() => this._render.addClass(this._ref.nativeElement, `valid-${state}`));
    }

}