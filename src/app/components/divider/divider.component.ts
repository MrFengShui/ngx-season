import { AfterViewInit, Component, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from "@angular/core";
import { Subject } from "rxjs";

@Component({
    selector: 'div[octopus-divider]',
    template: `
        <hr>
        <span [class.d-none]="text$ | async">
            <ng-content></ng-content>
        </span>
        <hr>
    `
})
export class OctopusDivider implements OnChanges, OnInit, AfterViewInit {

    @Input('divDir') direction: 'horizontal' | 'vertical' = 'horizontal';

    @HostBinding('class') class: string = 'octopus-divider';

    text$: Subject<boolean> = new Subject();

    constructor(
        private _ref: ElementRef<HTMLElement>,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.direction !== undefined) {
            setTimeout(() => this.renderDirection(changes.direction.previousValue, changes.direction.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => this.renderDirection(undefined, this.direction));
    }

    ngAfterViewInit() {
        setTimeout(() => this.text$.next(this._ref.nativeElement.textContent === ''));
    }

    private renderDirection(prevDir: string | undefined, currDir: string): void {
        this._render.removeClass(this._ref.nativeElement, prevDir === undefined ? 'horizontal' : prevDir);
        this._render.addClass(this._ref.nativeElement, currDir);
    }

}