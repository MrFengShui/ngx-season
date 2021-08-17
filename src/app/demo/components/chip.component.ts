import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { interval, Observable, of } from "rxjs";

export class ChipEntity {

    color: string;
    text: string;

}

@Component({
    selector: 'app-demo-chip-view',
    styleUrls: ['../demo.module.scss'],
    templateUrl: './chip.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoChipViewComponent implements OnInit, AfterViewInit {

    chipList$: Observable<ChipEntity[]>;

    constructor(private _cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.chipList$ = of([]);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            let list: ChipEntity[] = [];

            for (let i = 0; i < 4; i++) {
                list = list.concat(this.build(i));
            }

            this.chipList$ = of(list);
            this._cdr.detectChanges();
        });
    }

    handleTextChipRemoveActionEvent(index: number): void {
        this.chipList$.toPromise().then(value => value.splice(index, 1));
    }

    private build(index: number): ChipEntity[] {
        const scale: number = Math.PI * Math.E * 100;
        return Array.from([
            { color: 'primary', text: `Primary Chip-${Math.floor(Math.random() * scale * (index + 1) + 1)} Text` },
            { color: 'secondary', text: `Secondary Chip-${Math.floor(Math.random() * scale * (index + 1) + 1)} Text` },
            { color: 'success', text: `Success Chip-${Math.floor(Math.random() * scale * (index + 1) + 1)} Text` },
            { color: 'warning', text: `Warning Chip-${Math.floor(Math.random() * scale * (index + 1) + 1)} Text` },
            { color: 'failure', text: `Failure Chip-${Math.floor(Math.random() * scale * (index + 1) + 1)} Text` },
            { color: 'info', text: `Info Chip-${Math.floor(Math.random() * scale * (index + 1) + 1)} Text` },
        ]);
    }

}