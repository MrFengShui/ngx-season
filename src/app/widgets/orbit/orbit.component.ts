import { Component, HostBinding, Input } from "@angular/core";

import { UnitAnchorModel } from "src/app/models/widget/block.model";

@Component({
    selector: 'app-widgets-orbit',
    templateUrl: './orbit.component.html'
})
export class WidgetsOrbitComponent {

    @Input('units') units: UnitAnchorModel[] = [];

    @HostBinding('class') class: string = 'orbit';

    handleScrollLeftEvent(event: MouseEvent, element: HTMLElement): void {
        if (element.scrollLeft - 320 >= 0.0) {
            element.scrollLeft -= 320;
        } else {
            element.scrollLeft = 0.0;
        }
    }

    handleScrollRightEvent(event: MouseEvent, element: HTMLElement): void {
        let max: number = element.scrollWidth - element.clientWidth;

        if (element.scrollLeft + 320 <= max) {
            element.scrollLeft += 320;
        } else {
            element.scrollLeft = max;
        }
    }

}