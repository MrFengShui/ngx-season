import { Component, HostBinding } from "@angular/core";


@Component({
    selector: 'octopus-chip-list',
    template: `
        <div class="octopus-chip-list-wrapper">
            <ng-content></ng-content>
        </div>
    `
})
export class OctopusChipList {

    @HostBinding('class') class: string = 'octopus-chip-list';

}