import {
    AfterViewInit,
    Component,
    Directive,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    Renderer2,
    SimpleChanges
} from "@angular/core";

import {OctopusFlexAlign} from "../global/enums.utils";

@Component({
    selector: 'octo-card',
    template: `<ng-content></ng-content>`
})
export class OctopusCard implements AfterViewInit {

    @HostBinding('class') class: string = 'octo-card';

    constructor(
        private _element: ElementRef,
        private _render: Renderer2
    ) {
    }

    ngAfterViewInit() {
        this._render.addClass(this._element.nativeElement, 'octo-shadow-2');
    }

}

@Component({
    selector: 'octo-card-title',
    template: `<ng-content></ng-content>`
})
export class OctopusCardTitle {

    @HostBinding('class') class: string = 'octo-card-title';

}

@Component({
    selector: 'octo-card-subtitle',
    template: `<ng-content></ng-content>`
})
export class OctopusCardSubtitle {

    @HostBinding('class') class: string = 'octo-card-subtitle';

}

@Directive({
    selector: '[octo-card-avatar], [octoCardAvatar]'
})
export class OctopusCardAvatar {

    @HostBinding('class') class: string = 'octo-card-avatar';

}

@Component({
    selector: 'octo-card-attach, [octo-card-attach]',
    template: `<ng-content></ng-content>`
})
export class OctopusCardAttach {

    @HostBinding('class') class: string = 'octo-card-attach';

}

@Component({
    selector: 'octo-card-header',
    template: `
        <ng-content select="[octo-card-avatar], [octoCardAvatar]"></ng-content>
        <div class="octo-card-header-wrapper">
            <ng-content select="octo-card-title"></ng-content>
            <ng-content select="octo-card-subtitle"></ng-content>
        </div>
    `
})
export class OctopusCardHeader {

    @HostBinding('class') class: string = 'octo-card-header';

}

@Component({
    selector: 'octo-card-content',
    template: `<ng-content></ng-content>`
})
export class OctopusCardContent {

    @HostBinding('class') class: string = 'octo-card-content';

}

@Component({
    selector: 'octo-card-ctrl',
    template: `<ng-content></ng-content>`
})
export class OctopusCardControl implements OnChanges, AfterViewInit {

    @Input('octoAlign') align: OctopusFlexAlign = 'center';

    @HostBinding('class') class: string = 'octo-card-ctrl';

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

    private renderAlignment(align: OctopusFlexAlign): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            this._render.setStyle(this._element.nativeElement, 'justify-content', align);
        });
    }

}
