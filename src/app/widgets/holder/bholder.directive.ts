import { Directive, ElementRef, HostBinding, Input, OnChanges, SimpleChanges } from "@angular/core";

@Directive({
    selector: '[app-bholder]'
})
export class WidgetsBlockHolderDirective implements OnChanges {

    @Input('ratio') ratio: string = '4:3';

    @HostBinding('class') class: string = 'holder b-holder';

    constructor(private er: ElementRef<HTMLElement>) {
        this.buildHTML(this.ratio.split(':'));
    }

    ngOnChanges(changes: SimpleChanges) {
        this.buildHTML(changes.ratio.currentValue.split(':'));
    }

    private buildHTML(ratio: string[]): void {
        let task: number = setTimeout(() => {
            let size: number = this.er.nativeElement.clientWidth;
            let widthFrac: number = parseFloat(ratio[0]);
            let heightFac: number = parseFloat(ratio[1]);
            this.er.nativeElement.innerHTML = `<div class="holder-unit" style="height: ${size * heightFac / widthFrac}px;"></div>`;
            clearTimeout(task);
        });
    }

}