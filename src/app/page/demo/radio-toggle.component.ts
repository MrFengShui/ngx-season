import { Component } from "@angular/core";

import { NGXSeasonIconName } from "src/app/components/icon/icon.component";

import { NGXSeasonColorPalette } from "src/app/utils/_palette.utils";

@Component({
    selector: 'ngx-sui-demo-radio-page',
    templateUrl: './radio-toggle.component.html'
})
export class DemoRadioTogglePageComponent {

    protected colors: NGXSeasonColorPalette[] = ['default', 'primary', 'accent', 'success', 'warning', 'failure', 'info', 'help'];
    protected items: Array<{ icon: NGXSeasonIconName, label: string, value: string | number }> = [
            { icon: 'align-left-text', label: '居左对齐', value: 'left' },
            { icon: 'align-center-text', label: '居中对齐', value: 'center' },
            { icon: 'align-right-text', label: '居右对齐', value: 'right' },
            { icon: 'align-justify-text', label: '两端对齐', value: 'justify' }
        ];

    protected values: string[] = this.colors.map(() => 'left');
    protected disabled: boolean = false;

}
