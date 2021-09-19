import { Component, HostBinding, Inject, OnInit } from "@angular/core";
import { OctopusDrawer, OCTOPUS_DRAWER_DATA } from "src/app/popup/drawer/drawer.service";

@Component({
    selector: 'app-demo-drawer-view-container',
    template: `<button (click)="handleDismissActionEvent()">DISMISS {{data}}</button>`
})
export class DemoDrawerViewContainer implements OnInit {

    @HostBinding('class') class: string = 'demo-drawer-view-container';

    data: any;

    constructor(
        private _drawer: OctopusDrawer,
        @Inject(OCTOPUS_DRAWER_DATA)
        private _data: any
    ) { }

    ngOnInit() {
        this.data = this._data;
    }

    handleDismissActionEvent(): void {
        this._drawer.hide('DemoDrawerViewContainer');
    }

}

@Component({
    selector: 'app-demo-drawer-view',
    templateUrl: './drawer.component.html'
})
export class DemoDrawerView {

    constructor(private _drawer: OctopusDrawer) { }

    handlePositionActionEvent(position: 'top' | 'bottom' | 'left' | 'right' | undefined): void {
        this._drawer.show(DemoDrawerViewContainer, {
            width: position === 'top' || position === 'bottom' ? '100%' : 240,
            height: position === 'top' || position === 'bottom' ? 240 : '100%',
            position
        });
        this._drawer.afterShow().subscribe(() => console.log('After Show'))
        this._drawer.afterHide().subscribe(value => console.log(`After Hide - ${value}`));
    }

}