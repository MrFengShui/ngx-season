import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { MediaCommentModel } from "src/app/models/view/media.model";

@Component({
    selector: 'app-widgets-media-comment',
    templateUrl: './comment.component.html'
})
export class WidgetsMediaCommentComponent implements OnInit {

    @Input('model') model: MediaCommentModel | undefined;

    @HostBinding('class') class: string = 'comment';

    list: number[] = new Array(3);
    group!: FormGroup;

    count: number = 480;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.group = this.fb.group({
            commentInput: new FormControl('', [Validators.minLength(6), Validators.maxLength(this.count)])
        });
    }

    getErrorMessage(control: AbstractControl): string {
        if (control.getError('minlength')) {
            return 'Error: Password must be composed by 6 or more charactors.';
        } else if (control.getError('maxlength')) {
            return `Error: Password must be composed by ${this.count} or less charactors.`;
        } else {
            return '';
        }
    }

}