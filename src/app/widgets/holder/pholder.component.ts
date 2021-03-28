import { AfterViewInit, Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-widgets-paragraph-holder',
    templateUrl: './pholder.component.html',
    encapsulation: ViewEncapsulation.None
})
export class WidgetsParagraphHolderComponent implements OnChanges, OnInit {

    @Input('lines') lines!: number;

    @HostBinding('class') class: string = 'holder paragraph-holder';

    array!: number[];

    ngOnChanges(changes: SimpleChanges) {
        if (changes.lines !== undefined) {
            this.array = new Array(changes.lines.currentValue);
        }
    }

    ngOnInit() {
        if (this.lines === undefined) {
            this.lines = 5;
        }

        this.array = new Array(this.lines);
    }

}