import { ApplicationRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';

export class DemoRouterLinkModel {

    icon?: string;
    paths?: string[];
    rotate?: number;
    text?: string;

}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    @ViewChild('border', { read: ElementRef, static: true })
    private border!: ElementRef<HTMLElement>;

    @ViewChild('north', { read: ElementRef, static: true })
    private north!: ElementRef<HTMLElement>;

    chartList!: DemoRouterLinkModel[];
    componentList!: DemoRouterLinkModel[];
    containerList!: DemoRouterLinkModel[];
    formList!: DemoRouterLinkModel[];
    layoutList!: DemoRouterLinkModel[];
    popupList!: DemoRouterLinkModel[];

    constructor(
        private _ref: ApplicationRef,
        private _zone: NgZone
    ) {
        this._zone.runOutsideAngular(() =>
            setInterval(() => this._zone.run(() => this._ref.tick()), 250));
    }

    ngOnInit() {
        this.chartList = [
            { icon: 'bar_chart', paths: ['octopus', 'chart', 'bar'], text: 'Bar Chart' },
            { icon: 'bubble_chart', paths: ['octopus', 'chart', 'bubble'], text: 'Bubble Chart' },
            { icon: 'stacked_line_chart', paths: ['octopus', 'chart', 'line'], text: 'Line Chart' },
            { icon: 'pie_chart', paths: ['octopus', 'chart', 'pie'], text: 'Pie Chart' },
            { icon: 'radar', paths: ['octopus', 'chart', 'radar'], text: 'Radar Chart' },
            { icon: 'scatter_plot', paths: ['octopus', 'chart', 'scatter'], text: 'Scatter Chart' },
            { icon: 'stacked_bar_chart', paths: ['octopus', 'chart', 'stack'], text: 'Stack Chart' },
            { icon: 'waterfall_chart', paths: ['octopus', 'chart', 'waterfall'], text: 'Waterfall Chart' },
            { icon: 'table_chart', paths: ['octopus', 'chart', 'table'], text: 'Table Chart' }
        ];
        this.componentList = [
            { icon: 'account_circle', paths: ['octopus', 'component', 'avatar'], text: 'Avatar' },
            { icon: 'badge', paths: ['octopus', 'component', 'badge'], text: 'Badge' },
            { icon: 'home', paths: ['octopus', 'component', 'breadcrumb'], text: 'Breadcrumb' },
            { icon: 'smart_button', paths: ['octopus', 'component', 'button'], text: 'Button' },
            { icon: 'redeem', paths: ['octopus', 'component', 'card'], text: 'Card' },
            { icon: 'view_carousel', paths: ['octopus', 'component', 'carousel'], text: 'Carousel' },
            { icon: 'memory', paths: ['octopus', 'component', 'chip'], text: 'Chip' },
            { icon: 'safety_divider', paths: ['octopus', 'component', 'divider'], text: 'Divider' },
            { icon: 'face', paths: ['octopus', 'component', 'icon'], text: 'Icon' },
            { icon: 'list', paths: ['octopus', 'component', 'list'], text: 'List' },
            { icon: 'pages', paths: ['octopus', 'component', 'paginator'], text: 'Paginator' },
            { icon: 'home', paths: ['octopus', 'component', 'placeholder'], text: 'Placeholder' },
            { icon: 'home', paths: ['octopus', 'component', 'progress'], text: 'Progress' },
            { icon: 'waves', paths: ['octopus', 'component', 'ripple'], text: 'Ripple' },
            { icon: 'linear_scale', paths: ['octopus', 'component', 'slider'], text: 'Slider' },
            { icon: 'table_view', paths: ['octopus', 'component', 'table'], text: 'Table' },
            { icon: 'home', paths: ['octopus', 'component', 'toggle'], text: 'Toggle' },
            { icon: 'account_tree', paths: ['octopus', 'component', 'tree'], text: 'Tree' }
        ];
        this.containerList = [
            { icon: 'expand_circle_down', paths: ['octopus', 'container', 'expansion'], text: 'Expansion' },
            { icon: 'home', paths: ['octopus', 'container', 'input'], text: 'Navbar' },
            { icon: 'home', paths: ['octopus', 'container', 'radio'], text: 'Sidenav' },
            { icon: 'tab', paths: ['octopus', 'container', 'tabbed'], text: 'Tabbed' },
            { icon: 'home', paths: ['octopus', 'container', 'toolbar'], text: 'Toolbar' }
        ];
        this.formList = [
            { icon: 'check_box', paths: ['octopus', 'form', 'checkbox'], text: 'Checkbox' },
            { icon: 'password', paths: ['octopus', 'form', 'input'], text: 'Input' },
            { icon: 'radio_button_checked', paths: ['octopus', 'form', 'radio'], text: 'RadioButton' },
            { icon: 'home', paths: ['octopus', 'form', 'select'], text: 'Select' }
        ];
        this.layoutList = [
            { icon: 'view_compact', paths: ['octopus', 'layout', 'border'], text: 'Layout Border' },
            { icon: 'view_module', paths: ['octopus', 'layout', 'grid'], text: 'Layout Grid' },
            { icon: 'view_column', paths: ['octopus', 'layout', 'hbox'], text: 'Layout HBox' },
            { icon: 'view_column', paths: ['octopus', 'layout', 'vbox'], rotate: 90, text: 'Layout VBox' }
        ];
        this.popupList = [
            { icon: 'home', paths: ['octopus', 'container', 'dialog'], text: 'Dialog' },
            { icon: 'menu', paths: ['octopus', 'container', 'menu'], text: 'Menu' },
            { icon: 'home', paths: ['octopus', 'container', 'sheet'], text: 'Sheet' },
            { icon: 'home', paths: ['octopus', 'container', 'toast'], text: 'Toast' },
            { icon: 'home', paths: ['octopus', 'container', 'tooltip'], text: 'Tooltip' }
        ];
    }

    calcSize(): string {
        return `calc(${this.border.nativeElement.children[0].clientHeight}px - ${this.north.nativeElement.clientHeight}px)`;
    }

}
