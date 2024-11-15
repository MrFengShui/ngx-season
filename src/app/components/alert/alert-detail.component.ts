import { Component, Input } from "@angular/core";
import { NGXSeasonAlertComponent } from "./alert.component";


@Component({
    selector: 'ngx-sui-detail-alert',
    template: `
        <header class="alert-header">
            <ngx-sui-icon [iconColor]="color" [iconShape]="iconShape$ | async" iconSize="lg" iconSolid="true"></ngx-sui-icon>
            <span class="alert-text-wrapper">{{ subject }}</span>
        </header>
        <div class="alert-content">{{ description }}</div>
    `
})
export class NGXSeasonDetailAlertComponent extends NGXSeasonAlertComponent {

    @Input('alertSub')
    set subject(subject: string | undefined | null) {
        this._subject = subject ? subject : undefined;
    }

    get subject(): string | undefined {
        return this._subject;
    }

    @Input('alertDesc')
    set description(description: string | undefined | null) {
        this._description = description ? description : undefined;
    }

    get description(): string | undefined {
        return this._description;
    }

    private _subject: string | undefined;
    private _description: string | undefined;

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'detail-alert');
    }

}
