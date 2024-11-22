import { AfterViewInit, Component, ElementRef, Renderer2 } from "@angular/core";

import { NGXSeasonModalContainerComponent } from "src/app/components/modal/modal.component";

import { NGXSeasonModalConfig, NGXSeasonModalRef, NGXSeasonModalService, NGXSeasonModalSize } from "src/app/components/modal/modal.service";

@Component({
    selector: 'ngx-sui-demo-modal-container',
    template: `
        <div ngx-sui-ModalHeader>
            <!-- <ngx-sui-icon iconShape="document" iconSize="xl"></ngx-sui-icon> -->
        </div>
        <div ngx-sui-ModalContent ngx-sui-Scrollbar scrollBarAxis="xy-axis"><div class="w-100 vh-100"></div></div>
        <div ngx-sui-ModalFooter>
            <button ngx-sui-SolidTextButton btnColor="primary" btnIcon="check" (click)="_modalRef.dismiss('confirm')">确定</button>
            <button ngx-sui-SolidTextButton btnColor="accent" btnIcon="times" (click)="_modalRef.dismiss('cancel')">取消</button>
        </div>
    `
})
export class DemoModalContainerComponent extends NGXSeasonModalContainerComponent implements AfterViewInit {

    constructor(
        protected override _element: ElementRef,
        protected override _renderer: Renderer2,

        protected _modalRef: NGXSeasonModalRef
    ) {
        super(_element, _renderer);
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'demo-modal-container');
    }

}

@Component({
    selector: 'ngx-sui-demo-modal-page',
    templateUrl: './modal.component.html'
})
export class DemoModalPageComponent {

    constructor(private _modal: NGXSeasonModalService) {}

    handleOpenModalEvent(size?: NGXSeasonModalSize): void {
        const config: NGXSeasonModalConfig | undefined = size ? this._modal.configBuilder().setupAllowAnimation(true).setupAllowDragDrop(true).setupSize(size).build() : undefined;
        const modalRef = this._modal.display(DemoModalContainerComponent, config);
        modalRef.opened().subscribe(() => console.debug('$$$opened$$$'));
        modalRef.closed().subscribe(result => console.debug('$$$closed$$$', result));
        modalRef.handleModalOutsideClickEvent().subscribe(event => console.debug(event));
        modalRef.handleModalStrikeEvent().subscribe(event => console.debug(event));
    }

}
