import { Component, ElementRef, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { Subject } from "rxjs";

import { ColorPalette } from "./enum.utils";

@Component({
    selector: '',
    template: ''
})
export abstract class AbstractOctopusComponent implements OnChanges, OnInit {

    @Input('color') color: ColorPalette = 'base';

    constructor(protected _ref: ElementRef) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.color !== undefined) {
            setTimeout(() => this.renderColor(changes.color.previousValue, changes.color.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => this.renderColor(undefined, this.color));
    }

    protected abstract renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void;

}

@Component({
    selector: '',
    template: ''
})
export abstract class AbstractOctopusButton extends AbstractOctopusComponent implements OnDestroy {

    @HostListener('click')
    protected listenHostClick() {
        let rect: DOMRect = this._ref.nativeElement.getBoundingClientRect();
        this.size$.next(Math.max(rect.width, rect.height));
    }

    size$: Subject<number> = new Subject();

    constructor(protected _ref: ElementRef) {
        super(_ref);
    }

    ngOnDestroy() {
        this.size$.complete();
    }

}