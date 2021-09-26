import { Component } from "@angular/core";
import { ColorPalette } from "src/app/global/enum.utils";

@Component({
    selector: 'app-demo-expansion-view',
    templateUrl: './expansion.component.html'
})
export class DemoExpansionView {

    colors: ColorPalette[] = ['primary', 'secondary', 'success', 'warning', 'failure', 'info'];
    date: Date = new Date();

    textFormat(color: ColorPalette, order: string): string {
        return `${color.toLocaleUpperCase()} Expansion Panel ${order}`;
    }

    handleUpdateActionEvent(): void {
        this.date = new Date();
    }

}