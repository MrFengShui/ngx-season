import { Component } from '@angular/core';
import {Observable, of} from "rxjs";

interface RouterListLink {

    icon: string;
    link: string[];
    text?: string;

}

const ROUTER_MORE_LINKS: RouterListLink[] = [
    {icon: 'help', link: ['accordion'], text: 'Accordion'},
    {icon: 'help', link: ['badge'], text: 'Badge'},
    {icon: 'help', link: ['button'], text: 'Button'},
    {icon: 'help', link: ['carousel'], text: 'Carousel'},
    {icon: 'help', link: ['effects'], text: 'Effects'},
    {icon: 'help', link: ['express'], text: 'Express'},
    {icon: 'help', link: ['holder'], text: 'Holder'},
    {icon: 'help', link: ['icon'], text: 'Icon'},
    {icon: 'help', link: ['label'], text: 'Label'},
    {icon: 'help', link: ['queue'], text: 'Queue'},
    {icon: 'help', link: ['sidenav'], text: 'Sidenav'},
    {icon: 'help', link: ['split-line'], text: 'Split-Line'},
    {icon: 'help', link: ['status'], text: 'Status'},
    {icon: 'help', link: ['tabs'], text: 'Tabs'},
    {icon: 'help', link: ['toolbar'], text: 'Toolbar'}
];

const ROUTER_LESS_LINKS: RouterListLink[] = [
    {icon: 'help', link: ['components']},
    {icon: 'help', link: ['charts']},
    {icon: 'help', link: ['effects']},
    {icon: 'help', link: ['overlay']},
    {icon: 'help', link: ['tools']}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

    state: boolean = false;

    matchLinks(state: boolean): Observable<RouterListLink[]> {
        return state ? of(ROUTER_MORE_LINKS) : of(ROUTER_LESS_LINKS);
    }

}
