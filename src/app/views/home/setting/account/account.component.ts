import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { WidgetsAlertComponent } from "src/app/widgets/alert/alert.component";

@Component({
    selector: 'app-home-setting-account',
    templateUrl: './account.component.html'
})
export class SettingAccountComponent implements OnInit {

    @ViewChild('chooser', { read: ElementRef, static: true }) chooser!: ElementRef<HTMLInputElement>;

    locked!: boolean;
    avatarPath!: string;
    avatarName!: string;
    avatarSize!: number;
    avatarType!: string;
    avatarModify!: Date;
    avatarSource!: string | ArrayBuffer | null | undefined;

    constructor(private snack: MatSnackBar) { }

    ngOnInit() {
        this.locked = false;
    }

    listenAvatarUploadChange(): void {
        let files: FileList | null = this.chooser.nativeElement.files || null;

        if (files !== null) {
            let file: File = files[0];
            let image = new Image();
            image.src = window.URL.createObjectURL(file);
            image.onload = () => {
                if (image.width === image.height && image.width >= 64 && image.width <= 256) {
                    this.avatarPath = window.URL.createObjectURL(file);
                    this.avatarName = file.name;
                    this.avatarSize = file.size;
                    this.avatarType = file.type;
                    this.avatarModify = new Date(file.lastModified);

                    let reader: FileReader = new FileReader();
                    reader.onload = (data) => this.avatarSource = data.target?.result;
                    reader.readAsDataURL(file);
                } else {
                    this.snack.openFromComponent(WidgetsAlertComponent, {
                        duration: 5000,
                        data: {
                            status: 'warning',
                            message: 'The width and height of image your uploaded must be exactly equal and have a range of 64px to 256px.'
                        },
                        panelClass: ['popup-alert']
                    });
                }
            }
        }
    }

}