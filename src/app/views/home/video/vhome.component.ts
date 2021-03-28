import { Component, HostBinding, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-home-vhome',
    templateUrl: './vhome.component.html'
})
export class VideoHomeComponent implements OnInit {

    @HostBinding('class') class: string = 'video';

    sections!: number[];
    units!: number[];

    ngOnInit() {
        this.sections = new Array(5);
        this.units = new Array(10);
    }

}