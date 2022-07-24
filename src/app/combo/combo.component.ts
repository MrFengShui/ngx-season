import {
    AfterContentInit,
    AfterViewInit,
    Component, ContentChildren, Directive, ElementRef, EventEmitter, forwardRef,
    HostBinding,
    HostListener,
    Inject,
    Input,
    NgZone, Output, QueryList, Renderer2,
    TemplateRef,
    ViewChild
} from "@angular/core";
import {Dialog, DIALOG_DATA, DialogConfig, DialogRef} from "@angular/cdk/dialog";
import {Overlay} from "@angular/cdk/overlay";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

import {OCTOPUS_COLOR_PALETTES, OctopusColorPalette} from "../global/enums.utils";
import {animate, AnimationBuilder, AnimationPlayer, style} from "@angular/animations";
import {coerceNumberProperty} from "@angular/cdk/coercion";
import {OctopusFormField} from "../form/form.component";

@Component({
    selector: 'octo-combo-panel-header',
    template: `<ng-content></ng-content>`
})
export class OctopusComboPanelHeader {

    @HostBinding('class') class: string = 'octo-combo-panel-header';

}

@Component({
    selector: 'octo-combo-panel-footer',
    template: `<ng-content></ng-content>`
})
export class OctopusComboPanelFooter {

    @HostBinding('class') class: string = 'octo-combo-panel-footer';

}

@Directive({
    selector: 'octo-icon[octo-combo-favicon], img[octo-combo-favicon]'
})
export class OctopusComboFavicon {

    @HostBinding('class') class: string = 'octo-combo-favicon';

}

@Directive({
    selector: '[octo-combo-label]'
})
export class OctopusComboLabel {

    @HostBinding('class') class: string = 'octo-combo-label';

}

@Component({
    selector: 'octo-combo-item',
    template: `
        <div class="d-none" #outer>
            <ng-content select="octo-icon[octo-combo-favicon], img[octo-combo-favicon], [octo-combo-label]"></ng-content>
        </div>
        <ng-content></ng-content>
    `
})
export class OctopusComboItem {

    @Input('octoValue') value: any;

    @ViewChild('outer') outer!: ElementRef;

    @HostBinding('class') class: string = 'octo-combo-item';

    @HostListener('click')
    protected click(): void {
        this._combo.createAnimate(false, () => this._combo.dialogRef.close(this.value));
    }

    constructor(
        public _element: ElementRef,
        protected _render: Renderer2,
        @Inject(forwardRef(() => OctopusComboBox))
        private _combo: OctopusComboBox
    ) {
    }

    activate(active: boolean): void {
        if (active) {
            this._render.addClass(this._element.nativeElement, 'active');
        } else {
            this._render.removeClass(this._element.nativeElement, 'active');
        }
    }

}

@Component({
    selector: 'octo-combo-box',
    template: `
        <div class="octo-combo-item octo-combo-text" [innerHTML]="html"></div>
        <octo-icon octoSize="2rem" class="ml-100">expand_circle_down</octo-icon>
        <ng-template #template>
            <div class="octo-combo-panel octo-combo-panel-{{color}}" octo-overflow [octoColor]="color" octoScrollXY="y">
                <ng-content select="octo-combo-panel-header"></ng-content>
                <div class="octo-combo-panel-content"><ng-content select="octo-combo-item"></ng-content></div>
                <ng-content select="octo-combo-panel-footer"></ng-content>
            </div>
        </ng-template>
    `
})
export class OctopusComboBox implements AfterContentInit, AfterViewInit {

    @Input('octoColor') color: OctopusColorPalette = 'primary';
    @Input('octoSelect') select: any;

    @Input('octoDuration')
    get duration() { return this._duration; }
    set duration(_duration: any) { this._duration = coerceNumberProperty(_duration); }
    private _duration: number = 100;

    @Output('octoSelectChange') change: EventEmitter<any> = new EventEmitter<any>();

    @ContentChildren(OctopusComboItem) items!: QueryList<OctopusComboItem>;

    @ViewChild('template', {read: TemplateRef})
    private template!: TemplateRef<any>;

    @HostBinding('class') class: string = 'octo-combo-box';

    @HostListener('click')
    protected click(): void {
        this.items.forEach(item =>
            item.activate(JSON.stringify(item.value) === JSON.stringify(this.select)));

        this.config = {...this.config, data: {select: null, template: this.template}};
        this.dialogRef = this._dialog.open(this.template, this.config);
        this.createAnimate(true, () => {
            let subscription = this.dialogRef.closed.subscribe(value => {
                let item: OctopusComboItem | undefined = this.items.find(item =>
                    JSON.stringify(item.value) === JSON.stringify(value));

                if (item) {
                    this.select = item.value;
                    this.change.emit(this.select);
                    this.html = this._sanitizer.bypassSecurityTrustHtml(item.outer.nativeElement.innerHTML);
                }

                subscription.unsubscribe();
            });
        });
    }

    dialogRef!: DialogRef<any, any>;
    html!: SafeHtml;

    private config: DialogConfig<any, DialogRef<any, any>> = {
        disableClose: true, hasBackdrop: true, width: 'auto', height: '100vh',
        positionStrategy: this._overlay.position().global().top('0').bottom('0').right('0')
    };

    constructor(
        private _builder: AnimationBuilder,
        private _sanitizer: DomSanitizer,
        private _zone: NgZone,
        private _dialog: Dialog,
        private _overlay: Overlay,
        @Inject(forwardRef(() => OctopusFormField))
        private _field: OctopusFormField
    ) {
    }

    ngAfterContentInit() {
        if (this.items) {
            this.items.forEach(item => {
                if (JSON.stringify(item.value) === JSON.stringify(this.select)) {
                    let task = setTimeout(() => {
                        clearTimeout(task);
                        this.html = this._sanitizer.bypassSecurityTrustHtml(item.outer.nativeElement.innerHTML)
                    });
                    return;
                }
            });
        }
    }

    ngAfterViewInit() {
        this._field.focused = true;
        this._field.labels.first.focus(this._field.focused);
    }

    createAnimate(flag: boolean, callback: () => void): void {
        let player: AnimationPlayer | null = this._builder.build([
            style({transform: `translateX(${flag ? '100%' : '0%'})`}),
            animate(`${this.duration}ms linear`, style({transform: `translateX(${flag ? '0%' : '100%'})`}))
        ]).create(this.dialogRef.overlayRef.overlayElement);
        player.onDone(() => {
            player = null;
            callback();
        });
        player.play();
    }

}
