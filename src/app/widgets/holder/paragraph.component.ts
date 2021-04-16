import { Component, HostBinding, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
    selector: 'app-widgets-paragraph-holder',
    template: `
        <div class="holder-wrapper">
            <div class=" {{i === lines - 1 ? 'holder-half-bar' : 'holder-bar'}}" *ngFor="let item of array; index as i"></div>
        </div>
    `
})
export class WidgetsParagraphHolderComponent implements OnChanges {

    @Input('lines') lines: number = 5;

    @HostBinding('class') class: string = 'holder paragraph-holder w-100';

    array: number[] = new Array(this.lines);

    ngOnChanges(changes: SimpleChanges) {
        this.array = new Array(this.lines);
    }

}