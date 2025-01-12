import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { NGXSeasonImageModule } from "./image.module";

import { NGXSeasonImageFigureDirective, NGXSeasonImageAvatarDirective } from "./image.directive";

@Component({
    selector: 'ngx-sui-image-module-test',
    template: `
        <img ngx-sui-ImageFigure imgSrc="{{url}}" imgAlt="{{url}}" [ifDimension]="[207, 90]">
        <img ngx-sui-ImageAvatar imgSrc="{{url}}" imgAlt="{{url}}" iaSize="xl">
`
})
export class NGXSeasonImageModuleTestComponent {

    protected url: string = 'https://image.maigoo.com/upload/images/20201126/12062359045_750x463.jpg_470_290.jpg';

}

describe('NGXSeasonImageFigureDirective', () => {
    let figureElement: DebugElement, avatarElement: DebugElement;

    beforeEach(() => {
        const fixture: ComponentFixture<NGXSeasonImageModuleTestComponent> = TestBed
            .configureTestingModule({
                declarations: [ NGXSeasonImageModuleTestComponent ],
                imports: [ NGXSeasonImageModule ]
            })
            .createComponent(NGXSeasonImageModuleTestComponent);
        fixture.detectChanges();

        figureElement = fixture.debugElement.query(By.directive(NGXSeasonImageFigureDirective));
        avatarElement = fixture.debugElement.query(By.directive(NGXSeasonImageAvatarDirective));
    });

    it('"NGXSeasonImageFigureDirective" Test', () => {
        expect(figureElement).toBeDefined();
        expect(figureElement.nativeElement).toHaveClass('image');
        expect(figureElement.nativeElement).toHaveClass('figure');
    });

    it('"NGXSeasonImageAvatarDirective" Test', () => {
        expect(avatarElement).toBeDefined();
        expect(avatarElement.nativeElement).toHaveClass('image');
        expect(avatarElement.nativeElement).toHaveClass('avatar');
    });
});
