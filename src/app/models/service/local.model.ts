export class LanguageUnitModel {

    private _lumCode: string;
    private _lumFlag: string;
    private _lumText: string;

    constructor(_lumCode: string, _lumFlag: string, _lumText: string) {
        this._lumCode = _lumCode;
        this._lumFlag = _lumFlag;
        this._lumText = _lumText;
    }

    get lumCode(): string {
        return this._lumCode;
    }

    set lumCode(_lumCode: string) {
        this._lumCode = _lumCode;
    }

    get lumFlag(): string {
        return this._lumFlag;
    }

    set lumFlag(_lumFlag: string) {
        this._lumFlag = _lumFlag;
    }

    get lumText(): string {
        return this._lumText;
    }

    set lumText(_lumText: string) {
        this._lumText = _lumText;
    }

}

export class ThemeUnitModel {

    private _tumName: string;
    private _tumText: string;

    constructor(_tumName: string, _tumText: string) {
        this._tumName = _tumName;
        this._tumText = _tumText;
    }

    get tumName(): string {
        return this._tumName;
    }

    set tumName(_tumName: string) {
        this._tumName = _tumName;
    }

    get tumText(): string {
        return this._tumText;
    }

    set tumText(_tumText: string) {
        this._tumText = _tumText;
    }

}