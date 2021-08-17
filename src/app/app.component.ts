import { AfterViewInit, ApplicationRef, Component, OnInit, Renderer2 } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {

    textChipList$: Observable<Array<{ color: string, text: string }>>;

    constructor(
        private _appRef: ApplicationRef,
        private _render: Renderer2
    ) {
        setInterval(() => this._appRef.tick(), 250);
    }

    ngOnInit() {
        this.textChipList$ = of([]);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            let list: Array<{ color: string, text: string }> = new Array();

            for (let i = 1; i <= 4; i++) {
                let array: Array<{ color: string, text: string }> = [
                    { color: 'primary', text: `Primary Icon Text ${i}` },
                    { color: 'secondary', text: `Secondary Icon Text ${i}` },
                    { color: 'success', text: `Success Icon Text ${i}` },
                    { color: 'warning', text: `Warning Icon Text ${i}` },
                    { color: 'failure', text: `Failure Icon Text ${i}` },
                    { color: 'info', text: `Info Icon Text ${i}` }
                ];
                list = list.concat(array);
            }

            this.textChipList$ = of(list);
        });
    }



    listenInputFocusChange(element: HTMLElement, label: HTMLElement): void {
        this._render.addClass(element, 'active');
        this._render.addClass(label, 'active');
    }

    listenInputBlurChange(element: HTMLElement, label: HTMLElement): void {
        this._render.removeClass(element, 'active');
        this._render.removeClass(label, 'active');
    }

}
