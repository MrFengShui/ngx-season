import { AfterViewInit, Component, OnDestroy } from "@angular/core";
import { interval, Subscription } from "rxjs";
import { ColorPalette } from "src/app/global/enum.utils";

@Component({
    selector: 'app-demo-progress-view',
    templateUrl: './progress.component.html'
})
export class DemoProgressView implements OnDestroy, AfterViewInit {

    list: ColorPalette[] = ['primary', 'secondary', 'success', 'warning', 'failure', 'info'];
    value: number = 0;

    private subscription!: Subscription;

    ngAfterViewInit() {
        this.subscription = interval(5000).subscribe(() => this.value = Math.random() * 101);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}