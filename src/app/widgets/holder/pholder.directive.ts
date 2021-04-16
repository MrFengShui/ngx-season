import { Directive, ElementRef, HostBinding, Input, OnChanges, SimpleChanges } from "@angular/core";

@Directive({
    selector: '[app-pholder]'
})
export class WidgetsParagraphHolderDirective implements OnChanges {

    @Input('lines') lines: string | number = '4' || 4;

    @HostBinding('class') class: string = 'holder p-holder';

    constructor(private er: ElementRef<HTMLElement>) {
        this.buildHTML(this.lines as number);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.buildHTML(changes.lines.currentValue as number);
    }

    private buildHTML(length: number): void {
        this.er.nativeElement.innerHTML = '';

        for (let i = 0; i < length; i++) {
            this.er.nativeElement.innerHTML += i === length - 1
                ? `<div class="holder-unit" style="width: 75%;"></div>`
                : `<div class="holder-unit"></div>`;
        }
    }

}