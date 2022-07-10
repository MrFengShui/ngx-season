import {
    AfterViewInit, Component,
    Directive, ElementRef,
    HostBinding, Input,
    OnChanges,
    Renderer2,
    SimpleChanges,
} from "@angular/core";
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {CdkMenuItemCheckbox, CdkMenuItemRadio} from "@angular/cdk/menu";

export type OctopusMenubarDirection = 'column' | 'row';
export type OctopusMenuCheckRadioItem = {icon: string, text: string, check?: boolean};

@Directive({
    selector: '[octo-menu-item-icon], [octoMenuItemIcon]'
})
export class OctopusMenuItemIcon {

    @HostBinding('class') class: string = 'octo-menu-item-icon';

}

@Directive({
    selector: '[octo-menubar], [octoMenubar]'
})
export class OctopusMenubar implements OnChanges, AfterViewInit {

    @Input('octoMenuDir') direction: OctopusMenubarDirection = 'row';

    @HostBinding('class') class: string = 'octo-menubar';

    constructor(
        private _element: ElementRef,
        private _render: Renderer2
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['direction']) {
            this.renderDirection(changes['direction'].currentValue);
        }
    }

    ngAfterViewInit() {
        this.renderDirection(this.direction);
    }

    private renderDirection(direction: OctopusMenubarDirection): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            this._render.setStyle(this._element.nativeElement, 'flex-direction', direction);
        });
    }

}

@Directive({
    selector: '[octo-menu], [octoMenu]'
})
export class OctopusMenu {

    @HostBinding('class') class: string = 'octo-menu';

}

@Directive({
    selector: '[octo-menu-group], [octoMenuGroup]'
})
export class OctopusMenuGroup {

    @HostBinding('class') class: string = 'octo-menu-group';

}

@Component({
    selector: '[octo-menu-item], [octoMenuItem]',
    template: `
        <span class="mr-100" style="width: 1.5rem;height: 1.5rem;">
            <ng-content select="[octo-menu-item-icon], [octoMenuItemIcon]"></ng-content>
        </span>
        <span class="flex-fill"><ng-content></ng-content></span>
        <octo-icon octoSize="0.75rem" *ngIf="next">play_arrow</octo-icon>
    `
})
export class OctopusMenuItem {

    @Input('octoMenuNext')
    get next() { return this._next; }
    set next(_next: any) { this._next = coerceBooleanProperty(_next); }
    private _next: boolean = false;

    @HostBinding('class') class: string = 'octo-menu-item';

}

@Component({
    selector: '[octo-menu-check-item], [octoMenuCheckItem]',
    template: `
        <span class="mr-100" style="width: 1.5rem;height: 1.5rem;">
            <ng-content select="[octo-menu-item-icon], [octoMenuItemIcon]"></ng-content>
        </span>
        <span class="flex-fill"><ng-content></ng-content></span>
        <octo-icon *ngIf="checked">check_box</octo-icon>
        <octo-icon *ngIf="!checked">check_box_outline_blank</octo-icon>
    `
})
export class OctopusMenuCheckItem extends CdkMenuItemCheckbox {

    @HostBinding('class') class: string = 'octo-menu-check-item';

}

@Component({
    selector: '[octo-menu-radio-item], [octoMenuRadioItem]',
    template: `
        <span class="mr-100" style="width: 1.5rem;height: 1.5rem;">
            <ng-content select="[octo-menu-item-icon], [octoMenuItemIcon]"></ng-content>
        </span>
        <span class="flex-fill"><ng-content></ng-content></span>
        <octo-icon *ngIf="checked">radio_button_checked</octo-icon>
        <octo-icon *ngIf="!checked">radio_button_unchecked</octo-icon>
    `
})
export class OctopusMenuRadioItem extends CdkMenuItemRadio {

    @HostBinding('class') class: string = 'octo-menu-radio-item';

}
