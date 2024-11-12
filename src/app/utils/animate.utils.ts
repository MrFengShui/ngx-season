import { animate, animation, style } from "@angular/animations";

export const horizontalCollapsionExpanionAnimation = animation([
    style({ width: '{{ start }}px' }),
    animate('{{ duration }}ms', style({ width: '{{ final }}px' }))
]);

export const horizontalExtraCollapsionExpanionAnimation = animation([
    style({ width: '{{ start }}px', 'min-width': '{{ start }}px', 'max-width': '{{ start }}px' }),
    animate('{{ duration }}ms', style({ width: '{{ final }}px', 'min-width': '{{ final }}px', 'max-width': '{{ final }}px' }))
]);

export const verticalCollapsionExpanionAnimation = animation([
    style({ height: '{{ start }}px' }),
    animate('{{ duration }}ms', style({ height: '{{ final }}px' }))
]);