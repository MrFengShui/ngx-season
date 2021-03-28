import { Component, HostBinding, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-home-ahome',
    templateUrl: './ahome.component.html'
})
export class AudioHomeComponent implements OnInit {

    @HostBinding('class') class: string = 'audio';

    sections!: number[];
    units!: number[];

    ngOnInit() {
        this.sections = new Array(5);
        this.units = new Array(10);
    }

}