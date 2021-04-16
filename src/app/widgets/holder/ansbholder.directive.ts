import { Directive, ElementRef, HostBinding } from "@angular/core";

@Directive({
    selector: '[app-ansbholder]'
})
export class WidgetsAvatarNameSubscribeButtonHolderDirective {

    @HostBinding('class') class: string = 'holder ansb-holder';

    constructor(private er: ElementRef<HTMLElement>) {
        this.buildHTML();
    }

    private buildHTML(): void {
        this.er.nativeElement.innerHTML = `<div class="holder-unit" style="border-radius: 50%; grid-row: 1 / 3;"></div><div class="holder-unit"></div>
            <div class="holder-unit"></div><div class="holder-unit" style="grid-column: 3 / 3; grid-row: 1 / 3;"></div>`;
    }

}