import {Component, Directive, HostBinding, HostListener} from "@angular/core";
import {
    CdkMenu,
    CdkMenuItem,
    CdkMenuTrigger, MENU_TRIGGER, PARENT_OR_NEW_MENU_STACK_PROVIDER,
} from "@angular/cdk/menu";

@Component({
    selector: 'octo-menu-item',
    host: {
        'role': 'menuitem',
        'class': 'cdk-menu-item',
        '[tabindex]': '_tabindex',
        '(blur)': '_resetTabIndex()',
        '(focus)': '_setTabIndex()',
        '(click)': 'trigger()',
    },
    template: `
        <div octo-ripple></div>
        <ng-content></ng-content>
    `
})
export class OctopusMenuItem extends CdkMenuItem {

    @HostBinding('class') class: string = 'octo-menu-item';

}

@Component({
    selector: 'octo-menu',
    template: `<ng-content select="octo-menu-item, octo-split-line"></ng-content>`
})
export class OctopusMenu extends CdkMenu {

    @HostBinding('class') class: string = 'octo-menu octo-shadow-8';

}

@Directive({
    selector: '[octoMenuTriggerFor]',
    exportAs: 'octoMenuTriggerFor',
    host: {
        'aria-haspopup': 'menu',
        '[attr.aria-expanded]': 'isOpen()',
        '(focusin)': '_setHasFocus(true)',
        '(focusout)': '_setHasFocus(false)'
    },
    inputs: ['menuTemplateRef: octoMenuTriggerFor'],
    providers: [
        {provide: MENU_TRIGGER, useExisting: OctopusMenuTrigger},
        PARENT_OR_NEW_MENU_STACK_PROVIDER,
    ],
})
export class OctopusMenuTrigger extends CdkMenuTrigger {

    @HostBinding('class') class: string = 'octo-menu-trigger'

    @HostListener('keydown', ['$event'])
    listenKeydownAction(event: KeyboardEvent): void {
        this._toggleOnKeydown(event);
    }

}
