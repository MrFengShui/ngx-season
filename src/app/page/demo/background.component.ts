import { Component } from "@angular/core";
import { NGXSeasonBackgroundPatternName, NGXSeasonBackgroundStripeColor, NGXSeasonBackgroundStripeSize } from "src/app/components/effects/background.directive";

@Component({
    selector: 'ngx-sui-demo-background-page',
    templateUrl: './background.component.html'
})
export class DemoBackgroundPageComponent {

    protected names: NGXSeasonBackgroundPatternName[] = ['brick', 'cloud', 'cube', 'grid', 'hive', 'line', 'maze', 'ring'];
    protected colors: NGXSeasonBackgroundStripeColor[] = ['default', 'primary', 'accent', 'success', 'warning', 'failure', 'info'];
    protected sizes: NGXSeasonBackgroundStripeSize[] = ['sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'];

}