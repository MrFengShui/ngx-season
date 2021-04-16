import { CommentModel } from "../service/media.model";
import { ChatMessageModel } from "../support.model";
import { UnitAnchorModel } from "../widget/block.model";

export class MediaMetaModel {

    private _title: string;
    private _subtitle: string;
    private _description: string;
    private _view: number;
    private _upload: Date;
    private _like: number;
    private _dislike: number;
    private _tags: Array<{ name: string, link: string }>;
    private _icon: string;
    private _name: string;
    private _subscribed: number;
    private _isSubscribed: boolean;
    private _isActive: boolean;

    constructor(_title: string, _subtitle: string, _description: string, _view: number, _upload: Date, _like: number, _dislike: number,
        _tags: Array<{ name: string, link: string }>, _icon: string, _name: string, _subscribed: number, _isSubscribed: boolean, _isActive: boolean) {
        this._title = _title;
        this._subtitle = _subtitle;
        this._description = _description;
        this._view = _view;
        this._upload = _upload;
        this._like = _like;
        this._dislike = _dislike;
        this._tags = _tags;
        this._icon = _icon;
        this._name = _name;
        this._subscribed = _subscribed;
        this._isSubscribed = _isSubscribed;
        this._isActive = _isActive;
    }

    get title(): string {
        return this._title;
    }

    set title(_title: string) {
        this._title = _title;
    }

    get subtitle(): string {
        return this._subtitle;
    }

    set subtitle(_subtitle: string) {
        this._subtitle = _subtitle;
    }

    get description(): string {
        return this._description;
    }

    set description(_description: string) {
        this._description = _description;
    }

    get view(): number {
        return this._view;
    }

    set view(_view: number) {
        this._view = _view;
    }

    get upload(): Date {
        return this._upload;
    }

    set upload(_upload: Date) {
        this._upload = _upload;
    }

    get like(): number {
        return this._like;
    }

    set like(_like: number) {
        this._like = _like;
    }

    get dislike(): number {
        return this._dislike;
    }

    set dislike(_dislike: number) {
        this._dislike = _dislike;
    }

    get tags(): Array<{ name: string, link: string }> {
        return this._tags;
    }

    set tags(_tags: Array<{ name: string, link: string }>) {
        this._tags = _tags;
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

    get isActive(): boolean {
        return this._isActive;
    }

    set isActive(_isActive: boolean) {
        this._isActive = _isActive;
    }

}

export class MediaCommentModel {

    private _icon: string;
    private _name: string;
    private _content: string;
    private _comments: CommentModel[];

    constructor(_icon: string, _name: string, _content: string, _comments: CommentModel[]) {
        this._icon = _icon;
        this._name = _name;
        this._content = _content;
        this._comments = _comments;
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

    get content(): string {
        return this._content;
    }

    set content(_content: string) {
        this._content = _content;
    }

    get comments(): CommentModel[] {
        return this._comments;
    }

    set comments(_comments: CommentModel[]) {
        this._comments = _comments;
    }

}

export class MediaChatModel {

    public static CHAT_TYPE_REPLAY: number = -1;
    public static CHAT_TYPE_LIVE: number = 1;

    private _id: string;
    private _type: number;
    private _icon: string;
    private _message: ChatMessageModel | undefined;
    private _messages: ChatMessageModel[];

    constructor(_id: string, _type: number, _icon: string, _message: ChatMessageModel | undefined, _messages: ChatMessageModel[]) {
        this._id = _id;
        this._type = _type;
        this._icon = _icon;
        this._messages = _messages;
    }

    get id(): string {
        return this._id;
    }

    set id(_id: string) {
        this._id = _id;
    }

    get type(): number {
        return this._type;
    }

    set type(_type: number) {
        this._type = _type;
    }

    get icon(): string {
        return this._icon;
    }

    set icon(_icon: string) {
        this._icon = _icon;
    }

    get message(): ChatMessageModel | undefined {
        return this._message;
    }

    set message(_message: ChatMessageModel | undefined) {
        this._message = _message;
    }

    get messages(): ChatMessageModel[] {
        return this._messages;
    }

    set messages(_messages: ChatMessageModel[]) {
        this._messages = _messages;
    }

}

export class MediaPlayViewModel {

    private _meta: MediaMetaModel | undefined;
    private _chat: MediaChatModel | undefined;
    private _recommend: UnitAnchorModel[];
    private _comment: MediaCommentModel | undefined;

    constructor(_meta: MediaMetaModel | undefined, _chat: MediaChatModel | undefined, _recommend: UnitAnchorModel[], _comment: MediaCommentModel | undefined) {
        this._meta = _meta;
        this._chat = _chat;
        this._recommend = _recommend;
        this._comment = _comment;
    }

    get meta(): MediaMetaModel | undefined {
        return this._meta;
    }

    set meta(_meta: MediaMetaModel | undefined) {
        this._meta = _meta;
    }

    get chat(): MediaChatModel | undefined {
        return this._chat;
    }

    set chat(_chat: MediaChatModel | undefined) {
        this._chat = _chat;
    }

    get recommend(): UnitAnchorModel[] {
        return this._recommend;
    }

    set recommend(_recommend: UnitAnchorModel[]) {
        this._recommend = _recommend;
    }

    get comment(): MediaCommentModel | undefined {
        return this._comment;
    }

    set comment(_comment: MediaCommentModel | undefined) {
        this._comment = _comment;
    }

}
