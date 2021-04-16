export class CommentReplyModel {

    private _crmID: string;
    private _crmPID: string;
    private _crmAvatar: string;
    private _crmName: string;
    private _crmCommit: Date;
    private _crmContent: string;
    private _crmExpanded: boolean;

    constructor(_crmID: string, _crmPID: string, _crmAvatar: string, _crmName: string, _crmCommit: Date, _crmContent: string,
        _crmExpanded: boolean) {
        this._crmID = _crmID;
        this._crmPID = _crmPID;
        this._crmAvatar = _crmAvatar;
        this._crmName = _crmName;
        this._crmCommit = _crmCommit;
        this._crmContent = _crmContent;
        this._crmExpanded = _crmExpanded;
    }

    get crmID(): string {
        return this._crmID;
    }

    set crmID(_crmID: string) {
        this._crmID = _crmID;
    }

    get crmPID(): string {
        return this._crmPID;
    }

    set crmPID(_crmPID: string) {
        this._crmPID = _crmPID;
    }

    get crmAvatar(): string {
        return this._crmAvatar;
    }

    set crmAvatar(_crmAvatar: string) {
        this._crmAvatar = _crmAvatar;
    }

    get crmName(): string {
        return this._crmName;
    }

    set crmName(_crmName: string) {
        this._crmName = _crmName;
    }

    get crmCommit(): Date {
        return this._crmCommit;
    }

    set crmCommit(_crmCommit: Date) {
        this._crmCommit = _crmCommit;
    }

    get crmContent(): string {
        return this._crmContent;
    }

    set crmContent(_crmContent: string) {
        this._crmContent = _crmContent;
    }

    get crmExpanded(): boolean {
        return this._crmExpanded;
    }

    set crmExpanded(_crmExpanded: boolean) {
        this._crmExpanded = _crmExpanded;
    }

}

export class CommentModel {

    private _cmID: string;
    private _cmPID: string;
    private _cmAvatar: string;
    private _cmName: string;
    private _cmCommit: Date;
    private _cmContent: string;
    private _cmExpanded: boolean;
    private _cmReplies: CommentReplyModel[];

    constructor(_cmID: string, _cmPID: string, _cmAvatar: string, _cmName: string, _cmCommit: Date, _cmContent: string,
        _cmExpanded: boolean, _cmReplies: CommentReplyModel[]) {
        this._cmID = _cmID;
        this._cmPID = _cmPID;
        this._cmAvatar = _cmAvatar;
        this._cmName = _cmName;
        this._cmCommit = _cmCommit;
        this._cmContent = _cmContent;
        this._cmExpanded = _cmExpanded;
        this._cmReplies = _cmReplies;
    }

    get cmID(): string {
        return this._cmID;
    }

    set cmID(_cmID: string) {
        this._cmID = _cmID;
    }

    get cmPID(): string {
        return this._cmPID;
    }

    set cmPID(_cmPID: string) {
        this._cmPID = _cmPID;
    }

    get cmAvatar(): string {
        return this._cmAvatar;
    }

    set cmAvatar(_cmAvatar: string) {
        this._cmAvatar = _cmAvatar;
    }

    get cmName(): string {
        return this._cmName;
    }

    set cmName(_cmName: string) {
        this._cmName = _cmName;
    }

    get cmCommit(): Date {
        return this._cmCommit;
    }

    set cmCommit(_cmCommit: Date) {
        this._cmCommit = _cmCommit;
    }

    get cmContent(): string {
        return this._cmContent;
    }

    set cmContent(_cmContent: string) {
        this._cmContent = _cmContent;
    }

    get cmExpanded(): boolean {
        return this._cmExpanded;
    }

    set cmExpanded(_cmExpanded: boolean) {
        this._cmExpanded = _cmExpanded;
    }

    get cmReplies(): CommentReplyModel[] {
        return this._cmReplies;
    }

    set cmReplies(_cmReplies: CommentReplyModel[]) {
        this._cmReplies = _cmReplies;
    }

}