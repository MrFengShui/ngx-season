import { AfterContentInit, Component, ContentChild, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges } from "@angular/core";

import { OctopusChipIcon } from "./icon.component";

@Component({
    selector: 'octopus-chip',
    templateUrl: './chip.component.html'
})
export class OctopusChip implements OnChanges, OnInit, AfterContentInit {

    @Input('color') color: string = 'primary';
    @Input('removable') removable: boolean = false;

    @Output('removed') removed: EventEmitter<MouseEvent> = new EventEmitter();

    @ContentChild(OctopusChipIcon) icon: OctopusChipIcon;

    @HostBinding('class') class: string = 'octopus-chip';

    constructor(
        private _ref: ElementRef<HTMLElement>,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        this.build(
            changes.color === undefined ? 'primary' : changes.color.currentValue,
            changes.removable === undefined ? false : changes.removable.currentValue
        );
    }

    ngOnInit() {
        this.build(this.color, this.removable);
    }

    ngAfterContentInit() {
        if (this.icon === undefined) {
            this._render.setStyle(this._ref.nativeElement.children.item(0), 'padding', '0.75rem 1.5rem');
        }
    }

    private build(color: string, removable: boolean): void {
        setTimeout(() => {
            this._render.addClass(this._ref.nativeElement, `octopus-${color}-chip`);
            this._render.setStyle(this._ref.nativeElement.children.item(0), 'padding-right', removable ? '0.5rem' : '1.5rem');
        });
    }

}