import { animate, state, style, transition, trigger } from "@angular/animations";

export const SCALE_SWITCH = trigger('scaleSwitch', [
    state('active', style({
        transform: 'scale(1.0)'
    })),
    state('inactive', style({
        transform: 'scale(0.0)'
    })),
    transition('active => inactive', animate('500ms 0s ease-in-out')),
    transition('inactive => active', animate('500ms 0s ease-in-out'))
]);