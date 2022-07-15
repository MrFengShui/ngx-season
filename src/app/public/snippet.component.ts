import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    HostBinding,
    Input,
    NgZone,
    ViewEncapsulation
} from "@angular/core";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {HttpClient} from "@angular/common/http";

import {OctopusToast} from "../overlay/overlay.service";

type CodeSnippetSource = {name: string, code: string};

@Component({
    animations: [
        trigger('SHOW_HIDE', [
            state('show', style({height: '30rem'})),
            state('hide', style({height: 0})),
            transition('show <=> hide', animate('250ms linear'))
        ])
    ],
    encapsulation: ViewEncapsulation.None,
    selector: 'octopus-snippet',
    styleUrls: ['snippet.component.scss'],
    templateUrl: 'snippet.component.html'
})
export class OctopusSnippet implements AfterViewInit {

    @Input('subject') subject: string = '';
    @Input('path') path: string = '';
    @Input('names') names: string[] = [];

    @HostBinding('class') class: string = 'octopus-snippet';

    sources: CodeSnippetSource[] = [];
    state: boolean = false;

    constructor(
        private _cdr: ChangeDetectorRef,
        private _http: HttpClient,
        private _zone: NgZone,
        private _toast: OctopusToast
    ) {
    }

    ngAfterViewInit() {
        if (this.names.length > 0) {
            this.loadSourceFile(this.path, this.names);
        }
    }

    listenCopiedChange(copied: boolean): void {
        if (copied) {
            this._toast.config({data: {type: 'success', text: 'Code Copied'}}).open();
        }
    }

    private loadSourceFile(path: string, names: string[], index: number = 0): void {
        let subscription = this._zone.runOutsideAngular(() =>
            this._http.get(`${path}/${names[index]}`, {responseType: 'text'})
                .subscribe(value => {
                    this.sources.push({name: names[index], code: value});
                    this._zone.run(() => this._cdr.markForCheck());
                    subscription.unsubscribe();

                    if (index < names.length - 1) {
                        this.loadSourceFile(path, names, index + 1);
                    }
                }));
    }

}
