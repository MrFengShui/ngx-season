import { Component, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { MatSliderChange } from "@angular/material/slider";

@Component({
    selector: 'app-widgets-tracker',
    templateUrl: './tracker.component.html'
})
export class WidgetsTrackerComponent {

    @Input('bufferValue') bufferValue: number = 50.0;
    @Input('minValue') minValue: number = 0.0;
    @Input('maxValue') maxValue: number = 100.0;
    @Input() value: number = 0.0;

    @Output() valueChange: EventEmitter<number> = new EventEmitter();

    @HostBinding('class') class: string = 'media-tracker';

    listenValueChange(change: MatSliderChange): void {
        this.value = change.value || 0.0;
        this.valueChange.emit(this.value);
    }

}