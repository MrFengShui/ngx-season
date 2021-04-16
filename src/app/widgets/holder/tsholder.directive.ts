import { Directive, ElementRef, HostBinding } from "@angular/core";

@Directive({
    selector: '[app-tsholder]'
})
export class WidgetsTitleSubtitleHolderDirective {

    @HostBinding('class') class: string = 'holder ts-holder';

    constructor(private er: ElementRef<HTMLElement>) {
        this.buildHTML();
    }

    private buildHTML(): void {
        this.er.nativeElement.innerHTML = `<div class="holder-unit"></div><div class="holder-unit"></div>`;
    }

}