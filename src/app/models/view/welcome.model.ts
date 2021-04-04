import { SimpleImageLinkModel, SimpleRankModel, SimpleUnitModel } from "../public.model";

export class WelcomeRecommendModel {

    icon!: string;
    name!: string;
    total!: number;
    carousel!: SimpleImageLinkModel[];
    units!: SimpleImageLinkModel[];

    constructor(icon: string, name: string, total: number, carousel: any[], units: any[]) {
        this.icon = icon;
        this.name = name;
        this.total = total;
        this.carousel = carousel;
        this.units = units;
    }

}

export class WelcomeSectionModel {

    icon!: string;
    name!: string;
    total!: number;
    units!: SimpleUnitModel[];
    ranks!: SimpleRankModel;

    constructor(icon: string, name: string, total: number, units: any[], ranks: SimpleRankModel) {
        this.icon = icon;
        this.name = name;
        this.total = total;
        this.units = units;
        this.ranks = ranks;
    }

}

export class WelcomeViewModel {

    recommendation!: WelcomeRecommendModel;
    education!: WelcomeSectionModel;
    engineering!: WelcomeSectionModel;
    games!: WelcomeSectionModel;
    politics!: WelcomeSectionModel;
    science!: WelcomeSectionModel;
    sports!: WelcomeSectionModel;

}

export const WELCOME_VIEW_INITIAL_DATA: WelcomeViewModel = {
    recommendation: new WelcomeRecommendModel('recommendation', 'Recommendation', 0, [], new Array(6)),
    education: new WelcomeSectionModel('school', 'Education', 0, new Array(12),
        { rankAudio: new Array(12), rankVideo: new Array(12), rankArticle: new Array(12), rankGallery: new Array(12) }),
    engineering: new WelcomeSectionModel('engineering', 'Engineering', 0, new Array(12),
        { rankAudio: new Array(12), rankVideo: new Array(12), rankArticle: new Array(12), rankGallery: new Array(12) }),
    games: new WelcomeSectionModel('games', 'Games', 0, new Array(12),
        { rankAudio: new Array(12), rankVideo: new Array(12), rankArticle: new Array(12), rankGallery: new Array(12) }),
    politics: new WelcomeSectionModel('policy', 'Politics', 0, new Array(12),
        { rankAudio: new Array(12), rankVideo: new Array(12), rankArticle: new Array(12), rankGallery: new Array(12) }),
    science: new WelcomeSectionModel('science', 'Science', 0, new Array(12),
        { rankAudio: new Array(12), rankVideo: new Array(12), rankArticle: new Array(12), rankGallery: new Array(12) }),
    sports: new WelcomeSectionModel('sports', 'Sports', 0, new Array(12),
        { rankAudio: new Array(12), rankVideo: new Array(12), rankArticle: new Array(12), rankGallery: new Array(12) })
};