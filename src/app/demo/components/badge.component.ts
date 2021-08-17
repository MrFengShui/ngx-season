import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";

export class ButtonEntity {

    color: string;
    text: string;
    position: string;
    hidden: boolean;
    badge: string;

}

@Component({
    selector: 'app-demo-badge-view',
    styleUrls: ['../demo.module.scss'],
    templateUrl: './badge.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoBadgeViewComponent implements OnInit, AfterViewInit {

    buttonList$: Observable<ButtonEntity[]>;

    constructor(private _cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.buttonList$ = of([]);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            let list: ButtonEntity[] = Array.from([
                { color: 'primary', text: 'Top Right Badge', position: 'top right', hidden: false, badge: '999+' },
                { color: 'secondary', text: 'Top Center Badge', position: 'top center', hidden: false, badge: '999+' },
                { color: 'primary', text: 'Top Left Badge', position: 'top left', hidden: false, badge: '999+' },
                { color: 'secondary', text: 'Bottom Right Badge', position: 'bottom right', hidden: false, badge: '999+' },
                { color: 'primary', text: 'Bottom Center Badge', position: 'bottom center', hidden: false, badge: '999+' },
                { color: 'secondary', text: 'Bottom Left Badge', position: 'bottom left', hidden: false, badge: '999+' },
            ]);
            this.buttonList$ = of(list);
            this._cdr.detectChanges();
        });
        // setTimeout(() => {
        //     this.buttonList$.toPromise().then(list => {
        //         let positions: string[] = ['top right', 'top center', 'top left', 'bottom right', 'bottom center', 'bottom left'];
        //         interval(1000).subscribe(value => {
        //             let index: number = value % list.length;
        //             let random: number = Math.floor(Math.random() * 6);
        //             list[index].position = positions[random];
        //             list[index].badge = `${index}${random}+`;
        //             this._cdr.detectChanges();
        //         });
        //     });
        // });
    }

}