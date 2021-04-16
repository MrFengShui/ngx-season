import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, OnInit, OnDestroy, QueryList, ViewChildren, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription, timer } from "rxjs";

import { createMessages } from "src/app/models/public.model";
import { createPlazzaData, PlazzaMetadataModel, PlazzaViewModel } from "src/app/models/view/plazza.model";
import { createCarousel, createUnitAnchor } from "src/app/utils/data.utils";

@Component({
    selector: 'app-home-plazza',
    templateUrl: './plazza.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlazzaComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {

    @ViewChildren('item', { read: ElementRef })
    items!: QueryList<ElementRef<HTMLElement>>;

    @HostBinding('class') class: string = 'plazza';

    rows: string = 'repeat(2, minmax(min-content, max-content))';
    dataList!: PlazzaViewModel[];

    routeSub!: Subscription;

    constructor(
        private cdr: ChangeDetectorRef,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.routeSub = this.route.url.subscribe(url => this.dataList = createPlazzaData(8));
    }

    ngOnDestroy() {
        if (this.routeSub !== undefined && !this.routeSub.closed) {
            this.routeSub.unsubscribe();
        }
    }

    ngAfterViewInit() {
        this.routeSub = this.route.url.subscribe(url => this.initialize(url[1].path));
    }

    ngAfterViewChecked() {
        let item: HTMLElement | undefined = this.items.get(0)?.nativeElement;

        if (item !== undefined) {
            let temp: string = 'repeat(2, ' + item.clientHeight + 'px)';

            if (this.rows !== temp) {
                this.rows = temp;
                this.cdr.detectChanges();
            }
        }
    }

    private initialize(id: string): void {
        let index: number = 0;
        let subscription: Subscription = timer(5000, 5000).subscribe(value => {
            let subs: number = Math.floor(Math.random() * 100 + 1);
            let subd: number = Math.floor(Math.random() * 100 + 1);
            let model: PlazzaViewModel = this.dataList[index];
            model.metadata = new PlazzaMetadataModel('assets/images/profile.png', 'Brand Name ' + (index + 1), subs, subd, false);
            model.recommend.audioGroup.cgmGroup = createCarousel(3, 1, 6);
            model.recommend.videoGroup.cgmGroup = createCarousel(3, 7, 12);
            model.recommend.articleGroup.cgmGroup = createCarousel(3, 13, 18);
            model.recommend.galleryGroup.cgmGroup = createCarousel(3, 1, 18);
            model.events = createMessages(6);
            model.dataset = createUnitAnchor(6, 1, 18);
            this.cdr.detectChanges();

            if (index === this.dataList.length - 1) {
                subscription.unsubscribe()
            }

            index++;
        });
    }

}