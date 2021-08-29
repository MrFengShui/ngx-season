import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, HostBinding, Input } from "@angular/core";

@Component({
    selector: '[section-code]',
    template: `<ng-content></ng-content>`
})
export class DemoSectionCodeComponent {

    @HostBinding('class') class: string = 'section-code';

}

@Component({
    selector: '[section-foot]',
    template: `<ng-content></ng-content>`
})
export class DemoSectionFootComponent {

    @HostBinding('class') class: string = 'section-foot';

}

@Component({
    selector: 'app-demo-section',
    templateUrl: './demo.component.html',
    animations: [
        trigger('CODE_COLLAPSE', [
            state('show', style({
                height: '480px',
                overflow: 'auto',
                visibility: 'visible'
            })),
            state('hide', style({
                height: 0,
                overflow: 'hidden',
                visibility: 'hidden'
            })),
            transition('show => hide', animate('1000ms ease-in-out')),
            transition('hide => show', animate('1000ms ease-in-out'))
        ])
    ]
})
export class DemoSectionComponent {

    @Input('label') label: string = '';

    @HostBinding('class') class: string = 'demo-section';

    toggled: boolean = false;

}