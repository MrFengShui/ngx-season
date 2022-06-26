import { Component } from '@angular/core';

interface RouterListLink {

    icon: string;
    link: string[];
    text: string;

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

    readonly ROUTER_LIST_LINKS: RouterListLink[] = [
        {icon: 'help', link: ['button'], text: 'Button'},
        {icon: 'help', link: ['icon'], text: 'Icon'},
        {icon: 'help', link: ['queue'], text: 'Queue'},
        {icon: 'help', link: ['sidenav'], text: 'Sidenav'},
        {icon: 'help', link: ['toolbar'], text: 'Toolbar'}
    ];

    state: boolean = false;

}
