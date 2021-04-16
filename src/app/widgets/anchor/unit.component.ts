import { Component, ElementRef, HostBinding, Input, QueryList, ViewChildren } from "@angular/core";

import { SCALE_SWITCH } from "src/app/animations/scale.animation";

import { UnitAnchorModel } from "src/app/models/widget/block.model";

@Component({
    selector: 'app-widgets-unit-anchor',
    templateUrl: './unit.component.html',
    animations: [SCALE_SWITCH]
})
export class WidgetsUnitAnchorComponent {

    @Input('unit') unit!: UnitAnchorModel;

    @ViewChildren('image', { read: ElementRef })
    image!: QueryList<ElementRef<HTMLImageElement>>;

    @HostBinding('class') class: string = 'unit-anchor';

    index: number = 0;

    UAM_TYPE: any = { 1: 'audio', 2: 'video', 3: 'article', 4: 'gallery' }

    handleSwitchEvent(event: MouseEvent, length: number): void {
        this.index = (this.index + 1) % length;
    }

}