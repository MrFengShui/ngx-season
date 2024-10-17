import {AfterViewInit, Component, ElementRef, Inject, Renderer2} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'ngx-sui-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {

    constructor(
        @Inject(DOCUMENT)
        private _document: Document,
        private _element: ElementRef,
        private _renderer: Renderer2
    ) { }

    ngAfterViewInit() {
        const body: HTMLElement = this._document.body;
        this._renderer.setAttribute(body, 'data-theme', 'light');
        this._renderer.setAttribute(body, 'data-color', 'default');

        this.initialize();
    }

    private initialize(): void {
        this._renderer.setStyle(this._element.nativeElement, 'overflow', 'auto');
        this._renderer.setStyle(this._element.nativeElement, 'width', '100vw');
        this._renderer.setStyle(this._element.nativeElement, 'height', '100vh');
    }

}
