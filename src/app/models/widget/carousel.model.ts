export class CarouselUnitModel {

    private _cumSubject: string;
    private _cumSource: string;
    private _cumType: number;
    private _cumTarget: string;

    constructor(_cumSubject: string, _cumSource: string, _cumType: number, _cumTarget: string) {
        this._cumSubject = _cumSubject;
        this._cumSource = _cumSource;
        this._cumType = _cumType;
        this._cumTarget = _cumTarget;
    }

    get cumSubject(): string {
        return this._cumSubject;
    }

    set cumSubject(_cumSubject: string) {
        this._cumSubject = _cumSubject;
    }

    get cumSource(): string {
        return this._cumSource;
    }

    set cumSource(_cumSource: string) {
        this._cumSource = _cumSource;
    }

    get cumType(): number {
        return this._cumType;
    }

    set cumType(_cumType: number) {
        this._cumType = _cumType;
    }

    get cumTarget(): string {
        return this._cumTarget;
    }

    set cumTarget(_cumTarget: string) {
        this._cumTarget = _cumTarget;
    }

    toString(): string {
        return `{ 
            Subject: ${this._cumSubject},
            Source: ${this._cumSource}, 
            Type: ${this._cumType}, 
            Target: ${this._cumTarget}
        }`;
    }

}

export class CarouselGroupModel {

    private _cgmIndex: number;
    private _cgmSelect: CarouselUnitModel | undefined;
    private _cgmGroup: CarouselUnitModel[] | undefined;

    constructor(_cgmIndex: number, _cgmSelect: CarouselUnitModel | undefined, _cgmGroup: CarouselUnitModel[] | undefined) {
        this._cgmIndex = _cgmIndex;
        this._cgmSelect = _cgmSelect;
        this._cgmGroup = _cgmGroup;
    }

    get cgmIndex(): number {
        return this._cgmIndex;
    }

    set cgmIndex(_cgmIndex: number) {
        this._cgmIndex = _cgmIndex;
    }

    get cgmSelect(): CarouselUnitModel | undefined {
        return this._cgmSelect;
    }

    set cgmSelect(_cgmSelect: CarouselUnitModel | undefined) {
        this._cgmSelect = _cgmSelect;
    }

    get cgmGroup(): CarouselUnitModel[] | undefined {
        return this._cgmGroup;
    }

    set cgmGroup(_cgmGroup: CarouselUnitModel[] | undefined) {
        this._cgmGroup = _cgmGroup;
    }

}