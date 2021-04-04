import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit, ViewEncapsulation } from "@angular/core";
import { Subscription, timer } from "rxjs";

import { SimpleUnitModel } from "src/app/models/public.model";
import { PlazzaMetadataModel, PlazzaViewModel, PLAZZA_VIEW_INITIAL_DATA } from "src/app/models/view/plazza.model";

@Component({
    selector: 'app-home-plazza',
    templateUrl: './plazza.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlazzaComponent implements OnInit, AfterViewInit {

    @HostBinding('class') class: string = 'plazza';

    dataList!: PlazzaViewModel[];

    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.dataList = PLAZZA_VIEW_INITIAL_DATA;
    }

    ngAfterViewInit() {
        let index: number = 0;
        let subscription: Subscription = timer(3000, 3000).subscribe(value => {
            let subs: number = Math.floor(Math.random() * 100 + 1);
            let subd: number = Math.floor(Math.random() * 100 + 1);
            this.dataList[index].metadata = new PlazzaMetadataModel('assets/images/profile.png', 'Brand Name ' + (index + 1), subs, subd, false);
            this.cdr.detectChanges();
            this.cdr.markForCheck();

            if (index === this.dataList.length - 1) {
                subscription.unsubscribe()
            }

            index++;
        });
    }

}