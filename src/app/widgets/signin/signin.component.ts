import { AfterViewInit, Component, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: 'app-widgets-signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit, AfterViewInit {

    visible!: boolean;
    remember!: boolean;

    constructor(
        private registry: MatIconRegistry,
        private sanitizer: DomSanitizer
    ) {
        this.registry.addSvgIcon('google_logo', this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/images/google.svg'));
        this.registry.addSvgIcon('facebook_logo', this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/images/facebook.svg'));
        this.registry.addSvgIcon('twitter_logo', this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/images/twitter.svg'));
    }

    ngOnInit() {
        this.visible = false;
        this.remember = false;
    }

    ngAfterViewInit() {

    }

}