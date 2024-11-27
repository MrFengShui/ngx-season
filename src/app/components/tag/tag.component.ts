import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { AfterViewInit, Component, ContentChildren, ElementRef, Inject, InjectionToken, Input, OnChanges, QueryList, Renderer2, RendererStyleFlags2, SimpleChanges } from "@angular/core";

import { NGXSeasonColorPalette } from "src/app/utils/_palette.utils";
import { NGXSeasonIDUtils } from "src/app/utils/id.utils";

export const NGX_SEASON_TAG_GROUP_TOKEN: InjectionToken<NGXSeasonTagGroupComponent> = new InjectionToken('NGX_SEASON_TAG_GROUP_TOKEN');

@Component({
    selector: '',
    template: ''
})
export abstract class NGXSeasonTagComponent implements OnChanges, AfterViewInit {

    @Input('tagColor')
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    @Input('tagImageAlt')
    set imageAlt(imageAlt: string | undefined | null) {
        this._imageAlt = imageAlt || undefined;
    }

    get imageAlt(): string | undefined {
        return this._imageAlt;
    }

    @Input('tagImageSrc')
    set imageSrc(imageSrc: string | undefined | null) {
        this._imageSrc = imageSrc || undefined;
    }

    get imageSrc(): string | undefined {
        return this._imageSrc;
    }

    @Input('tagShowImage')
    set showImage(showImage: boolean | string | undefined | null) {
        this._showImage = coerceBooleanProperty(showImage);
    }

    get showImage(): boolean {
        return this._showImage;
    }

    @Input('tagText')
    set text(text: string | undefined | null) {
        this._text = text || undefined;
    }

    get text(): string | undefined {
        return this._text;
    }

    private _color: NGXSeasonColorPalette = 'default';
    private _imageAlt: string | undefined;
    private _imageSrc: string | undefined;

    readonly id: string = NGXSeasonIDUtils.generateHashID('ngx-sui-tag');

    private _showImage: boolean = false;
    private _text: string | undefined;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color') this.changeTagColor(changes[name].currentValue as NGXSeasonColorPalette);

            if (name === 'showImage') this.setupLeftPadding(coerceBooleanProperty(changes[name].currentValue));
        }
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'tag');

        this.changeTagColor(this.color);
        this.setupLeftPadding(this.showImage);
    }

    protected changeTagColor(color: NGXSeasonColorPalette): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-tag-color', color);
    }

    protected abstract setupLeftPadding(showImage?: boolean): void;

    protected abstract setupRightPadding(showClose?: boolean): void;

}

@Component({
    selector: 'span[ngx-sui-TextTag]',
    template: `
        <ngx-sui-avatar [avatarColor]="color" [avatarSrc]="imageSrc" [avatarAlt]="imageAlt" avatarShape="circle" avatarSize="sm" *ngIf="showImage && imageSrc"></ngx-sui-avatar>
        <div class="tag-text">{{ text }}</div>
    `
})
export class NGXSeasonTextTagComponent extends NGXSeasonTagComponent {

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'text-tag');
        this.setupRightPadding();
    }

    protected override setupLeftPadding(showImage?: boolean): void {
        this._renderer.setStyle(this._element.nativeElement, '--tag-padding-left', showImage ? 'var(--padding-25)' : 'var(--padding-50)', RendererStyleFlags2.DashCase);
    }

    protected override setupRightPadding(showClose?: boolean): void {
        this._renderer.setStyle(this._element.nativeElement, '--tag-padding-right', 'var(--padding-50)', RendererStyleFlags2.DashCase);
    }

}

@Component({
    selector: 'a[ngx-sui-LinkTag]',
    template: `
        <ngx-sui-avatar [avatarColor]="color" [avatarSrc]="imageSrc" [avatarAlt]="imageAlt" avatarShape="circle" avatarSize="sm" *ngIf="showImage && imageSrc"></ngx-sui-avatar>
        <div class="tag-text">{{ text }}</div>
        <button ngx-sui-FlatIconButton [btnColor]="color" btnCircled="true" btnIcon="close" btnSize="xs" (click)="handleDismissEvent($event)" *ngIf="showClose"></button>
    `
})
export class NGXSeasonLinkTagComponent extends NGXSeasonTagComponent {

    @Input('tagShowClose')
    set showClose(showClose: boolean | string | undefined | null) {
        this._showClose = coerceBooleanProperty(showClose);
    }

    get showClose(): boolean {
        return this._showClose;
    }

    private _showClose: boolean = false;

    constructor(
        protected override _element: ElementRef,
        protected override _renderer: Renderer2,

        @Inject(NGX_SEASON_TAG_GROUP_TOKEN)
        protected _tagGroup: NGXSeasonTagGroupComponent
    ) {
        super(_element, _renderer);
    }

    override ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        for (const name in changes) {
            if (name === 'showClose') this.setupRightPadding(coerceBooleanProperty(changes[name].currentValue));
        }
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        const element: HTMLElement = this._element.nativeElement;
        this._renderer.addClass(element, 'link-tag');
        this._renderer.setAttribute(element, 'data-tag-belong', this._tagGroup.id);

        this.setupRightPadding(this.showClose);
    }

    dismiss(): void {
        const pid: string | null = this._element.nativeElement.getAttribute('data-tag-belong');

        if (pid && this._tagGroup.id === pid) {
            const element: HTMLElement = this._element.nativeElement;
            const parentElement = this._renderer.parentNode(element);
            this._renderer.removeChild(parentElement, element);
        }
    }

    protected override setupLeftPadding(showImage?: boolean): void {
        this._renderer.setStyle(this._element.nativeElement, '--tag-padding-left', showImage ? 'var(--padding-25)' : 'var(--padding-50)', RendererStyleFlags2.DashCase);
    }

    protected override setupRightPadding(showClose?: boolean): void {
        this._renderer.setStyle(this._element.nativeElement, '--tag-padding-right', showClose ? 'var(--padding-25)' : 'var(--padding-50)', RendererStyleFlags2.DashCase);
    }

    protected handleDismissEvent(event: MouseEvent): void {
        event.stopPropagation();
        this.dismiss();
    }

}

@Component({
    selector: 'ngx-sui-tag-group',
    template: `<ng-content select="a[ngx-sui-LinkTag]"></ng-content>`,
    providers: [{ provide: NGX_SEASON_TAG_GROUP_TOKEN, useExisting: NGXSeasonTagGroupComponent }]
})
export class NGXSeasonTagGroupComponent implements AfterViewInit {

    @ContentChildren(NGXSeasonLinkTagComponent)
    protected tags: QueryList<NGXSeasonLinkTagComponent> | undefined;

    readonly id: string = NGXSeasonIDUtils.generateHashID('ngx-sui-tag-group');

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'tag-group');
    }

    dismiss(id: string): void {
        if (this.tags) {
            const tag: NGXSeasonLinkTagComponent | undefined = this.tags.find(tag => tag.id === id);
            tag?.dismiss();
        }
    }

    dismissAll(): void {
        if (this.tags) this.tags.forEach(tag => tag.dismiss());
    }

}
