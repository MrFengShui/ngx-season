import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { TemplatePortal } from "@angular/cdk/portal";
import { AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef } from "@angular/core";

import { NGXSeasonCardHeaderDirective } from "./card-header.component";
import { NGXSeasonCardFooterDirective } from "./card-footer.component";
import { NGXSeasonCardActionBlockComponent, NGXSeasonCardMediaBlockComponent } from "./card-block.component";

@Component({
    selector: 'ngx-sui-card',
    template: `
        <ngx-sui-card-header #cardHeader *ngIf="headerTemplate || mediaBlockComponent"><ng-template [cdkPortalOutlet]="headerPortal"></ng-template></ngx-sui-card-header>
        <ng-content select="ngx-sui-card-content, img[ngx-sui-CardImage], ng-container"></ng-content>
        <ngx-sui-card-footer #cardFooter *ngIf="footerTemplate || actionBlockComponent"><ng-template [cdkPortalOutlet]="footerPortal"></ng-template></ngx-sui-card-footer>
    `
})
export class NGXSeasonCardComponent implements OnChanges, AfterViewInit, AfterContentInit {

    @Input('cardShadow')
    set shadow(shadow: boolean | string) {
        this._shadow = coerceBooleanProperty(shadow);
    }

    get shadow(): boolean {
        return this._shadow;
    }

    private _shadow: boolean = false;

    @ViewChild('cardHeader', { read: ElementRef, static: false })
    protected cardHeader: ElementRef<HTMLElement> | undefined;

    @ViewChild('cardFooter', { read: ElementRef, static: false })
    protected cardFooter: ElementRef<HTMLElement> | undefined;

    @ContentChild(NGXSeasonCardHeaderDirective, { read: TemplateRef, static: true })
    protected headerTemplate: TemplateRef<any> | undefined;

    @ContentChild(NGXSeasonCardFooterDirective, { read: TemplateRef, static: true })
    protected footerTemplate: TemplateRef<any> | undefined;

    @ContentChild(NGXSeasonCardMediaBlockComponent, { read: ElementRef, static: true })
    protected mediaBlockComponent: ElementRef<HTMLElement> | undefined;

    @ContentChild(NGXSeasonCardActionBlockComponent, { read: ElementRef, static: true })
    protected actionBlockComponent: ElementRef<HTMLElement> | undefined;

    protected headerPortal: TemplatePortal | null = null;
    protected footerPortal: TemplatePortal | null = null;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _vcr: ViewContainerRef
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        let keys: string[] | null = Object.keys(changes);

        if (keys.includes('shadow')) {
            this.setupCardShadow(changes['shadow'].currentValue as boolean);
        }

        keys.splice(0);
        keys = null;
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'card');
        this.setupCardShadow(this.shadow);
    }

    ngAfterContentInit(): void {
        if (this.headerTemplate) {
            if (this.mediaBlockComponent) throw new Error();

            this.headerPortal = new TemplatePortal(this.headerTemplate, this._vcr);
        }

        if (this.footerTemplate) {
            if (this.actionBlockComponent) throw new Error();

            this.footerPortal = new TemplatePortal(this.footerTemplate, this._vcr);
        }

        if (this.mediaBlockComponent) { 
            if (this.headerTemplate) throw new Error();

            let task = setTimeout(() => {
                clearTimeout(task);

                const parentElement: HTMLElement = this.cardHeader?.nativeElement as HTMLElement;
                const blockElement: HTMLElement = this.mediaBlockComponent?.nativeElement as HTMLElement;
                this._renderer.appendChild(parentElement, blockElement);
            });
        }

        if (this.actionBlockComponent) { 
            if (this.footerTemplate) throw new Error();

            let task = setTimeout(() => {
                clearTimeout(task);

                const parentElement: HTMLElement = this.cardFooter?.nativeElement as HTMLElement;
                const blockElement: HTMLElement = this.actionBlockComponent?.nativeElement as HTMLElement;
                this._renderer.appendChild(parentElement, blockElement);
            });
        }
    }

    protected setupCardShadow(shadow: boolean): void {
        const element: HTMLElement = this._element.nativeElement;

        let task = setTimeout(() => {
            clearTimeout(task);

            if (shadow) {
                this._renderer.addClass(element, 'card-shadow');
            } else {
                this._renderer.removeClass(element, 'card-shadow');
            }
        });
    }

}


