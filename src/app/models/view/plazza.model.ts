import { SimpleImageLinkModel, SimpleMessageModel, SimpleRankModel, SimpleUnitModel } from "../public.model";

export class PlazzaRecommendModel {

    audio!: SimpleImageLinkModel[] | undefined;
    video!: SimpleImageLinkModel[] | undefined;
    article!: SimpleImageLinkModel[] | undefined;
    gallery!: SimpleImageLinkModel[] | undefined;

    constructor(audio: SimpleImageLinkModel[] | undefined, video: SimpleImageLinkModel[] | undefined, article: SimpleImageLinkModel[] | undefined, gallery: SimpleImageLinkModel[] | undefined) {
        this.audio = audio;
        this.video = video;
        this.article = article;
        this.gallery = gallery;
    }

}

export class PlazzaMetadataModel {

    icon!: string;
    name!: string;
    subscription!: number;
    subscribed!: number;
    isSubscribed!: boolean;

    constructor(icon: string, name: string, subscription: number, subscribed: number, isSubscribed: boolean) {
        this.icon = icon;
        this.name = name;
        this.subscription = subscription;
        this.subscribed = subscribed;
        this.isSubscribed = isSubscribed;
    }

}

export class PlazzaViewModel {

    metadata!: PlazzaMetadataModel | undefined;
    recommendation!: PlazzaRecommendModel;
    messages!: SimpleMessageModel[];
    dataset!: SimpleUnitModel[];

}

const createPlazzaData = (count: number): PlazzaViewModel[] => {
    let list: PlazzaViewModel[] = [];

    for (let i = 0; i < count; i++) {
        list.push({
            metadata: undefined,
            recommendation: new PlazzaRecommendModel(undefined, undefined, undefined, undefined),
            messages: new Array(12),
            dataset: new Array(12)
        });
    }

    return list;
}

export const PLAZZA_VIEW_INITIAL_DATA: PlazzaViewModel[] = createPlazzaData(8);