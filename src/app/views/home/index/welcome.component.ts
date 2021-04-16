import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, HostBinding, OnInit, QueryList, ViewChildren } from "@angular/core";
import { Component } from "@angular/core";
import { interval, Subscription } from "rxjs";
import { take } from "rxjs/operators";

import { selectRanks, SimpleRankUnitModel } from "src/app/models/public.model";
import { WelcomeSectionModel, WelcomeViewModel } from "src/app/models/view/welcome.model";
import { createCarousel, createUnitAnchor } from "src/app/utils/data.utils";
import { WelcomeFactory } from "src/app/utils/welcome.factory";

@Component({
    selector: 'app-home-welcome',
    templateUrl: './welcome.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit, AfterViewInit {

    @ViewChildren('categorySections', { read: ElementRef })
    categorySections!: QueryList<ElementRef<HTMLElement>>;

    @HostBinding('class') class: string = 'welcome';

    today: Date = new Date();

    model!: WelcomeViewModel;

    sections!: WelcomeSectionModel[];

    rankNames: string[] = ['Audio Rank', 'Video Rank', 'Article Rank', 'Gallery Rank'];

    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.model = WelcomeFactory.newInstance().createViewModel();
        this.sections = Object.values(this.model).slice(1);
    }

    ngAfterViewInit() {
        let turn: number = 5;
        let recommendSub: Subscription = interval(1000).pipe(take(turn)).subscribe(value => {
            if (value === turn - 1) {
                this.model.recommend.total = Math.floor(Math.random() * 100000) + 1;
                this.model.recommend.weekGroup.cgmGroup = createCarousel(3, 1, 12);
                this.model.recommend.monthGroup.cgmGroup = createCarousel(3, 6, 18);
                this.model.recommend.seasonGroup.cgmGroup = createCarousel(3, 1, 18);
                this.model.recommend.units = createUnitAnchor(6, 1, 18);
                recommendSub.unsubscribe();
                this.cdr.detectChanges();
                this.loadByOrder(this.sections, 0, turn);
            }
        });
    }

    formatRanks(section: WelcomeSectionModel): Array<SimpleRankUnitModel[]> {
        return Object.values(section.ranks);
    }

    calcTimeSpan(date: Date): number {
        return Math.ceil((new Date().getTime() - date.getTime()) / 1000);
    }

    private loadByOrder(sections: WelcomeSectionModel[], index: number = 0, turn: number): void {
        let sectionSub: Subscription = interval(1000).pipe(take(turn)).subscribe(value => {
            if (value === turn - 1) {
                sections[index].total = Math.floor(Math.random() * 100000) + 1;
                sections[index].units = createUnitAnchor(12, 1, 18);
                sections[index].ranks = selectRanks(12, 1, 18);
                sectionSub.unsubscribe();
                this.cdr.detectChanges();

                if (sectionSub.closed && index < sections.length - 1) {
                    this.loadByOrder(sections, index + 1, turn);
                }
            }
        });
    }

}