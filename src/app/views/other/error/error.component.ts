import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { OTHER_ERROR } from "src/app/data/other.error.data";


@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['../other.component.scss']
})
export class ErrorComponent implements OnInit {

    error!: any;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => this.error = OTHER_ERROR[params.code]);
    }

}