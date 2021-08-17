import { Component, HostBinding, Input } from "@angular/core";

@Component({
    selector: 'octopus-layout-border',
    templateUrl: './border.component.html'
})
export class OctopusLayoutBorder {

    @Input('gutter') gutter: number = 0;

    @HostBinding('class') class: string = 'octopus-layout-border';

}

@Component({
    selector: 'octopus-border-top',
    template: `
        <div class="octopus-border-top-wrapper overflow">
            <ng-content></ng-content>
        </div>
    `
})
export class OctopusBorderTop {

    @HostBinding('class') class: string = 'octopus-border-top';

}

@Component({
    selector: 'octopus-border-bottom',
    template: `
        <div class="octopus-border-bottom-wrapper overflow">
            <ng-content></ng-content>
        </div>
    `
})
export class OctopusBorderBottom {

    @HostBinding('class') class: string = 'octopus-border-bottom';

}

@Component({
    selector: 'octopus-border-left',
    template: `
        <div class="octopus-border-left-wrapper overflow">
            <ng-content></ng-content>
        </div>
    `
})
export class OctopusBorderLeft {

    @HostBinding('class') class: string = 'octopus-border-left';

}

@Component({
    selector: 'octopus-border-center',
    template: `
        <div class="octopus-border-center-wrapper overflow">
            <ng-content></ng-content>
        </div>
    `
})
export class OctopusBorderCenter {

    @HostBinding('class') class: string = 'octopus-border-center';

}

@Component({
    selector: 'octopus-border-right',
    template: `
        <div class="octopus-border-right-wrapper overflow">
            <ng-content></ng-content>
        </div>
    `
})
export class OctopusBorderRight {

    @HostBinding('class') class: string = 'octopus-border-right';

}