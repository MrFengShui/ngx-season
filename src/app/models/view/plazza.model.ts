import { SimpleMessageModel } from "../public.model";
import { UnitAnchorModel } from "../widget/block.model";
import { CarouselGroupModel } from "../widget/carousel.model";

export class PlazzaRecommendModel {

    private _audioGroup: CarouselGroupModel;
    private _videoGroup: CarouselGroupModel;
    private _articleGroup: CarouselGroupModel;
    private _galleryGroup: CarouselGroupModel;

    constructor(_audioGroup: CarouselGroupModel, _videoGroup: CarouselGroupModel, _articleGroup: CarouselGroupModel, _galleryGroup: CarouselGroupModel) {
        this._audioGroup = _audioGroup;
        this._videoGroup = _videoGroup;
        this._articleGroup = _articleGroup;
        this._galleryGroup = _galleryGroup;
    }

    get audioGroup(): CarouselGroupModel {
        return this._audioGroup;
    }

    set audioGroup(_audioGroup: CarouselGroupModel) {
        this._audioGroup = _audioGroup;
    }

    get videoGroup(): CarouselGroupModel {
        return this._videoGroup;
    }

    set videoGroup(_videoGroup: CarouselGroupModel) {
        this._videoGroup = _videoGroup;
    }

    get articleGroup(): CarouselGroupModel {
        return this._articleGroup;
    }

    set articleGroup(_articleGroup: CarouselGroupModel) {
        this._articleGroup = _articleGroup;
    }

    get galleryGroup(): CarouselGroupModel {
        return this._galleryGroup;
    }

    set galleryGroup(_galleryGroup: CarouselGroupModel) {
        this._galleryGroup = _galleryGroup;
    }

    toString(): string {
        return `{ 
            Audio Group: ${this._audioGroup},
            Video Group: ${this._videoGroup}, 
            Article Group: ${this._articleGroup}, 
            Gallery Group: ${this._galleryGroup}
        }`;
    }

}

export class PlazzaMetadataModel {

    private _icon: string;
    private _name: string;
    private _subscription: number;
    private _subscribed: number;
    private _isSubscribed: boolean;

    constructor(_icon: string, _name: string, _subscription: number, _subscribed: number, _isSubscribed: boolean) {
        this._icon = _icon;
        this._name = _name;
        this._subscription = _subscription;
        this._subscribed = _subscribed;
        this._isSubscribed = _isSubscribed;
    }

    get icon(): string {
        return this._icon;
    }

    set icon(_icon: string) {
        this._icon = _icon;
    }

    get name(): string {
        return this._name;
    }

    set name(_name: string) {
        this._name = _name;
    }

    get subscription(): number {
        return this._subscription;
    }

    set subscription(_subscription: number) {
        this._subscription = _subscription;
    }

    get subscribed(): number {
        return this._subscribed;
    }

    set subscribed(_subscribed: number) {
        this._subscribed = _subscribed;
    }

    get isSubscribed(): boolean {
        return this._isSubscribed;
    }

    set isSubscribed(_isSubscribed: boolean) {
        this._isSubscribed = _isSubscribed;
    }

    toString(): string {
        return `{ 
            Icon: ${this._icon},
            Name: ${this._name}, 
            Subscription: ${this._subscription}, 
            Subscribed: ${this._subscribed},
            Is Subscribed: ${this._isSubscribed}
        }`;
    }

}

export class PlazzaViewModel {

    private _metadata: PlazzaMetadataModel | undefined;
    private _recommend: PlazzaRecommendModel;
    private _events: SimpleMessageModel[] | undefined;
    private _dataset: UnitAnchorModel[];

    constructor(_metadata: PlazzaMetadataModel | undefined, _recommend: PlazzaRecommendModel, _events: SimpleMessageModel[] | undefined,
        _dataset: UnitAnchorModel[]) {
        this._metadata = _metadata;
        this._recommend = _recommend;
        this._events = _events;
        this._dataset = _dataset;
    }

    get metadata(): PlazzaMetadataModel | undefined {
        return this._metadata;
    }

    set metadata(_metadata: PlazzaMetadataModel | undefined) {
        this._metadata = _metadata;
    }

    get recommend(): PlazzaRecommendModel {
        return this._recommend;
    }

    set recommend(_recommend: PlazzaRecommendModel) {
        this._recommend = _recommend;
    }

    get events(): SimpleMessageModel[] | undefined {
        return this._events;
    }

    set events(_events: SimpleMessageModel[] | undefined) {
        this._events = _events;
    }

    get dataset(): UnitAnchorModel[] {
        return this._dataset;
    }

    set dataset(_dataset: UnitAnchorModel[]) {
        this._dataset = _dataset;
    }

    toString(): string {
        return `{ 
            Metadata: ${this._metadata},
            Recommend: ${this._recommend}, 
            Events: ${this._events}, 
            Dataset: ${this._dataset}
        }`;
    }

}

export const createPlazzaData = (count: number): PlazzaViewModel[] => {
    let list: PlazzaViewModel[] = new Array();

    for (let i = 0; i < count; i++) {
        let model: PlazzaViewModel = new PlazzaViewModel(
            undefined,
            new PlazzaRecommendModel(
                new CarouselGroupModel(0, undefined, undefined), new CarouselGroupModel(0, undefined, undefined),
                new CarouselGroupModel(0, undefined, undefined), new CarouselGroupModel(0, undefined, undefined)
            ),
            new Array(6), new Array(6)
        );
        list.push(model);
    }

    return list;
}

export const PLAZZA_VIEW_INITIAL_DATA: PlazzaViewModel[] = createPlazzaData(8);