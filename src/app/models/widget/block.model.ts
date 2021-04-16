export class UnitAnchorModel {

    private _uamID: string;
    private _uamSubject: string;
    private _uamPosters: string[];
    private _uamAvatar: string;
    private _uamName: string;
    private _uamView: number;
    private _uamUpload: Date;
    private _uamType: number;

    constructor(_uamID: string, _uamSubject: string, _uamPosters: string[], _uamAvatar: string, _uamName: string, _uamView: number, _uamUpload: Date, _uamType: number) {
        this._uamID = _uamID;
        this._uamSubject = _uamSubject;
        this._uamPosters = _uamPosters;
        this._uamAvatar = _uamAvatar;
        this._uamName = _uamName;
        this._uamView = _uamView;
        this._uamUpload = _uamUpload;
        this._uamType = _uamType;

    }

    get uamID(): string {
        return this._uamID;
    }

    set uamID(_uamID: string) {
        this._uamID = _uamID;
    }

    get uamSubject(): string {
        return this._uamSubject;
    }

    set uamSubject(_uamSubject: string) {
        this._uamSubject = _uamSubject;
    }

    get uamPosters(): string[] {
        return this._uamPosters;
    }

    set uamPosters(_uamPosters: string[]) {
        this._uamPosters = _uamPosters;
    }

    get uamAvatar(): string {
        return this._uamAvatar;
    }

    set uamAvatar(_uamAvatar: string) {
        this._uamAvatar = _uamAvatar;
    }

    get uamName(): string {
        return this._uamName;
    }

    set uamName(_uamName: string) {
        this._uamName = _uamName;
    }

    get uamView(): number {
        return this._uamView;
    }

    set uamView(_uamView: number) {
        this._uamView = _uamView;
    }

    get uamUpload(): Date {
        return this._uamUpload;
    }

    set uamUpload(_uamUpload: Date) {
        this._uamUpload = _uamUpload;
    }

    get uamType(): number {
        return this._uamType;
    }

    set uamType(_uamType: number) {
        this._uamType = _uamType;
    }

    toString(): string {
        return `{ 
            ID: ${this._uamID},
            Subject: ${this._uamSubject}, 
            Posters: ${this._uamPosters}, 
            Avatar: ${this._uamAvatar}, 
            Name: ${this._uamName}, 
            View: ${this._uamView},
            Upload: ${this._uamUpload},
            Type: ${this._uamType}
        }`;
    }

}