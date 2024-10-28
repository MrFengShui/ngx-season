import { Component } from "@angular/core";
import { NGXSeasonAccordionColor } from "src/app/components/accordion/accordion.component";

@Component({
    selector: 'ngx-sui-demo-accordion-page',
    templateUrl: './accordion.component.html'
})
export class DemoAccordionPageComponent {

    protected colors: NGXSeasonAccordionColor[] = ['default', 'primary', 'accent', 'success', 'warning', 'failure', 'info'];

}