import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, HostBinding, HostListener, Input, Output, Renderer2, SimpleChanges } from "@angular/core";
import { CheckboxControlValueAccessor, ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: 'octopus-checkbox',
    templateUrl: './check.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => OctopusCheckbox),
        multi: true
    }]
})
export class OctopusCheckbox extends CheckboxControlValueAccessor {

    @Input('align') align: string = 'left';
    @Input('color') color: string = 'primary';
    @Input('indeterminated') indeterminated: boolean = false;
    @Input('selected') selected: boolean = false;

    @Output('indeterminatedChange') indeterminatedChange: EventEmitter<boolean> = new EventEmitter();
    @Output('selectedChange') selectedChange: EventEmitter<boolean> = new EventEmitter();

    @HostBinding('class') class: string = 'octopus-checkbox';

    @HostListener('click')
    handleClickAction(): void {
        this.selected = !this.selected;
        this._cdr.detectChanges();
        this.selectedChange.emit(this.selected);
        this.onChange(this.selected);
    }

    constructor(
        private _cdr: ChangeDetectorRef,
        private _ref: ElementRef,
        private _render: Renderer2
    ) {
        super(_render, _ref);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.color !== undefined) {
            this.build(changes.color.previousValue, changes.color.currentValue);
        }
    }

    ngOnInit() {
        this.build(undefined, this.color);
    }

    writeValue(value: any): void {
        if (value !== null) {
            this.selected = value;
            this._cdr.detectChanges();
            this.selectedChange.emit(this.selected);
            this.onChange(this.selected);
        }
    }

    registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {

    }

    onChange: (_: any) => void;
    onTouched: () => void;

    matchState(selected: boolean, indeterminated: boolean): string {
        if (indeterminated) {
            return 'indeterminate_check_box';
        } else {
            return selected ? 'check_box' : 'check_box_outline_blank';
        }
    }

    private build(prevColor: string, currColor: string): void {
        this._render.removeClass(this._ref.nativeElement, prevColor === undefined ? 'octopus-primary-checkbox' : `octopus-${prevColor}-checkbox`);
        this._render.addClass(this._ref.nativeElement, `octopus-${currColor}-checkbox`);
    }

}