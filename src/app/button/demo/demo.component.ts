import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, NgZone
} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

import {OctopusSectionEntity} from "../../public/section.component";

import {OctopusColorPalette} from "../../global/enums.utils";

export type OctopusDemoButton = {color: OctopusColorPalette, label: string};

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'octo-demo-button-overview',
    templateUrl: 'overview.component.html'
})
export class OctopusDemoButtonOverview implements AfterViewInit {

    sections$: Observable<OctopusSectionEntity[]> = of([]);

    constructor(
        private _cdr: ChangeDetectorRef,
        private _http: HttpClient,
        private _zone: NgZone
    ) {
    }

    ngAfterViewInit() {
        let subscription = this._zone.runOutsideAngular(() =>
            this._http.get<OctopusSectionEntity[]>('assets/docs/button/overview.json', {responseType: 'json'})
                .subscribe(value => {
                    this.sections$ = of(value);
                    this._cdr.detectChanges();
                    subscription.unsubscribe();
                }));
    }

}

@Component({
    selector: 'octo-demo-button-api',
    templateUrl: 'api.component.html'
})
export class OctopusDemoButtonAPI {}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'octo-demo-button-example',
    templateUrl: 'example.component.html'
})
export class OctopusDemoButtonExample {

    readonly PATH: string = 'app/button/case';
    readonly CASE_1_NAMES: string[] = ['case1.component.html', 'case1.component.ts'];
    readonly CASE_2_NAMES: string[] = ['case2.component.html', 'case2.component.ts'];
    readonly CASE_3_NAMES: string[] = ['case3.component.html', 'case3.component.ts'];
    readonly CASE_4_NAMES: string[] = ['case4.component.html', 'case4.component.ts'];
    readonly CASE_5_NAMES: string[] = ['case5.component.html', 'case5.component.ts'];

}
