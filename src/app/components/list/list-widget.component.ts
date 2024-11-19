import { Directive, TemplateRef } from "@angular/core";

@Directive({
    selector: '[ngx-sui-ListMetaActions]'
})
export class NGXSeasonListMetaActionsDirective {

    constructor(protected _template: TemplateRef<any>) {}

    fetchTemplate(): TemplateRef<any> {
        return this._template;
    }

}

@Directive({
    selector: '[ngx-sui-ListMetaMedia]'
})
export class NGXSeasonListMetaMediaDirective {

    constructor(protected _template: TemplateRef<any>) {}

    fetchTemplate(): TemplateRef<any> {
        return this._template;
    }

}

@Directive({
    selector: '[ngx-sui-ListHeader]'
})
export class NGXSeasonListHeaderDirective {

    constructor(protected _template: TemplateRef<any>) { }

    fetchTemplate(): TemplateRef<any> {
        return this._template;
    }

}

@Directive({
    selector: '[ngx-sui-ListFooter]'
})
export class NGXSeasonListFooterDirective {

    constructor(protected _template: TemplateRef<any>) { }

    fetchTemplate(): TemplateRef<any> {
        return this._template;
    }

}

