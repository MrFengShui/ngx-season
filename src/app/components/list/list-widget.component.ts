import { Component, AfterViewInit, ElementRef, Renderer2, Input, Directive, TemplateRef } from "@angular/core";

@Directive({
    selector: '[ngx-sui-ListItemHeader]'
})
export class NGXSeasonListItemHeaderDirective {

    constructor(protected _template: TemplateRef<any>) {}

    fetchTemplate(): TemplateRef<any> {
        return this._template;
    }

}

@Directive({
    selector: '[ngx-sui-ListItemContent]'
})
export class NGXSeasonListItemContentDirective {

    constructor(protected _template: TemplateRef<any>) {}

    fetchTemplate(): TemplateRef<any> {
        return this._template;
    }

}

@Directive({
    selector: '[ngx-sui-ListItemFooter]'
})
export class NGXSeasonListItemFooterDirective {

    constructor(protected _template: TemplateRef<any>) {}

    fetchTemplate(): TemplateRef<any> {
        return this._template;
    }

}

@Directive({
    selector: '[ngx-sui-ListItemMedia]'
})
export class NGXSeasonListItemMediaDirective {

    constructor(protected _template: TemplateRef<any>) {}

    fetchTemplate(): TemplateRef<any> {
        return this._template;
    }

}