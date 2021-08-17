import { Direction } from "@angular/cdk/bidi";
import { ChangeDetectionStrategy, Component } from "@angular/core";

export class DemoListModel {

    color?: string;
    direction?: Direction;
    multiple?: boolean;
    ordered?: boolean;
    text?: string;
    items?: DemoListModel[]

}

@Component({
    selector: 'app-demo-list-view',
    styleUrls: ['../demo.module.scss'],
    templateUrl: './list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoListViewComponent {

    list: DemoListModel[] = [
        {
            multiple: true,
            ordered: false,
            items: [
                { color: 'primary', direction: 'ltr', text: 'Primary Selection Item' },
                { color: 'secondary', direction: 'ltr', text: 'Secondary Selection Item' },
                { color: 'success', direction: 'ltr', text: 'Success Selection Item' },
                { color: 'warning', direction: 'ltr', text: 'Warning Selection Item' },
                { color: 'failure', direction: 'ltr', text: 'Failure Selection Item' },
                { color: 'info', direction: 'ltr', text: 'Info Selection Item' }
            ]
        },
        {
            multiple: true,
            ordered: false,
            items: [
                { color: 'primary', direction: 'rtl', text: 'Primary Selection Item' },
                { color: 'secondary', direction: 'rtl', text: 'Secondary Selection Item' },
                { color: 'success', direction: 'rtl', text: 'Success Selection Item' },
                { color: 'warning', direction: 'rtl', text: 'Warning Selection Item' },
                { color: 'failure', direction: 'rtl', text: 'Failure Selection Item' },
                { color: 'info', direction: 'rtl', text: 'Info Selection Item' }
            ]
        },
        {
            multiple: true,
            ordered: true,
            items: [
                { color: 'primary', direction: 'ltr', text: 'Primary Selection Item' },
                { color: 'secondary', direction: 'ltr', text: 'Secondary Selection Item' },
                { color: 'success', direction: 'ltr', text: 'Success Selection Item' },
                { color: 'warning', direction: 'ltr', text: 'Warning Selection Item' },
                { color: 'failure', direction: 'ltr', text: 'Failure Selection Item' },
                { color: 'info', direction: 'ltr', text: 'Info Selection Item' }
            ]
        },
        {
            multiple: true,
            ordered: true,
            items: [
                { color: 'primary', direction: 'rtl', text: 'Primary Selection Item' },
                { color: 'secondary', direction: 'rtl', text: 'Secondary Selection Item' },
                { color: 'success', direction: 'rtl', text: 'Success Selection Item' },
                { color: 'warning', direction: 'rtl', text: 'Warning Selection Item' },
                { color: 'failure', direction: 'rtl', text: 'Failure Selection Item' },
                { color: 'info', direction: 'rtl', text: 'Info Selection Item' }
            ]
        },
        {
            multiple: false,
            ordered: false,
            items: [
                { color: 'primary', direction: 'ltr', text: 'Primary Selection Item' },
                { color: 'secondary', direction: 'ltr', text: 'Secondary Selection Item' },
                { color: 'success', direction: 'ltr', text: 'Success Selection Item' },
                { color: 'warning', direction: 'ltr', text: 'Warning Selection Item' },
                { color: 'failure', direction: 'ltr', text: 'Failure Selection Item' },
                { color: 'info', direction: 'ltr', text: 'Info Selection Item' }
            ]
        },
        {
            multiple: false,
            ordered: false,
            items: [
                { color: 'primary', direction: 'rtl', text: 'Primary Selection Item' },
                { color: 'secondary', direction: 'rtl', text: 'Secondary Selection Item' },
                { color: 'success', direction: 'rtl', text: 'Success Selection Item' },
                { color: 'warning', direction: 'rtl', text: 'Warning Selection Item' },
                { color: 'failure', direction: 'rtl', text: 'Failure Selection Item' },
                { color: 'info', direction: 'rtl', text: 'Info Selection Item' }
            ]
        },
        {
            multiple: false,
            ordered: true,
            items: [
                { color: 'primary', direction: 'ltr', text: 'Primary Selection Item' },
                { color: 'secondary', direction: 'ltr', text: 'Secondary Selection Item' },
                { color: 'success', direction: 'ltr', text: 'Success Selection Item' },
                { color: 'warning', direction: 'ltr', text: 'Warning Selection Item' },
                { color: 'failure', direction: 'ltr', text: 'Failure Selection Item' },
                { color: 'info', direction: 'ltr', text: 'Info Selection Item' }
            ]
        },
        {
            multiple: false,
            ordered: true,
            items: [
                { color: 'primary', direction: 'rtl', text: 'Primary Selection Item' },
                { color: 'secondary', direction: 'rtl', text: 'Secondary Selection Item' },
                { color: 'success', direction: 'rtl', text: 'Success Selection Item' },
                { color: 'warning', direction: 'rtl', text: 'Warning Selection Item' },
                { color: 'failure', direction: 'rtl', text: 'Failure Selection Item' },
                { color: 'info', direction: 'rtl', text: 'Info Selection Item' }
            ]
        }
    ];

}
