import { ChangeDetectionStrategy, Component } from "@angular/core";

export class DemoExpansionModel {

    subject?: string;
    description?: string;
    text?: string;
    children?: DemoExpansionModel[];

}

@Component({
    selector: 'app-demo-expansion-view',
    styleUrls: ['../demo.module.scss'],
    templateUrl: './expansion.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoExpansionViewComponent {

    list: DemoExpansionModel[] = [
        {
            subject: 'Expansion Panel Subject I',
            description: 'Expansion Panel Description I',
            children: [
                { text: 'Expansion Panel Content I - 1' },
                { text: 'Expansion Panel Content I - 2' },
                { text: 'Expansion Panel Content I - 3' },
                { text: 'Expansion Panel Content I - 4' },
                { text: 'Expansion Panel Content I - 5' }
            ]
        },
        {
            subject: 'Expansion Panel Subject II',
            description: 'Expansion Panel Description II',
            children: [
                { text: 'Expansion Panel Content II - 1' },
                { text: 'Expansion Panel Content II - 2' },
                { text: 'Expansion Panel Content II - 3' },
                { text: 'Expansion Panel Content II - 4' },
                { text: 'Expansion Panel Content II - 5' }
            ]
        },
        {
            subject: 'Expansion Panel Subject III',
            description: 'Expansion Panel Description III',
            children: [
                { text: 'Expansion Panel Content III - 1' },
                { text: 'Expansion Panel Content III - 2' },
                { text: 'Expansion Panel Content III - 3' },
                { text: 'Expansion Panel Content III - 4' },
                { text: 'Expansion Panel Content III - 5' }
            ]
        }
    ];

}