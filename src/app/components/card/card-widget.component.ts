import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, Renderer2, RendererStyleFlags2, SimpleChanges } from "@angular/core";

export type NGXSeasonCardFooterAlignment = 'start' | 'end' | 'center' | 'justify';

@Component({
    selector: '',
    template: ''
})
export abstract class NGXSeasonCardWidgetComponent {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) { }

    fetchHostElement(): HTMLElement {
        return this._element.nativeElement;
    }

}

@Component({
    selector: 'ngx-sui-card-header',
    template: `
        <ng-container *ngIf="customized; then custom else native"></ng-container>
        <ng-template #native>
            <ngx-sui-avatar [avatarSrc]="avatarSrc" [avatarAlt]="avatarAlt" avatarSize="lg"></ngx-sui-avatar>
            <div class="header-wrapper">
                <span class="header-subject">{{ subject }}</span>
                <span class="header-description">{{ description }}</span>
            </div>
        </ng-template>
        <ng-template #custom><ng-content></ng-content></ng-template>
    `
})
export class NGXSeasonCardHeaderComponent extends NGXSeasonCardWidgetComponent implements AfterViewInit {

    @Input({ alias: 'chAvatarAlt' })
    set avatarAlt(avatarAlt: string | undefined | null) {
        this._avatarAlt = avatarAlt || undefined;
    }

    get avatarAlt(): string | undefined {
        return this._avatarAlt;
    }

    @Input({ alias: 'chAvatarSrc' })
    set avatarSrc(avatarSrc: string | undefined | null) {
        this._avatarSrc = avatarSrc || undefined;
    }

    get avatarSrc(): string | undefined {
        return this._avatarSrc;
    }

    @Input({ alias: 'chCustom' })
    set customized(customized: boolean | string | undefined | null) {
        this._customized = coerceBooleanProperty(customized);
    }

    get customized(): boolean {
        return this._customized;
    }

    @Input({ alias: 'chSubject' })
    set subject(subject: string | undefined | null) {
        this._subject = subject || undefined;
    }

    get subject(): string | undefined {
        return this._subject;
    }

    @Input({ alias: 'chDescription' })
    set description(description: string | undefined | null) {
        this._description = description || undefined;
    }

    get description(): string | undefined {
        return this._description;
    }

    private _avatarAlt: string | undefined;
    private _avatarSrc: string | undefined;
    private _customized: boolean = false;
    private _subject: string | undefined;
    private _description: string | undefined;

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'card-header');
    }

}

@Component({
    selector: 'ngx-sui-card-footer',
    template: `<ng-content></ng-content>`
})
export class NGXSeasonCardFooterComponent extends NGXSeasonCardWidgetComponent implements OnChanges, AfterViewInit {

    @Input({ alias: 'cfAlign' })
    set align(align: NGXSeasonCardFooterAlignment | undefined | null) {
        this._align = align || 'justify';
    }

    get align(): NGXSeasonCardFooterAlignment {
        return this._align;
    }

    private _align: NGXSeasonCardFooterAlignment = 'justify';

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'align') this.changeCardFooterAlign(changes[name].currentValue as NGXSeasonCardFooterAlignment);
        }
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'card-footer');

        this.changeCardFooterAlign(this.align);
    }

    protected changeCardFooterAlign(align: NGXSeasonCardFooterAlignment): void {
        let value: string | undefined;

        switch (align) {
            case 'start': value = 'flex-start'; break;
            case 'end': value = 'flex-end'; break;
            case 'center': value = 'center'; break;
            case 'justify': value = 'space-between'; break;
        }

        this._renderer.setStyle(this._element.nativeElement, '--card-footer-align', value, RendererStyleFlags2.DashCase);
    }

}

@Component({
    selector: 'ngx-sui-card-content',
    template: `<ng-content></ng-content>`
})
export class NGXSeasonCardContentComponent extends NGXSeasonCardWidgetComponent implements AfterViewInit {

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'card-content');
    }

}

