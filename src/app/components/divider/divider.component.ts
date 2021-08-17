import { AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from "@angular/core";
import { Subject } from "rxjs";

@Component({
    selector: '[octopus-divider]',
    template: `
        <div class="octopus-divider-wrapper" #wrapper>
            <hr>
            <span [class.d-none]="text$ | async">
                <ng-content></ng-content>
            </span>
            <hr>
        </div>
    `
})
export class OctopusDivider implements OnChanges, OnInit, AfterViewInit {

    @Input('direction') direction: string = 'horizontal';

    @ViewChild('wrapper', { read: ElementRef, static: true })
    wrapper: ElementRef<HTMLElement>;

    @HostBinding('class') class: string = 'octopus-divider';

    text$: Subject<boolean> = new Subject();

    constructor(
        private _ref: ElementRef<HTMLElement>,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.direction !== undefined) {
            this.build(changes.direction.previousValue, changes.direction.currentValue);
        }
    }

    ngOnInit() {
        this.build(undefined, this.direction);
    }

    ngAfterViewInit() {
        setTimeout(() => this.text$.next(this._ref.nativeElement.textContent === ''));
    }

    private build(prevDir: string, currDir: string): void {
        setTimeout(() => {
            this._render.removeClass(this.wrapper.nativeElement, prevDir === undefined ? 'horizontal' : prevDir);
            this._render.addClass(this.wrapper.nativeElement, currDir);
        });
    }

}