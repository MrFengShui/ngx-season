import {
    AfterViewInit,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    Renderer2,
    SimpleChanges
} from "@angular/core";

import {OCTOPUS_ALIGNMENTS, OctopusAlignment} from "../global/enums.utils";

@Component({
    selector: 'octo-split-line',
    template: `
        <div class="line"></div>
        <span class="text mx-100" *ngIf="text.trim.length > 0">{{text}}</span>
        <div class="line"></div>
    `
})
export class OctopusSplitline implements OnChanges, AfterViewInit {

    @Input('octoAlign') align: OctopusAlignment = 'x';
    @Input('octoText') text: string = '';

    @HostBinding('class') class: string = 'octo-split-line';

    constructor(
        private _element: ElementRef,
        private _render: Renderer2
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['align']) {
            this.renderAlignment(changes['align'].currentValue);
        }
    }

    ngAfterViewInit() {
        this.renderAlignment(this.align);
    }

    private renderAlignment(align: OctopusAlignment): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_ALIGNMENTS.forEach(item =>
                this._render.removeClass(this._element.nativeElement, `octo-split-${item}line`));
            this._render.addClass(this._element.nativeElement, `octo-split-${align}line`);
        });
    }

}
