import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'app-demo-carousel-view',
    styleUrls: ['../demo.module.scss'],
    templateUrl: './carousel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoCarouselViewComponent { }