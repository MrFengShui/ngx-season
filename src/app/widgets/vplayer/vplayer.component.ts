import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { MatSliderChange } from "@angular/material/slider";

import { ROTATE_180 } from "src/app/animations/rotate.animation";

import { VideoPlayerStreamService } from "src/app/services/player.service";

import { detectMouseState } from "src/app/utils/cursor.utils";

@Component({
    selector: 'app-widgets-vplayer',
    templateUrl: './vplayer.component.html',
    animations: [ROTATE_180],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoPlayerComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input('poster') poster!: string;
    @Input('source') source!: string;
    @Input('overlap') overlap: boolean = false;

    @Output('current') currentTimeChange: EventEmitter<number> = new EventEmitter();

    @ViewChild('container', { read: ElementRef, static: true })
    container!: ElementRef<HTMLDivElement>;

    @ViewChild('player', { read: ElementRef, static: true })
    player!: ElementRef<HTMLVideoElement>;

    @HostBinding('class') class: string = 'video-player';

    buffer!: number;
    isFullscreen: boolean = false;
    isOpened: boolean = false;
    isHidden: boolean = true;
    isMaximum: boolean = false;

    speedSelected!: number;
    qualitySelected!: number;
    captionSelected!: string;

    speedList!: number[];
    qualityList!: number[];
    captionList!: any[];

    constructor(
        private cdr: ChangeDetectorRef,
        private vpsService: VideoPlayerStreamService
    ) { }

    ngOnInit() {
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
        // this.vpsService.open('tests/media/test_video.mp4', this.player.nativeElement);
        detectMouseState(document.body, 3000, (flag: boolean) => {
            if (flag) {
                this.isHidden = false;
            } else {
                this.isHidden = true;
                this.cdr.detectChanges();
                this.cdr.markForCheck();
            }
        });
    }

    ngOnDestroy() {
        // this.vpsService.close();
    }

    @HostListener('document:fullscreenchange', ['$event'])
    @HostListener('document:webkitfullscreenchange', ['$event'])
    @HostListener('document:mozfullscreenchange', ['$event'])
    @HostListener('document:MSFullscreenChange', ['$event'])
    listenFullscreenStateChange(event: Event): void {
        this.isFullscreen = !this.isFullscreen;
    }

    listenLoadedDataChange(event: Event): void {
        let ranges: TimeRanges = this.player.nativeElement.buffered;
        console.log('Loaded Data');
    }

    listenLoadedMetadataChange(event: Event): void {
        let ranges: TimeRanges = this.player.nativeElement.buffered;
        console.log('Loaded Metadata');
    }

    listenLoadStartChange(event: Event): void {
        let ranges: TimeRanges = this.player.nativeElement.buffered;
        this.cdr.detectChanges();
        this.cdr.markForCheck();

    }

    listenProgressChange(event: Event): void {
        let ranges: TimeRanges = this.player.nativeElement.buffered;

        if (ranges.length !== 0) {
            this.buffer = (ranges.end(ranges.length - 1) - ranges.start(0)) * 100.0 / this.player.nativeElement.duration;
        }
    }

    listenCurrentTimeChange(event: Event): void {
        this.currentTimeChange.emit(this.player.nativeElement.currentTime);
    }

    handleVolumeUpEvent(event: MouseEvent): void {
        let volume: number = this.player.nativeElement.volume;
        let predict: number = parseFloat((volume + 0.05).toFixed(2));
        this.player.nativeElement.volume = predict <= 1.0
            ? parseFloat((volume + 0.05).toFixed(2)) : 1.0;
    }

    handleVolumeDownEvent(event: MouseEvent): void {
        let volume: number = this.player.nativeElement.volume;
        let predict: number = parseFloat((volume - 0.05).toFixed(2));
        this.player.nativeElement.volume = predict >= 0.0
            ? parseFloat((volume - 0.05).toFixed(2)) : 0.0;
    }

    handleDragTimeEvent(change: MatSliderChange): void {
        this.player.nativeElement.currentTime = change.value || 0.0;
    }

    handleForwardEvent(event: MouseEvent): void {
        let time: number = this.player.nativeElement.currentTime;
        let predict: number = parseFloat((time + 30.0).toFixed(9));
        this.player.nativeElement.currentTime = predict <= this.player.nativeElement.duration
            ? parseFloat((time + 30.0).toFixed(9)) : this.player.nativeElement.duration;
    }

    handleBackwardEvent(event: MouseEvent): void {
        let time: number = this.player.nativeElement.currentTime;
        let predict: number = parseFloat((time - 30.0).toFixed(9));
        this.player.nativeElement.currentTime = predict >= 0.0
            ? parseFloat((time - 30.0).toFixed(9)) : 0.0;
    }

    handleFullscreenEvent(event: MouseEvent): void {
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
