import { Component, HostBinding, Input } from "@angular/core";
import { Alignment } from "src/app/global/enum.utils";

@Component({
    selector: 'octopus-expansion-action',
    template: `
        <div class="octopus-expansion-action-wrapper justify-content-{{align}}">
            <ng-content select="[octopus-button],[octopus-fill-button]"></ng-content>
        </div>
    `
})
export class OctopusExpansionAction {

    @Input('align') align: Alignment = 'around';

    @HostBinding('class') class: string = 'octopus-expansion-action';

}