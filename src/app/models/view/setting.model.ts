export class SettingNoticeUnitModel {

    private _snumRecommend: boolean;
    private _snumSubscribe: boolean;
    private _snumComment: boolean;
    private _snumReply: boolean;

    constructor(_snumRecommend: boolean, _snumSubscribe: boolean, _snumComment: boolean, _snumReply: boolean) {
        this._snumRecommend = _snumRecommend;
        this._snumSubscribe = _snumSubscribe;
        this._snumComment = _snumComment;
        this._snumReply = _snumReply;
    }

    get snumRecommend(): boolean {
        return this._snumRecommend;
    }

    set snumRecommend(_snumRecommend: boolean) {
        this._snumRecommend = _snumRecommend;
    }

    get snumSubscribe(): boolean {
        return this._snumSubscribe;
    }

    set snumSubscribe(_snumSubscribe: boolean) {
        this._snumSubscribe = _snumSubscribe;
    }

    get snumComment(): boolean {
        return this._snumComment;
    }

    set snumComment(_snumComment: boolean) {
        this._snumComment = _snumComment;
    }

    get snumReply(): boolean {
        return this._snumReply;
    }

    set snumReply(_snumReply: boolean) {
        this._snumReply = _snumReply;
    }

}

export class SettingNoticeModel {

    private _snmPlatform: SettingNoticeUnitModel;
    private _snmEmail: SettingNoticeUnitModel;

    constructor(_snmPlatform: SettingNoticeUnitModel, _snmEmail: SettingNoticeUnitModel) {
        this._snmPlatform = _snmPlatform;
        this._snmEmail = _snmEmail;
    }

    get snmPlatform(): SettingNoticeUnitModel {
        return this._snmPlatform;
    }

    set snmPlatform(_snmPlatform: SettingNoticeUnitModel) {
        this._snmPlatform = _snmPlatform;
    }

    get snmEmail(): SettingNoticeUnitModel {
        return this._snmEmail;
    }

    set snmEmail(_snmEmail: SettingNoticeUnitModel) {
        this._snmEmail = _snmEmail;
    }

}