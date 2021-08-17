import { AfterContentInit, Component, ContentChild, ElementRef, HostBinding, Input, OnInit, Renderer2 } from "@angular/core";
import { Subject } from "rxjs";

import { OcotpusFormInput } from "./input.directive";

@Component({
    selector: 'octopus-form-field',
    templateUrl: './field.component.html'
})
export class OctopusFormField implements OnInit, AfterContentInit {

    @Input('appearance') appearance: string = 'outline';
    @Input('state') validState: string = '';

    @ContentChild(OcotpusFormInput, { read: ElementRef, static: true })
    input: ElementRef<OcotpusFormInput>;

    @HostBinding('class') class: string = 'octopus-form-field';

    state$: Subject<boolean> = new Subject();

    constructor(private _render: Renderer2) { }

    ngOnInit() {
        this.state$.next(false);
    }

    ngAfterContentInit() {
        setTimeout(() => {
            let element: HTMLInputElement = this.input.nativeElement as unknown as HTMLInputElement;
            element.onfocus = () => this.state$.next(true);
            element.onblur = () => this.state$.next(false);
        });
    }

}