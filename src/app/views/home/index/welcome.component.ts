import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, HostBinding, OnInit, QueryList, ViewChildren } from "@angular/core";
import { Component } from "@angular/core";
import { interval, Subscription } from "rxjs";
import { take } from "rxjs/operators";

import { selectImages, selectRanks, selectUnits, SimpleRankUnitModel } from "src/app/models/public.model";
import { WelcomeRecommendModel, WelcomeSectionModel, WelcomeViewModel, WELCOME_VIEW_INITIAL_DATA } from "src/app/models/view/welcome.model";

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

    recommend!: WelcomeRecommendModel;

    sections!: WelcomeSectionModel[];

    rankNames!: string[];

    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        let model: WelcomeViewModel = WELCOME_VIEW_INITIAL_DATA;
        this.recommend = model.recommendation;
        this.sections = Object.values(model).slice(1);
        this.rankNames = ['Audio Rank', 'Video Rank', 'Article Rank', 'Gallery Rank'];
    }

    ngAfterViewInit() {
        let turn: number = 5;
        let recommendSub: Subscription = interval(1000).pipe(take(turn)).subscribe(value => {
            if (value === turn - 1) {
                this.recommend.carousel = selectImages(6, 1, 12);
                this.recommend.units = selectImages(6, 6, 18);
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
                sections[index].units = selectUnits(12, 1, 18);
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