import { Component } from "@angular/core";
import { ColorPalette } from "src/app/global/enum.utils";

export class DemoCheckboxModel {

    completed?: boolean;
    color?: ColorPalette;
    text?: string;
    list?: DemoCheckboxModel[];

}

@Component({
    selector: 'app-demo-checkbox-view',
    templateUrl: './check.component.html'
})
export class DemoCheckboxView {

    tree: DemoCheckboxModel = {
        completed: false, color: 'primary', text: 'Primary Checkbox',
        list: [
            { completed: false, color: 'secondary', text: 'Secondary Checkbox' },
            { completed: false, color: 'success', text: 'Success Checkbox' },
            { completed: false, color: 'warning', text: 'Warning Checkbox' },
            { completed: false, color: 'failure', text: 'Failure Checkbox' },
            { completed: false, color: 'info', text: 'Info Checkbox' }
        ]
    };
    list: ColorPalette[] = ['primary', 'secondary', 'success', 'warning', 'failure', 'info'];
    checked: boolean = false;
    allComplete: boolean = false;

    updateAllComplete() {
        this.allComplete = this.tree.list != undefined && this.tree.list.every(item => item.completed);
    }

    someComplete(): boolean {
        if (this.tree.list === undefined) {
            return false;
        }

        return this.tree.list.filter(item => item.completed).length > 0 && !this.allComplete;
    }

    setAll(completed: boolean) {
        this.allComplete = completed;

        if (this.tree.list == null) return;

        this.tree.list.forEach(item => item.completed = completed);
    }

    format(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

}