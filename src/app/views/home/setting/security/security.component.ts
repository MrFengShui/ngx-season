import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-home-setting-security',
    templateUrl: './security.component.html'
})
export class SettingSecurityComponent implements OnInit {

    oldVisible!: boolean;
    newVisible!: boolean;
    safeVisible!: boolean;

    ngOnInit() {
        this.oldVisible = false;
        this.newVisible = false;
        this.safeVisible = false;
    }

}