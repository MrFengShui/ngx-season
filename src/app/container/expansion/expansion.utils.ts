import { animate, AnimationMetadata, state, style, transition, trigger } from "@angular/animations";

export const ICON_ROTATE: AnimationMetadata = trigger('ICON_ROTATE', [
    state('up', style({
        transform: 'rotate(180deg)'
    })),
    state('down', style({
        transform: 'rotate(0deg)'
    })),
    transition('up => down', [animate('1000ms ease-in-out')]),
    transition('down => up', [animate('1000ms ease-in-out')])
]);

export const CONTENT_COLLAPSE: AnimationMetadata = trigger('CONTENT_COLLAPSE', [
    state('show', style({
        visibility: 'visible'
    })),
    state('hide', style({
        height: 0,
        visibility: 'hidden'
    })),
    transition('show => hide', [animate('1000ms ease-in-out')]),
    transition('hide => show', [animate('1000ms ease-in-out')])
]);