import { Component } from "@angular/core";

@Component({
    selector: 'app-demo-paginator-view',
    templateUrl: './paginator.component.html'
})
export class DemoPaginatorView {

    options: number[] = [20, 25, 50, 100];
    size: number = 100;
    length: number = 1000;

}