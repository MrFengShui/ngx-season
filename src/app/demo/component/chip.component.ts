import { Component, OnInit } from "@angular/core";

import { ColorPalette } from "src/app/global/enum.utils";

export class DemoChipModel {

    color?: ColorPalette;
    removable?: boolean;
    text?: string;

}

@Component({
    selector: 'app-demo-chip-view',
    templateUrl: './chip.component.html'
})
export class DemoChipView implements OnInit {

    list: DemoChipModel[] = [];

    ngOnInit() {
        this.list = [
            { color: 'base', removable: false, text: 'Base Chip' },
            { color: 'primary', removable: false, text: 'Primary Chip' },
            { color: 'secondary', removable: false, text: 'Secondary Chip' },
            { color: 'success', removable: false, text: 'Success Chip' },
            { color: 'warning', removable: false, text: 'Warning Chip' },
            { color: 'failure', removable: false, text: 'Failure Chip' },
            { color: 'info', removable: false, text: 'Info Chip' },
        ];
    }

    handleAddActionEvent(color: ColorPalette): void {
        this.list.push({ color: color, removable: true, text: `${color.toUpperCase()} Removable Chip` });
    }

    handleRemoveActionEvent(dcm: DemoChipModel): void {
        let index: number = this.list.findIndex(item => item === dcm);
        this.list.splice(index, 1);
    }

}