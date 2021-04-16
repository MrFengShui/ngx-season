import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, Output, QueryList, Renderer2, ViewChildren } from "@angular/core";
import { Subscription, timer } from "rxjs";

import { SCALE_SWITCH } from "src/app/animations/scale.animation";

import { CarouselUnitModel } from "src/app/models/widget/carousel.model";

@Component({
    selector: 'app-widgets-carousel',
    templateUrl: './carousel.component.html',
    animations: [SCALE_SWITCH]
})
export class WidgetsCarouselComponent implements OnDestroy, AfterViewInit {

    @Input('sources') sources: CarouselUnitModel[] | undefined;
    @Input('duration') duration: number | undefined = 5000;
    @Input() index: number = 0;

    @Output() indexChange: EventEmitter<number> = new EventEmitter();
    @Output('source') sourceChange: EventEmitter<CarouselUnitModel> = new EventEmitter();

    @ViewChildren('item', { read: ElementRef })
    items!: QueryList<ElementRef<HTMLAnchorElement>>;

    @HostBinding('class') class: string = 'carousel';

    subscription!: Subscription;

    CM_TYPE: any = { 1: 'audio', 2: 'video', 3: 'article', 4: 'gallery' }

    constructor(private render: Renderer2) { }

    ngAfterViewInit() {
        if (this.sources !== undefined) {
            this.indexChange.emit(this.index);
            this.sourceChange.emit(this.sources[this.index]);
        }

        this.subscription = timer(this.duration, this.duration).subscribe(() => {
            if (this.sources !== undefined) {
                this.index = (this.index + 1) % this.sources.length;
                this.indexChange.emit(this.index);
                this.sourceChange.emit(this.sources[this.index]);
            }
        });
    }

    ngOnDestroy() {
        if (this.subscription !== undefined && !this.subscription.closed) {
            this.subscription.unsubscribe();
        }
    }

    handleSelectEvent(event: MouseEvent, index: number): void {
        this.index = index;
        this.indexChange.emit(index);

        if (this.sources !== undefined) {
            this.sourceChange.emit(this.sources[index]);
        }
    }

}
