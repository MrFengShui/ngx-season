import { WelcomeRecommendModel, WelcomeSectionModel, WelcomeViewModel } from "../models/view/welcome.model";
import { CarouselGroupModel } from "../models/widget/carousel.model";

export class WelcomeFactory {

    private static instance: WelcomeFactory;

    createRecommendModel(): WelcomeRecommendModel {
        return new WelcomeRecommendModel('recommendation', 'Recommendation', -1, new CarouselGroupModel(0, undefined, undefined),
            new CarouselGroupModel(0, undefined, undefined), new CarouselGroupModel(0, undefined, undefined), new Array(6));
    }

    createSectionModel(icon: string, name: string): WelcomeSectionModel {
        return new WelcomeSectionModel(icon, name, 0, new Array(6),
            { rankAudio: new Array(6), rankVideo: new Array(6), rankArticle: new Array(6), rankGallery: new Array(6) });
    }

    createViewModel(): WelcomeViewModel {
        return new WelcomeViewModel(
            this.createRecommendModel(),
            this.createSectionModel('school', 'Education'), this.createSectionModel('engineering', 'Engineering'),
            this.createSectionModel('games', 'Games'), this.createSectionModel('policy', 'Politics'),
            this.createSectionModel('science', 'Science'), this.createSectionModel('sports', 'Sports')
        );
    }

    static newInstance(): WelcomeFactory {
        if (this.instance === null || this.instance === undefined) {
            this.instance = new WelcomeFactory();
        }

        return this.instance;
    }

}