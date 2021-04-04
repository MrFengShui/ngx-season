import { animate, state, style, transition, trigger } from "@angular/animations";

export const ROTATE_180 = trigger('rotate180', [
    state('start', style({
        transform: 'rotate(180deg)'
    })),
    state('end', style({
        transform: 'rotate(0deg)'
    })),
    transition('start => end', animate('250ms 0s ease-in-out')),
    transition('end => start', animate('250ms 0s ease-in-out'))
]);