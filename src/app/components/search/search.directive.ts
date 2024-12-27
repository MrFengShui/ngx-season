import { Directive, TemplateRef } from "@angular/core";

@Directive({
    selector: '[ngx-sui-SearchFieldAddon]'
})
export class NGXSeasonSearchFieldAddonDirective {

    constructor(protected _template: TemplateRef<unknown>) {}

    fetchTemplate(): TemplateRef<unknown> {
        return this._template;
    }

}
