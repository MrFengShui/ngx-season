import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

export class DemoTabbedModel {

    color?: string;
    content?: string;
    icon?: string;
    text?: string;
    children?: DemoTabbedModel[];

}

@Component({
    selector: 'app-demo-tabbed-view',
    styleUrls: ['../demo.module.scss'],
    templateUrl: './tabbed.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoTabbedViewComponent implements OnInit {

    list: DemoTabbedModel[] = [];

    ngOnInit() {
        for (let i = 0; i < 7; i++) {
            let tag: string;

            switch (i) {
                case 1: tag = 'Primary'; break;
                case 2: tag = 'Secondary'; break;
                case 3: tag = 'Success'; break;
                case 4: tag = 'Warning'; break;
                case 5: tag = 'Failure'; break;
                case 6: tag = 'Info'; break;
                default: tag = 'Base'; break;
            }

            let item: DemoTabbedModel = { color: tag.toLowerCase(), children: [] };

            for (let j = 0; j < 3; j++) {
                item.children.push({ content: `${tag} Tabbed Content ${j + 1}`, icon: 'home', text: `${tag} Tabbed Label ${j + 1}` });
            }

            this.list.push(item);
        }
    }

}