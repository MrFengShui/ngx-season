import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

import { IconType } from "src/app/components/icon/icon.component";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-demo-icon-view',
    templateUrl: './icon.component.html'
})
export class DemoIconView implements OnInit {

    list$!: Observable<string[]>;
    label: string = '';
    type: IconType = 'filled';

    constructor(private _http: HttpClient) { }

    ngOnInit() {
        this.handleChangeActionEvent('Filled');
    }

    handleChangeActionEvent(type: string): void {
        this.label = `${type} Icon`;
        this.type = type.toLowerCase() as IconType;
        this.list$ = this._http.get(`assets/icons/${this.type}.codepoints.txt`, { responseType: 'text' })
            .pipe(
                map(value => value.split(new RegExp(/\r\n|\n/))),
                map(list => {
                    let array: string[] = [];
                    list.filter(item => item.length > 0).forEach(item => {
                        let split: string[] = item.split(' ');
                        array.push(split[0]);
                    });
                    return array;
                })
            );
    }

}