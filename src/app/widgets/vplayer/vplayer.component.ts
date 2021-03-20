import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatSliderChange } from "@angular/material/slider";
import { interval, Subscription } from "rxjs";
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-widgets-vplayer',
    templateUrl: './vplayer.component.html',
    styleUrls: ['../widgets.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoPlayerComponent implements OnChanges, OnInit, OnDestroy, AfterViewInit, AfterViewChecked {

    @Input('source') source!: string;
    @Input('overlay') overlay!: boolean;
    @Input('append') append!: boolean;
    @Input() size!: number;
    @Input() opened!: boolean;

    @Output() sizeChange: EventEmitter<number> = new EventEmitter();
    @Output() openedChange: EventEmitter<boolean> = new EventEmitter();

    @ViewChild('container', { read: ElementRef, static: true })
    container!: ElementRef<HTMLDivElement>;

    @ViewChild('placeholder', { read: ElementRef, static: true })
    placeholder!: ElementRef<HTMLDivElement>;

    @ViewChild('playerBox', { read: ElementRef, static: true })
    playerBox!: ElementRef<HTMLDivElement>;

    @ViewChild('player', { read: ElementRef, static: true })
    player!: ElementRef<HTMLVideoElement>;

    @ViewChild('controller', { read: ElementRef, static: true })
    controller!: ElementRef<HTMLVideoElement>;

    @HostBinding('class') class!: string;

    isFullscreen!: boolean;
    isPaused!: boolean;
    currentTime!: number;

    timer!: Subscription;
    speedSelected!: number;
    qualitySelected!: number;
    captionSelected!: string;

    speedList!: number[];
    qualityList!: number[];
    captionList!: any[];

    width!: number;
    height!: number;

    constructor(
        private cdr: ChangeDetectorRef,
        private render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.overlay !== undefined && !changes.overlay.firstChange) {
            this.overlay = changes.overlay.currentValue;
            this.overlayAction(this.overlay);
        }
    }

    ngOnInit() {
        this.class = 'video-player';

        this.isFullscreen = false;
        this.isPaused = true;
        this.currentTime = 0.0;

        this.speedSelected = 1.0;
        this.speedList = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];
        this.qualitySelected = 1080;
        this.qualityList = [1080, 720, 480, 360, 240, 144];
        this.captionSelected = 'none';
        this.captionList = [
            { code: 'none', text: 'Closed Caption' }
        ];
    }

    ngAfterViewInit() {
        this.width = this.container.nativeElement.clientWidth - 8;
        this.height = this.width * 9 / 16;
    }

    ngAfterViewChecked() {
        let tempSize: number = this.container.nativeElement.clientWidth - 8;

        if (tempSize !== this.width) {
            this.width = tempSize;
            this.height = this.width * 9 / 16;
            this.cdr.detectChanges();
            this.size = this.height;
            this.sizeChange.emit(this.size);
        }

        this.cdr.markForCheck();
    }

    ngOnDestroy() {
        if (this.timer !== undefined) {
            this.timer.unsubscribe();
        }
    }

    @HostListener('mouseenter', ['$event'])
    handleEnterEvent(event: MouseEvent): void {
        event.preventDefault();
        this.render.removeClass(this.controller.nativeElement, 'hidden');
    }

    @HostListener('mouseleave', ['$event'])
    handleLeaveEvent(event: MouseEvent): void {
        event.preventDefault();
        let count: number = 3;

        if (!this.controller.nativeElement.classList.contains('hidden')) {
            this.timer = interval(1000).pipe(take(count)).subscribe(value => {
                if (value === count - 1) {
                    this.render.addClass(this.controller.nativeElement, 'hidden');
                    this.timer.unsubscribe();
                }
            });
        }
    }

    @HostListener('mousemove', ['$event'])
    handleMoveEvent(event: MouseEvent): void {
        this.handleEnterEvent(event);
    }

    @HostListener('click', ['$event'])
    handleClickEvent(event: MouseEvent): void {
        event.preventDefault();
        this.render.addClass(this.controller.nativeElement, 'hidden');
    }

    @HostListener('document:fullscreenchange', ['$event'])
    @HostListener('document:webkitfullscreenchange', ['$event'])
    @HostListener('document:mozfullscreenchange', ['$event'])
    @HostListener('document:MSFullscreenChange', ['$event'])
    listenFullscreenStateChange(event: Event): void {
        this.isFullscreen = !this.isFullscreen;
    }

    listenCurrentTimeChange(event: Event): void {
        this.currentTime = this.player.nativeElement.currentTime;
    }

    handlePlayPauseEvent(event: MouseEvent): void {
        this.handleStopPropagationEvent(event);

        if (this.isPaused) {
            this.player.nativeElement.play();
        } else {
            this.player.nativeElement.pause();
        }

        this.isPaused = !this.isPaused;
    }

    handleUpVolumeEvent(event: MouseEvent): void {
        this.handleStopPropagationEvent(event);
        let volume: number = this.player.nativeElement.volume;
        let predict: number = parseFloat((volume + 0.05).toFixed(2));

        if (predict <= 1.0) {
            volume = parseFloat((volume + 0.05).toFixed(2));
        }

        this.player.nativeElement.volume = volume;
    }

    handleDownVolumeEvent(event: MouseEvent): void {
        this.handleStopPropagationEvent(event);
        let volume: number = this.player.nativeElement.volume;
        let predict: number = parseFloat((volume - 0.05).toFixed(2));

        if (predict >= 0.0) {
            volume = parseFloat((volume - 0.05).toFixed(2));
        }

        this.player.nativeElement.volume = volume;
    }

    handleDragTimeEvent(change: MatSliderChange): void {
        this.currentTime = change.value || this.currentTime;
        this.player.nativeElement.currentTime = this.currentTime;
    }

    handleUpTimeEvent(event: MouseEvent): void {
        this.handleStopPropagationEvent(event);
        let time: number = this.player.nativeElement.currentTime;
        let predict: number = parseFloat((time + 30.0).toFixed(9));

        if (predict <= this.player.nativeElement.duration) {
            time = parseFloat((time + 30.0).toFixed(9));
        }

        this.player.nativeElement.currentTime = time;
    }

    handleDownTimeEvent(event: MouseEvent): void {
        this.handleStopPropagationEvent(event);
        let time: number = this.player.nativeElement.currentTime;
        let predict: number = parseFloat((time - 30.0).toFixed(9));

        if (predict >= 0.0) {
            time = parseFloat((time - 30.0).toFixed(9));
        }

        this.player.nativeElement.currentTime = time;
    }

    handleStopPropagationEvent(event: MouseEvent): void {
        event.stopImmediatePropagation();
        event.stopPropagation();
    }

    handleOverlayEvent(event: MouseEvent): void {
        this.handleStopPropagationEvent(event);
        this.overlay = !this.overlay;
        this.overlayAction(this.overlay);
    }

    private overlayAction(flag: boolean): void {
        if (flag) {
            this.render.addClass(this.playerBox.nativeElement, 'player-overlay');
            this.render.addClass(this.playerBox.nativeElement, 'mat-elevation-z4');
            this.render.removeClass(this.placeholder.nativeElement, 'display-none');
        } else {
            this.render.removeClass(this.playerBox.nativeElement, 'player-overlay');
            this.render.removeClass(this.playerBox.nativeElement, 'mat-elevation-z4');
            this.render.addClass(this.placeholder.nativeElement, 'display-none');
        }
    }

    handleListOpenEvent(event: MouseEvent): void {
        this.handleStopPropagationEvent(event);
        this.opened = !this.opened;
        this.openedChange.emit(this.opened);
    }

    handleFullscreenEvent(event: MouseEvent): void {
        this.handleStopPropagationEvent(event);

        if (this.isFullscreen) {
            this.exitFullscreen();
        } else {
            this.enterFullscreen(this.container.nativeElement);
        }
    }

    private enterFullscreen(element: HTMLElement): void {
        const enterRequest = element as HTMLElement & {
            mozRequestFullScreen(): Promise<void>;
            webkitRequestFullscreen(): Promise<void>;
            msRequestFullscreen(): Promise<void>;
        };

        if (enterRequest.mozRequestFullScreen) {
            enterRequest.mozRequestFullScreen();
        } else if (enterRequest.webkitRequestFullscreen) {
            enterRequest.webkitRequestFullscreen();
        } else if (enterRequest.msRequestFullscreen) {
            enterRequest.msRequestFullscreen();
        } else {
            enterRequest.requestFullscreen();
        }
    }

    private exitFullscreen(): void {
        const exitRequest = document as Document & {
            mozCancelFullScreen(): Promise<void>;
            webkitExitFullscreen(): Promise<void>;
            msExitFullscreen(): Promise<void>;
        };

        if (exitRequest.mozCancelFullScreen) {
            exitRequest.mozCancelFullScreen();
        } else if (exitRequest.webkitExitFullscreen) {
            exitRequest.webkitExitFullscreen();
        } else if (exitRequest.msExitFullscreen) {
            exitRequest.msExitFullscreen();
        } else {
            exitRequest.exitFullscreen();
        }
    }

}
