import { TemplatePortal } from "@angular/cdk/portal";
import { AfterContentInit, AfterViewInit, Component, ContentChild, Directive, ElementRef, Renderer2, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[ngx-sui-ListHeader]'
})
export class NGXSeasonListHeaderDirective {
    
    constructor(protected _template: TemplateRef<any>) {}

    fetchTemplate(): TemplateRef<any> {
        return this._template;
    }

}

@Directive({
    selector: '[ngx-sui-ListFooter]'
})
export class NGXSeasonListFooterDirective {
    
    constructor(protected _template: TemplateRef<any>) {}

    fetchTemplate(): TemplateRef<any> {
        return this._template;
    }

}

@Component({
    selector: 'ngx-sui-list',
    template: `
        <div class="list-header" *ngIf="headerTemplate"><ng-container [cdkPortalOutlet]="headerPortal"></ng-container></div>
        <ng-content select="ngx-sui-list-item, ngx-sui-list-check-item, ngx-sui-list-meta-item"></ng-content>
        <div class="list-footer" *ngIf="footerTemplate"><ng-container [cdkPortalOutlet]="footerPortal"></ng-container></div>
        <ng-template><ng-content select="[ngx-sui-ListHeader], [ngx-sui-ListFooter]"></ng-content></ng-template>
    `
})
export class NGXSeasonListComponent implements AfterContentInit, AfterViewInit {

    @ContentChild(NGXSeasonListHeaderDirective)
    protected headerTemplate: NGXSeasonListHeaderDirective | undefined;

    @ContentChild(NGXSeasonListFooterDirective)
    protected footerTemplate: NGXSeasonListFooterDirective | undefined;

    protected headerPortal: TemplatePortal | undefined;
    protected footerPortal: TemplatePortal | undefined;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _vcr: ViewContainerRef
    ) {}

    ngAfterContentInit(): void {
        if (this.headerTemplate) this.headerPortal = new TemplatePortal(this.headerTemplate.fetchTemplate(), this._vcr);

        if (this.footerTemplate) this.footerPortal = new TemplatePortal(this.footerTemplate.fetchTemplate(), this._vcr);
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'list');
    }

}
