import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges } from "@angular/core";
import { interval, Subject } from "rxjs";
import { map } from 'rxjs/operators';

import { ColorPalette } from "src/app/global/enum.utils";

import { OctopusPopup } from "../popup.service";
import { OctopusAlertToastData, OctopusNoticeToastData } from "./toast.service";

@Component({
    selector: '',
    template: ''
})
abstract class AbstractOctopusToast implements OnChanges, OnInit {

    @Input('color') color: ColorPalette = 'success';
    @Input('noClose') noClose: boolean | string = false;

    @Output('dismiss') dismiss: EventEmitter<void> = new EventEmitter();

    @HostBinding('class') class: string = 'octopus-toast';

    ngOnChanges(changes: SimpleChanges) {
        if (changes.color !== undefined) {
            setTimeout(() => this.renderColor(changes.color.previousValue, changes.color.currentValue), 100);
        }
    }

    ngOnInit() {
        setTimeout(() => this.renderColor(undefined, this.color), 100);
    }

    abstract renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void;

    handleDismissActionEvent(): void {
        this.dismiss.emit();
    }

    matchIcon(color: ColorPalette): string | undefined {
        switch (color) {
            case 'success': return 'verified';
            case 'warning': return 'warning';
            case 'failure': return 'report';
            case 'info': return 'info';
            default: return undefined;
        }
    }

    formatBoolean(flag: boolean | string): boolean {
        return coerceBooleanProperty(flag);
    }

}

@Component({
    selector: 'octopus-alert-toast',
    template: `
        <div class="octopus-alert-toast-wrapper">
            <octopus-icon [class.d-none]="matchIcon(color) === undefined">{{matchIcon(color)}}</octopus-icon>
            <span class="flex-fill text-truncate">{{content}}</span>
            <button octopus-icon-button [color]="color" [class.d-none]="formatBoolean(noClose)" (click)="handleDismissActionEvent()">
                <octopus-icon>close</octopus-icon>
            </button>
        </div>
    `
})
export class OctopusAlertToast extends AbstractOctopusToast {

    @Input('content') content: string = '';

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2,
        private _popup: OctopusPopup
    ) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        setTimeout(() => this._render.addClass(this._ref.nativeElement, 'octopus-alert-toast'));
    }

    renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-success-alert-toast' : `octopus-${prevColor}-alert-toast`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-alert-toast`);
    }

}

@Component({
    selector: 'octopus-notice-toast',
    template: `
        <div class="octopus-notice-toast-wrapper">
            <div class="octopus-toast-head">
                <octopus-icon [class.d-none]="matchIcon(color) === undefined">{{matchIcon(color)}}</octopus-icon>
                <span class="octopus-toast-subject flex-fill">{{subject}}</span>
                <button octopus-icon-button [color]="color" [class.d-none]="formatBoolean(noClose)" (click)="handleDismissActionEvent()">
                    <octopus-icon>close</octopus-icon>
                </button>
            </div>
            <hr>
            <div class="octopus-toast-body octopus-toast-description">{{description}}</div>
        </div>
    `
})
export class OctopusNoticeToast extends AbstractOctopusToast {

    @Input('subject') subject: string = '';
    @Input('description') description: string = '';

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2,
        private _popup: OctopusPopup
    ) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        setTimeout(() => this._render.addClass(this._ref.nativeElement, 'octopus-notice-toast'));
    }

    renderColor(prevColor: ColorPalette | undefined, currColor: ColorPalette): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-success-notice-toast' : `octopus-${prevColor}-notice-toast`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-notice-toast`);
    }

}

@Component({
    selector: 'octopus-alert-toast-queue',
    template: `
        <div class="octopus-alert-toast-queue-wrapper">
            <octopus-alert-toast 
                [color]="item.color" 
                [noClose]="item.noClose" 
                [content]="item.content" 
                (dismiss)="pop(i)" 
                *ngFor="let item of list; index as i"></octopus-alert-toast>
        </div>
    `
})
export class OctopusAlertToastQueue implements OnInit, OnDestroy, AfterViewInit {

    @HostBinding('class') class: string = 'octopus-alert-toast-queue';

    list$: Subject<boolean> = new Subject();
    list: OctopusAlertToastData[] = [];

    private _duration: number = 0;

    get duration(): number { return this._duration; }

    set duration(duration: number) { this._duration = duration; }

    ngOnInit() {
        this.list$.next(false);
    }

    ngAfterViewInit() {
        this.list$.asObservable().subscribe(value => {
            if (!value) {
                let thread = setTimeout(() => {
                    clearTimeout(thread);
                    this.pop();
                }, this._duration * this.list.length);
            }
        });
    }

    ngOnDestroy() {
        this.list$.complete();
    }

    push(data: OctopusAlertToastData): void {
        if (this.list.length >= 4) {
            this.pop();
        }

        this.list = [...this.list, data];
        this.list$.next(this.list.length === 0);
    }

    pop(index: number = 0): void {
        if (this.list.length > 0) {
            this.list.splice(index, 1);
        }

        this.list$.next(this.list.length === 0);
    }

}

@Component({
    selector: 'octopus-notice-toast-queue',
    template: `
        <div class="octopus-notice-toast-queue-wrapper">
            <octopus-notice-toast 
                [color]="item.color" 
                [noClose]="item.noClose" 
                [subject]="item.subject" 
                [description]="item.description"
                (dismiss)="pop(i)" 
                *ngFor="let item of list; index as i"></octopus-notice-toast>
        </div>
    `
})
export class OctopusNoticeToastQueue implements OnInit, OnDestroy, AfterViewInit {

    @HostBinding('class') class: string = 'octopus-notice-toast-queue';

    list$: Subject<boolean> = new Subject();
    list: OctopusNoticeToastData[] = [];

    private _duration: number = 0;

    get duration(): number { return this._duration; }

    set duration(duration: number) { this._duration = duration; }

    ngOnInit() {
        this.list$.next(false);
    }

    ngAfterViewInit() {
        this.list$.asObservable().subscribe(value => {
            if (!value) {
                let thread = setTimeout(() => {
                    clearTimeout(thread);
                    this.pop();
                }, this._duration * this.list.length);
            }
        });
    }

    ngOnDestroy() {
        this.list$.complete();
    }

    push(data: OctopusNoticeToastData): void {
        if (this.list.length >= 8) {
            this.pop();
        }

        this.list = [...this.list, data];
        this.list$.next(this.list.length === 0);
    }

    pop(index: number = 0): void {
        if (this.list.length > 0) {
            this.list.splice(index, 1);
        }

        this.list$.next(this.list.length === 0);
    }

}