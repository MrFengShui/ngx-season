import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output, QueryList, Renderer2, ViewChildren } from "@angular/core";
import { Subscription, timer } from "rxjs";

import { SimpleImageLinkModel } from "src/app/models/public.model";

@Component({
    selector: 'app-widgets-carousel',
    templateUrl: './carousel.component.html'
})
export class WidgetsCarouselComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input('images') images!: Array<SimpleImageLinkModel | undefined>;
    @Input('fitWidth') fitWidth!: string;
    @Input('fitHeight') fitHeight!: string;

    @Output('subject') subjectChange: EventEmitter<string> = new EventEmitter();

    @ViewChildren('imageItem', { read: ElementRef, emitDistinctChangesOnly: true })
    items!: QueryList<ElementRef<HTMLImageElement>>;
    @ViewChildren('imageOrbit', { read: ElementRef, emitDistinctChangesOnly: true })
    orbits!: QueryList<ElementRef<HTMLDivElement>>;

    @HostBinding('class') class: string = 'carousel';

    duration!: number;
    index!: number;
    isActive!: boolean;

    timerSub!: Subscription;

    constructor(private render: Renderer2) { }

    ngOnInit() {
        if (this.images === undefined) {
            this.images = [];
        }

        if (this.fitWidth === undefined) {
            this.fitWidth = '100%';
        }

        if (this.fitHeight === undefined) {
            this.fitHeight = '100%';
        }

        this.duration = 5000;
        this.index = 0;
        this.isActive = true;
    }

    ngAfterViewInit() {
        this.render.setAttribute(this.items.get(this.index)?.nativeElement, 'class', 'image-fade');
        this.render.setAttribute(this.orbits.get(this.index)?.nativeElement, 'class', 'orbit mx-50 active');
        this.subjectChange.emit(this.images[this.index]?.subject);
        this.timerSub = timer(this.duration, this.duration).subscribe(value => {
            if (this.isActive) {
                this.index++;
                this.select(this.index);
            }
        });
    }

    ngOnDestroy() {
        if (this.timerSub !== undefined) {
            this.timerSub.unsubscribe();
        }
    }

    handleSelectEnterEvent(event: MouseEvent, index: number): void {
        this.select(index);
        this.render.removeClass(this.items.get(index)?.nativeElement, 'image-fade');
        this.isActive = false;
    }

    handleSelectExitEvent(event: MouseEvent, index: number): void {
        this.index = index;
        this.isActive = true;
    }

    private select(index: number): void {
        this.items.forEach(item => this.render.setAttribute(item.nativeElement, 'class', 'image-item'));
        this.orbits.forEach(item => this.render.setAttribute(item.nativeElement, 'class', 'orbit mx-50'));
        index = index % this.images.length;
        this.render.setAttribute(this.items.get(index)?.nativeElement, 'class', 'image-fade');
        this.render.setAttribute(this.orbits.get(index)?.nativeElement, 'class', 'orbit mx-50 active');
        this.subjectChange.emit(this.images[index]?.subject);
    }

}
