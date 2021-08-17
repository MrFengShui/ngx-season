import { HttpClient } from "@angular/common/http";
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-demo-icon-view',
    styleUrls: ['../demo.module.scss'],
    templateUrl: './icon.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoIconViewComponent implements AfterViewInit {

    names: string[] = [];

    constructor(
        private _cdr: ChangeDetectorRef,
        private _http: HttpClient
    ) { }

    ngAfterViewInit() {
        this._http.get('assets/icons/filled.codepoints.txt', { responseType: 'text' }).subscribe(value => {
            let lines: string[] = value.split('\n').filter(item => item !== '');
            lines.forEach(item => this.names.push(item.split(' ')[0]));
            this._cdr.detectChanges();
        });
    }

}