import {
    AfterViewInit,
    Component,
    Directive,
    ElementRef,
    HostBinding,
    Renderer2,
    ContentChildren,
    QueryList,
    AfterContentInit,
    Input,
    OnChanges,
    SimpleChanges,
    AfterContentChecked
} from "@angular/core";
import {coerceBooleanProperty} from "@angular/cdk/coercion";

@Component({
    template: ''
})
abstract class OctopusAbstractQueue {

    @HostBinding('class') class: string = 'octo-queue';

    constructor(
        protected _element: ElementRef,
        protected _render: Renderer2
    ) {
    }

}

@Component({
    selector: 'div[octo-queue-header], div[octoQueueHeader]',
    template: `<ng-content></ng-content>`
})
export class OctopusQueueHeader {

    @HostBinding('class') class: string = 'octo-queue-header';

}

@Directive({
    selector: 'img[octo-queue-image]'
})
export class OctopusQueueImage implements AfterViewInit {

    @HostBinding('class') class: string = 'octo-queue-image';

    constructor(
        private _element: ElementRef,
        private _render: Renderer2
    ) {
    }

    ngAfterViewInit() {
        this.renderStyle();
    }

    private renderStyle(): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            this._render.setStyle(this._element.nativeElement, 'border-radius', '50%');
            this._render.setStyle(this._element.nativeElement, 'width', '2.5rem');
            this._render.setStyle(this._element.nativeElement, 'height', '2.5rem');
        });
    }

}

@Directive({
    selector: 'octo-icon[octo-queue-icon]'
})
export class OctopusQueueIcon {

    @HostBinding('class') class: string = 'octo-queue-icon';

}

@Directive({
    selector: 'span[octo-queue-text]'
})
export class OctopusQueueText {

    @HostBinding('class') class: string = 'octo-queue-text';

}

@Component({
    selector: 'div[octo-queue-line], div[octoQueueLine]',
    template: `
        <ng-content select="img[octo-queue-image]"></ng-content>
        <ng-content></ng-content>
    `
})
export class OctopusQueueLine implements AfterContentInit {

    @ContentChildren(OctopusQueueImage)
    private images!: QueryList<OctopusQueueImage>;

    @HostBinding('class') class: string = 'octo-queue-line sx-50'

    ngAfterContentInit() {
        if (this.images && this.images.length > 1) {
            throw new Error();
        }
    }

}

@Component({
    selector: 'octo-queue-item, div[octo-queue-item]',
    template: `<ng-content></ng-content>`
})
export class OctopusQueueItem implements AfterContentChecked {

    @ContentChildren(OctopusQueueLine)
    private lines!: QueryList<OctopusQueueLine>;

    @HostBinding('class') class: string = 'octo-queue-item';

    constructor(
        protected _element: ElementRef,
        protected _render: Renderer2
    ) {
    }

    ngAfterContentChecked() {
        this.changeDisplay();
    }

    private changeDisplay(): void {
        if (this.lines) {
            if (this.lines.length > 0) {
                this._render.removeStyle(this._element.nativeElement, 'display');
                this._render.removeStyle(this._element.nativeElement, 'align-items');
            } else {
                this._render.setStyle(this._element.nativeElement, 'display', 'flex');
                this._render.setStyle(this._element.nativeElement, 'align-items', 'center');
            }
        }
    }

}

@Component({
    selector: 'a[octo-nav-queue-item]',
    template: `
        <div octo-ripple class="mx-0" *ngIf="ripple"></div>
        <ng-container *ngIf="icons.length <= 1 && texts.length <= 1">
            <ng-content select="octo-icon[octo-queue-icon]"></ng-content>
            <ng-content select="span[octo-queue-text]"></ng-content>
        </ng-container>
    `
})
export class OctopusNavigatorQueueItem extends OctopusQueueItem implements OnChanges, AfterContentInit, AfterViewInit {

    @Input('octoRipple') ripple: boolean | string | null = true;
    @Input('disabled') disabled: boolean | string | null = false;

    @ContentChildren(OctopusQueueIcon) icons!: QueryList<OctopusQueueIcon>;

    @ContentChildren(OctopusQueueText) texts!: QueryList<OctopusQueueText>;

    ngOnChanges(changes: SimpleChanges) {
        if (changes['disabled']) {
            this.renderDisabled(changes['disabled'].currentValue);
        }
    }

    ngAfterContentInit() {
        if (this.icons && this.icons.length > 1) {
            throw new Error();
        }

        if (this.texts && this.texts.length > 1) {
            throw new Error();
        }
    }

    ngAfterViewInit() {
        this._render.addClass(this._element.nativeElement, 'octo-nav-queue-item');
        this.renderDisabled(this.disabled);
    }

    renderDisabled(disabled: boolean | string | null): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            this.ripple = !coerceBooleanProperty(disabled);

            if (coerceBooleanProperty(disabled)) {
                this._render.addClass(this._element.nativeElement, 'octo-queue-disitem');
            } else {
                this._render.removeClass(this._element.nativeElement, 'octo-queue-disitem');
            }
        });
    }

}

@Component({
    selector: 'octo-queue',
    template: `
        <div class="octo-queue-wrapper">
            <ng-content
                select="div[octo-queue-header], div[octoQueueHeader], octo-queue-item, div[octo-queue-item], octo-split-line"></ng-content>
        </div>
    `
})
export class OctopusQueue extends OctopusAbstractQueue {

}

@Component({
    selector: 'octo-nav-queue',
    template: `
        <div class="octo-queue-wrapper" [ngStyle]="{'width': hidden ? 'fit-content' : 'auto'}">
            <ng-content select="div[octo-queue-header], div[octoQueueHeader], a[octo-nav-queue-item]"></ng-content>
        </div>
    `
})
export class OctopusNavigatorQueue extends OctopusAbstractQueue implements OnChanges, AfterContentInit, AfterViewInit {

    @Input('octoHidden') hidden: boolean | string | null = false;
    @Input('octoRipple') ripple: boolean | string | null = true;
    @Input('disabled') disabled: boolean | string | null = false;

    @ContentChildren(OctopusNavigatorQueueItem)
    private items!: QueryList<OctopusNavigatorQueueItem>;

    ngOnChanges(changes: SimpleChanges) {
        if (changes['ripple']) {
            this.toggleRipple(changes['ripple'].currentValue);
        }

        if (changes['disabled']) {
            this.toggleDisabled(changes['disabled'].currentValue);
        }
    }

    ngAfterContentInit() {
        this.toggleRipple(this.ripple);
        this.toggleDisabled(this.disabled);
    }

    ngAfterViewInit() {
        this._render.addClass(this._element.nativeElement, 'octo-nav-queue');
    }

    toggleRipple(ripple: boolean | string | null): void {
        if (this.items) {
            this.items.forEach(item => item.ripple = ripple);
        }
    }

    toggleDisabled(disabled: boolean | string | null): void {
        if (this.items) {
            this.items.forEach(item => item.renderDisabled(disabled));
        }
    }

}
