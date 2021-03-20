import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, map } from "rxjs/operators";

import { VideoPlayerComponent } from "src/app/widgets/vplayer/vplayer.component";

@Component({
    selector: 'app-home-video',
    templateUrl: './video.component.html',
    styleUrls: ['../home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoComponent implements OnInit, AfterViewInit {

    @ViewChild('layout', { read: ElementRef, static: true })
    layout!: ElementRef<HTMLDivElement>;

    @ViewChild('overlay', { read: ElementRef, static: true })
    overlay!: ElementRef<HTMLDivElement>;

    fitSize!: number;
    opened!: boolean;
    append!: boolean;
    overlayed!: boolean;

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
        let element: HTMLElement = this.layout.nativeElement.parentElement?.parentElement || this.layout.nativeElement;
        element.onscroll = (event: Event) => this.overlayed = element.scrollTop >= this.fitSize;
    }

}