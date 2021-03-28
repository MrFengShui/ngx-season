import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

    group!: FormGroup;
    visible!: boolean;

    constructor(
        private registry: MatIconRegistry,
        private sanitizer: DomSanitizer,
        private builder: FormBuilder
    ) {
        this.registry.addSvgIcon('google_logo', this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/images/google.svg'));
        this.registry.addSvgIcon('facebook_logo', this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/images/facebook.svg'));
        this.registry.addSvgIcon('twitter_logo', this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/images/twitter.svg'));
    }

    ngOnInit() {
        this.group = this.builder.group({}, {});
        this.visible = false;
    }

}