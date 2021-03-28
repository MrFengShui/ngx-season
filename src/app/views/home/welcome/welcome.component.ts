import { HostBinding, OnInit } from "@angular/core";
import { Component } from "@angular/core";

import { WelcomeRecommendModel, WelcomeSectionModel, WelcomeViewModel, WELCOME_VIEW_MODEL } from "src/app/models/view/welcome.model";

@Component({
    selector: 'app-home-welcome',
    templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {

    @HostBinding('class') class: string = 'welcome';

    update: Date = new Date();

    recommend!: WelcomeRecommendModel;
    subject!: string;

    sections!: WelcomeSectionModel[];

    ngOnInit() {
        let model: WelcomeViewModel = WELCOME_VIEW_MODEL;
        this.recommend = model.recommendation;
        this.sections = Object.values(model).slice(1);
    }

    listenSubjectChange(change: string): void {
        this.subject = change;
    }

}