import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatSliderChange } from "@angular/material/slider";
import { interval, Subscription } from "rxjs";

@Component({
    selector: 'app-widgets-aplayer',
    templateUrl: './aplayer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudioPlayerComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {

    @Input('source') source!: string;
    @Input('append') append!: boolean;
    @Input() size!: number;
    @Input() opened!: boolean;

    @Output() sizeChange: EventEmitter<number> = new EventEmitter();
    @Output() openedChange: EventEmitter<boolean> = new EventEmitter();

    @ViewChild('container', { read: ElementRef, static: true })
    container!: ElementRef<HTMLDivElement>;

    @ViewChild('player', { read: ElementRef, static: true })
    player!: ElementRef<HTMLAudioElement>;

    @HostBinding('class') class!: string;

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

    ngOnInit() {
        this.class = 'audio-player';

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

    handleListOpenEvent(event: MouseEvent): void {
        this.handleStopPropagationEvent(event);
        this.opened = !this.opened;
        this.openedChange.emit(this.opened);
    }

}
