import { Component, AfterViewInit, ElementRef, Renderer2, Input } from "@angular/core";

@Component({
    selector: 'ngx-sui-card-action-block',
    template: `<ng-content></ng-content>`
})
export class NGXSeasonCardActionBlockComponent implements AfterViewInit {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) { }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'card-action-block');
    }

}

@Component({
    selector: 'ngx-sui-card-media-block',
    template: `
        <ngx-sui-avatar [avatarSrc]="avatarSrc" [avatarAlt]="avatarAlt" avatarSize="lg"></ngx-sui-avatar>
        <div class="text-wrapper">
            <span class="card-title">{{ title }}</span>
            <span class="card-subtitle">{{ subtitle }}</span>
        </div>
        <div class="action-wrapper"><ng-content></ng-content></div>
    `
})
export class NGXSeasonCardMediaBlockComponent implements AfterViewInit {

    @Input('cardAvatarAlt')
    set avatarAlt(avatarAlt: string | undefined) {
        this._avatarAlt = avatarAlt;
    }

    get avatarAlt(): string | undefined {
        return this._avatarAlt;
    }

    @Input('cardAvatarSrc')
    set avatarSrc(avatarSrc: string | undefined) {
        this._avatarSrc = avatarSrc;
    }

    get avatarSrc(): string | undefined {
        return this._avatarSrc;
    }

    @Input('cardTitle')
    set title(title: string | undefined) {
        this._title = title;
    }

    get title(): string | undefined {
        return this._title;
    }

    @Input('cardSubtitle')
    set subtitle(subtitle: string | undefined) {
        this._subtitle = subtitle;
    }

    get subtitle(): string | undefined {
        return this._subtitle;
    }

    private _avatarAlt: string | undefined;
    private _avatarSrc: string | undefined;
    private _title: string | undefined;
    private _subtitle: string | undefined;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) { }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'card-media-block');
    }

}

