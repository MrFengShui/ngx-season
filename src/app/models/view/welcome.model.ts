import { SimpleRankModel } from "../public.model";
import { UnitAnchorModel } from "../widget/block.model";
import { CarouselGroupModel } from "../widget/carousel.model";

export class WelcomeRecommendModel {

    private _icon: string;
    private _name: string;
    private _total: number;
    private _weekGroup: CarouselGroupModel;
    private _monthGroup: CarouselGroupModel;
    private _seasonGroup: CarouselGroupModel;
    private _units: UnitAnchorModel[];

    constructor(_icon: string, _name: string, _total: number, _weekGroup: CarouselGroupModel, _monthGroup: CarouselGroupModel,
        _seasonGroup: CarouselGroupModel, _units: UnitAnchorModel[]) {
        this._icon = _icon;
        this._name = _name;
        this._total = _total;
        this._weekGroup = _weekGroup;
        this._monthGroup = _monthGroup;
        this._seasonGroup = _seasonGroup;
        this._units = _units;
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

    get total(): number {
        return this._total;
    }

    set total(_total: number) {
        this._total = _total;
    }

    get weekGroup(): CarouselGroupModel {
        return this._weekGroup;
    }

    set weekGroup(_weekGroup: CarouselGroupModel) {
        this._weekGroup = _weekGroup;
    }

    get monthGroup(): CarouselGroupModel {
        return this._monthGroup;
    }

    set monthGroup(_monthGroup: CarouselGroupModel) {
        this._monthGroup = _monthGroup;
    }

    get seasonGroup(): CarouselGroupModel {
        return this._seasonGroup;
    }

    set seasonGroup(_seasonGroup: CarouselGroupModel) {
        this._seasonGroup = _seasonGroup;
    }

    get units(): UnitAnchorModel[] {
        return this._units;
    }

    set units(_units: UnitAnchorModel[]) {
        this._units = _units;
    }

    toString(): string {
        return `{ 
            Icon: ${this._icon},
            Name: ${this._name}, 
            total: ${this._total}, 
            Week Group: ${this._weekGroup},
            Month Group: ${this._monthGroup}, 
            Season Group: ${this._seasonGroup}, 
            Units: ${this._units}
        }`;
    }

}

export class WelcomeSectionModel {

    private _icon: string;
    private _name: string;
    private _total: number;
    private _units: UnitAnchorModel[];
    private _ranks: SimpleRankModel;

    constructor(_icon: string, _name: string, _total: number, _units: UnitAnchorModel[], _ranks: SimpleRankModel) {
        this._icon = _icon;
        this._name = _name;
        this._total = _total;
        this._units = _units;
        this._ranks = _ranks;
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

    get total(): number {
        return this._total;
    }

    set total(_total: number) {
        this._total = _total;
    }

    get units(): UnitAnchorModel[] {
        return this._units;
    }

    set units(_units: UnitAnchorModel[]) {
        this._units = _units;
    }

    get ranks(): SimpleRankModel {
        return this._ranks;
    }

    set ranks(_ranks: SimpleRankModel) {
        this._ranks = _ranks;
    }

    toString(): string {
        return `{ 
            Icon: ${this._icon},
            Name: ${this._name}, 
            total: ${this._total}, 
            Units: ${this._units},
            Ranks: ${this._ranks}
        }`;
    }

}

export class WelcomeViewModel {

    private _recommend: WelcomeRecommendModel;
    private _education: WelcomeSectionModel;
    private _engineering: WelcomeSectionModel;
    private _games: WelcomeSectionModel;
    private _politics: WelcomeSectionModel;
    private _science: WelcomeSectionModel;
    private _sports: WelcomeSectionModel;

    constructor(_recommend: WelcomeRecommendModel, _education: WelcomeSectionModel, _engineering: WelcomeSectionModel, _games: WelcomeSectionModel,
        _politics: WelcomeSectionModel, _science: WelcomeSectionModel, _sports: WelcomeSectionModel) {
        this._recommend = _recommend;
        this._education = _education;
        this._engineering = _engineering;
        this._games = _games;
        this._politics = _politics;
        this._science = _science;
        this._sports = _sports;
    }

    get recommend(): WelcomeRecommendModel {
        return this._recommend;
    }

    set recommend(_recommend: WelcomeRecommendModel) {
        this._recommend = _recommend;
    }

    get education(): WelcomeSectionModel {
        return this._education;
    }

    set education(_education: WelcomeSectionModel) {
        this._education = _education;
    }

    get engineering(): WelcomeSectionModel {
        return this._engineering;
    }

    set engineering(_engineering: WelcomeSectionModel) {
        this._engineering = _engineering;
    }

    get games(): WelcomeSectionModel {
        return this._games;
    }

    set games(_games: WelcomeSectionModel) {
        this._games = _games;
    }

    get politics(): WelcomeSectionModel {
        return this._politics;
    }

    set politics(_politics: WelcomeSectionModel) {
        this._politics = _politics;
    }

    get science(): WelcomeSectionModel {
        return this._science;
    }

    set science(_science: WelcomeSectionModel) {
        this._science = _science;
    }

    get sports(): WelcomeSectionModel {
        return this._sports;
    }

    set sports(_sports: WelcomeSectionModel) {
        this._sports = _sports;
    }

    toString(): string {
        return `{ 
            Recommendation: ${this._recommend},
            Education: ${this._education}, 
            Engineering: ${this._engineering}, 
            Games: ${this._games},
            Politics: ${this._politics}, 
            Science: ${this._science}, 
            Sports: ${this.sports}
        }`;
    }

}
