import { AfterViewInit, Component, ElementRef, HostBinding, Inject, ViewChild } from "@angular/core";
import { Subject } from "rxjs";

import { OctopusDialog, OCTOPUS_DIALOG_DATA } from "src/app/popup/dialog/dialog.service";

@Component({
    selector: 'app-demo-widget-dialog',
    templateUrl: './dialog.component.html'
})
export class DemoWidgetDialogComponent implements AfterViewInit {

    @ViewChild('header', { read: ElementRef, static: true })
    header: ElementRef<HTMLElement>;

    @ViewChild('footer', { read: ElementRef, static: true })
    footer: ElementRef<HTMLElement>;

    @HostBinding('class') class: string = 'demo-widget-dialog';

    size$: Subject<string> = new Subject();

    constructor(
        @Inject(OCTOPUS_DIALOG_DATA) private _data: string,
        private _dialog: OctopusDialog
    ) { }

    ngAfterViewInit() {
        setTimeout(() => {
            let header: number = this.header.nativeElement.children[0].clientHeight;
            let footer: number = this.footer.nativeElement.children[0].clientHeight;
            this.size$.next(`calc(100% - ${header}px - ${footer}px)`);
        });
    }

    handleCloseActionEvent(flag: string): void {
        this._dialog.close(`From DemoWidgetDialogComponent ${flag}`);
    }

}