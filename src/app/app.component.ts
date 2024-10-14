import {AfterViewInit, Component, Inject, Renderer2} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'ngx-sui-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {

    constructor(
        @Inject(DOCUMENT)
        private _document: Document,
        private _render: Renderer2
    ) {
    }

    ngAfterViewInit() {
        
    }

}
