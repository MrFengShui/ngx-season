import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

export class DemoCheckboxTreeNode {

    color: string;
    checked: boolean;
    text: string;
    children?: DemoCheckboxTreeNode[]

}

@Component({
    selector: 'app-demo-checkbox-view',
    styleUrls: ['../demo.module.scss'],
    templateUrl: './check.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoCheckboxViewComponent {

    tree: DemoCheckboxTreeNode = {
        color: 'primary',
        checked: false,
        text: 'Indeterminate Checkbox',
        children: [
            { color: 'primary', checked: false, text: `Primary Checkbox` },
            { color: 'secondary', checked: false, text: `Secondary Checkbox` },
            { color: 'success', checked: false, text: `Success Checkbox` },
            { color: 'warning', checked: false, text: `Warning Checkbox` },
            { color: 'failure', checked: false, text: `Failure Checkbox` },
            { color: 'info', checked: false, text: `Info Checkbox` }
        ]
    };
    allChecked: boolean = false;

    updateAllComplete() {
        this.allChecked = this.tree.children != null && this.tree.children.every(t => t.checked);
    }

    someComplete(): boolean {
        if (this.tree.children == null) {
            return false;
        }

        return this.tree.children.filter(t => t.checked).length > 0 && !this.allChecked;
    }

    setAll(checked: boolean) {
        this.allChecked = checked;

        if (this.tree.children == null) {
            return;
        }

        this.tree.children.forEach(t => t.checked = checked);
    }

}