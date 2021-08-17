import { Component, HostBinding, Input } from "@angular/core";

@Component({
    selector: 'octopus-chip-icon',
    template: `
        <div class="octopus-chip-icon-wrapper">
            <img [src]="icon" alt="chip-icon" width="100%">
        </div>
    `
})
export class OctopusChipIcon {

    @Input('icon') icon: string = '';

    @HostBinding('class') class: string = 'octopus-chip-icon';
    @HostBinding('style.margin-right') marginRight: string = '0.5rem';

}