import { Component } from '@angular/core';
import {Observable, of} from "rxjs";
import {Params} from "@angular/router";

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
    {icon: 'help', link: ['..', 'carousel'], text: 'Carousel'},
    {icon: 'help', link: ['..', 'dialog'], text: 'Dialog'},
    {icon: 'help', link: ['..', 'drawer'], text: 'Drawer'},
    {icon: 'help', link: ['..', 'express'], text: 'Express'},
    {icon: 'help', link: ['..', 'holder'], text: 'Holder'},
    {icon: 'help', link: ['..', 'icon'], text: 'Icon'},
    {icon: 'help', link: ['..', 'label'], text: 'Label'},
    {icon: 'help', link: ['..', 'overflow'], text: 'Overflow'},
    {icon: 'help', link: ['..', 'paginator'], text: 'Paginator'},
    {icon: 'help', link: ['..', 'queue'], text: 'Queue'},
    {icon: 'help', link: ['..', 'ripple'], text: 'Ripple'},
    {icon: 'help', link: ['..', 'shadow'], text: 'Shadow'},
    {icon: 'help', link: ['..', 'sidenav'], text: 'Sidenav'},
    {icon: 'help', link: ['..', 'split-line'], text: 'Split Line'},
    {icon: 'help', link: ['..', 'status'], text: 'Status'},
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
export class AppComponent {

    private readonly ROUTER_MORE_LINKS: RouterListLink[] = FULL_LINKS;
    private readonly ROUTER_LESS_LINKS: RouterListLink[] = LESS_LINKS;

    state: boolean = false;

    matchLinks(state: boolean): Observable<RouterListLink[]> {
        return state ? of(this.ROUTER_MORE_LINKS) : of(this.ROUTER_LESS_LINKS);
    }

}
