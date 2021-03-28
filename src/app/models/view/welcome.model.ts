import { SimpleImageLinkModel } from "../public.model";

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
    units!: any[];
    ranks!: any[];

    constructor(icon: string, name: string, total: number, units: any[], ranks: any[]) {
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

const RECOMMENDATION_DATA: SimpleImageLinkModel[] = [
    { subject: 'Carousel Image 1', source: '../../../assets/images/fst.jpg', link: ['/'] },
    { subject: 'Carousel Image 2', source: '../../../assets/images/snd.jpg', link: ['/'] },
    { subject: 'Carousel Image 3', source: '../../../assets/images/trd.jpg', link: ['/'] },
    { subject: 'Carousel Image 4', source: '../../../assets/images/fth.jpg', link: ['/'] }
];

export const WELCOME_VIEW_MODEL: WelcomeViewModel = {
    recommendation: new WelcomeRecommendModel('recommendation', 'Recommendation', 0, RECOMMENDATION_DATA, RECOMMENDATION_DATA),
    education: new WelcomeSectionModel('school', 'Education', 0, new Array(12), new Array(24)),
    engineering: new WelcomeSectionModel('engineering', 'Engineering', 0, new Array(12), new Array(24)),
    games: new WelcomeSectionModel('games', 'Games', 0, new Array(12), new Array(24)),
    politics: new WelcomeSectionModel('policy', 'Politics', 0, new Array(12), new Array(24)),
    science: new WelcomeSectionModel('science', 'Science', 0, new Array(12), new Array(24)),
    sports: new WelcomeSectionModel('sports', 'Sports', 0, new Array(12), new Array(24))
};