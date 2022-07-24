import {AfterViewInit, Component, Inject, Renderer2} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Params} from "@angular/router";
import {Observable, of} from "rxjs";
import {HighlightLoader} from "ngx-highlightjs";

export interface RouterListLink {

    icon: string;
    link: string[];
    text?: string;
    params?: Params;

}

export const FULL_LINKS: RouterListLink[] = [
    {icon: 'help', link: ['..', 'accordion'], text: 'Accordion'},
    {icon: 'help', link: ['..', 'badge'], text: 'Badge'},
    {icon: 'help', link: ['..', 'button'], text: 'Button'},
    {icon: 'help', link: ['..', 'card'], text: 'Card'},
    {icon: 'help', link: ['..', 'carousel'], text: 'Carousel'},
    {icon: 'help', link: ['..', 'check'], text: 'Check'},
    {icon: 'help', link: ['..', 'combo'], text: 'ComboBox'},
    {icon: 'help', link: ['..', 'datetime'], text: 'Datetime'},
    {icon: 'help', link: ['..', 'dialog'], text: 'Dialog'},
    {icon: 'help', link: ['..', 'drawer'], text: 'Drawer'},
    {icon: 'help', link: ['..', 'express'], text: 'Express'},
    {icon: 'help', link: ['..', 'figure'], text: 'Figure'},
    {icon: 'help', link: ['..', 'holder'], text: 'Holder'},
    {icon: 'help', link: ['..', 'icon'], text: 'Icon'},
    {icon: 'help', link: ['..', 'input'], text: 'Input'},
    {icon: 'help', link: ['..', 'label'], text: 'Label'},
    {icon: 'help', link: ['..', 'overflow'], text: 'Overflow'},
    {icon: 'help', link: ['..', 'paginator'], text: 'Paginator'},
    {icon: 'help', link: ['..', 'queue'], text: 'Queue'},
    {icon: 'help', link: ['..', 'radio'], text: 'Radio'},
    {icon: 'help', link: ['..', 'ripple'], text: 'Ripple'},
    {icon: 'help', link: ['..', 'shadow'], text: 'Shadow'},
    {icon: 'help', link: ['..', 'sidenav'], text: 'Sidenav'},
    {icon: 'help', link: ['..', 'split-line'], text: 'Split Line'},
    {icon: 'help', link: ['..', 'status'], text: 'Status'},
    {icon: 'help', link: ['..', 'stepper'], text: 'Stepper'},
    {icon: 'help', link: ['..', 'table'], text: 'Table'},
    {icon: 'help', link: ['..', 'tabs'], text: 'Tabs'},
    {icon: 'help', link: ['..', 'toast'], text: 'Toast'},
    {icon: 'help', link: ['..', 'toolbar'], text: 'Toolbar'},
    {icon: 'help', link: ['..', 'tooltip'], text: 'Tooltip'},
    {icon: 'help', link: ['..', 'tree'], text: 'Tree'}
];

export const LESS_LINKS: RouterListLink[] = [
    {icon: 'help', link: ['general'], params: {'category': 'components'}},
    {icon: 'help', link: ['general'], params: {'category': 'charts'}},
    {icon: 'help', link: ['general'], params: {'category': 'effects'}},
    {icon: 'help', link: ['general'], params: {'category': 'overlay'}},
    {icon: 'help', link: ['general'], params: {'category': 'tools'}}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {

    private readonly ROUTER_MORE_LINKS: RouterListLink[] = FULL_LINKS;
    private readonly ROUTER_LESS_LINKS: RouterListLink[] = LESS_LINKS;
    private readonly MODE_LIST: string[] = ['dark', 'light'];

    mode: boolean = true;
    state: boolean = false;

    constructor(
        @Inject(DOCUMENT)
        private _document: Document,
        private _render: Renderer2,
        private _loader: HighlightLoader
    ) {
    }

    ngAfterViewInit() {
        this.changeGlobalMode(this.mode);
        this.changeCodeSnippetMode(this.mode);
    }

    matchLinks(state: boolean): Observable<RouterListLink[]> {
        return state ? of(this.ROUTER_MORE_LINKS) : of(this.ROUTER_LESS_LINKS);
    }

    changeGlobalMode(mode: boolean): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            this.MODE_LIST.forEach(item =>
                this._render.removeClass(this._document.documentElement, `theme-${item}-default`));
            this._render.addClass(this._document.documentElement, `theme-${mode ? 'dark' : 'light'}-default`);
        });
    }

    changeCodeSnippetMode(mode: boolean): void {
        this._loader.setTheme(`assets/highlight/atom-one-${mode ? 'dark' : 'light'}.css`);
    }

}
