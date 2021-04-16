import { Directive, ElementRef, HostBinding, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";

@Directive({
    selector: '[app-tbholder]'
})
export class WidgetsToolbarHolderDirective implements OnChanges {

    @Input('count') count: string | number = '4' || 4;

    @HostBinding('class') class: string = 'holder tb-holder';

    constructor(
        private er: ElementRef<HTMLElement>,
        private render: Renderer2
    ) {
        this.buildHTML(this.count as number);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.buildHTML(changes.count.currentValue as number);
    }

    private buildHTML(length: number): void {
        this.render.setStyle(this.er.nativeElement, 'grid-template-columns', `repeat(${length}, minmax(7em, 1fr))`);
        this.er.nativeElement.innerHTML = '';

        for (let i = 0; i < length; i++) {
            this.er.nativeElement.innerHTML += `<div class="holder-unit"></div>`;
        }
    }

}