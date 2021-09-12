import { Component } from "@angular/core";

@Component({
    selector: 'app-demo-select-view',
    templateUrl: './select.component.html'
})
export class DemoSelectView {

    flag: boolean = false;
    select: string = 'instagram';

}