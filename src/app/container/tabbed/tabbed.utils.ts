import { animate, AnimationMetadata, state, style, transition, trigger } from "@angular/animations";

export const CONTENT_SELECT: AnimationMetadata = trigger('CONTENT_SELECT', [
    state('show', style({
        opacity: 1.0,
        transform: 'scale(1.0)',
        visibility: 'visible'
    })),
    state('hide', style({
        height: 0,
        opacity: 0.1,
        transform: 'scale(0.1)',
        visibility: 'hidden'
    })),
    transition('show => hide', animate('1000ms')),
    transition('hide => show', animate('1000ms'))
]);