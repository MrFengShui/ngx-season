import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, map } from "rxjs/operators";

@Component({
    selector: 'app-home-audio',
    templateUrl: './audio.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudioComponent implements OnInit, AfterViewInit {

    @ViewChild('layout', { read: ElementRef, static: true })
    layout!: ElementRef<HTMLDivElement>;

    @ViewChild('overlay', { read: ElementRef, static: true })
    overlay!: ElementRef<HTMLDivElement>;

    fitSize!: number;
    opened!: boolean;
    append!: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.router.events.pipe(
            filter(value => value instanceof NavigationEnd),
            map(value => this.route)
        ).subscribe(event => {
            switch (event.snapshot.params.action) {
                case 'unit': this.append = false; break;
                case 'list': this.append = true; break;
                default: this.router.navigate(['other', 'error', '404']); break;
            }
        });
    }

    ngOnInit() {
        this.fitSize = 0;
        this.opened = true;
    }

    ngAfterViewInit(): void {

    }

}