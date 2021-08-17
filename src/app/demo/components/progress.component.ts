import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { interval, Subject } from "rxjs";

@Component({
    selector: 'app-demo-progress-view',
    styleUrls: ['../demo.module.scss'],
    templateUrl: './progress.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoProgressViewComponent implements OnInit, AfterViewInit {

    value$: Subject<number> = new Subject();

    ngOnInit() {
        this.value$.next(0);
    }

    ngAfterViewInit() {
        interval(5000).subscribe(() => {
            let value: number = Math.floor(Math.random() * 101);
            this.value$.next(value);
        });
    }

}