import {ChangeDetectionStrategy, Component, Inject} from "@angular/core";
import {interval, map, Observable, of} from "rxjs";
import {OCTOPUS_DIALOG_DATA, OctopusDialog} from "../overlay/dialog.service";

@Component({
    selector: 'octopus-template-overlay-view',
    template: `
        <div octo-dialog-head octoMinMax>Octopus Template Head - {{_data | json}}</div>
        <octo-split-line></octo-split-line>
        <div octo-dialog-body>Octopus Template Body</div>
        <octo-split-line></octo-split-line>
        <div octo-dialog-ctrl>
            <button octo-solid-btn octoColor="success" [octo-dialog-close]="'Submit'">Submit</button>
            <button octo-solid-btn octoColor="failure" [octo-dialog-close]="'Cancel'">Cancel</button>
        </div>
<!--        <octo-split-line></octo-split-line>-->
<!--        <div octo-dialog-foot>Octopus Template Foot</div>-->
    `
})
export class OctopusTemplateOverlayView {

    constructor(
        @Inject(OCTOPUS_DIALOG_DATA)
        public _data: any
    ) {
        console.log(this._data);
    }

}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'octopus-template-view',
    templateUrl: 'template.component.html'
})
export class OctopusTemplateView {

    flag$: Observable<boolean> = interval(1000).pipe(map(value => value % 2 === 0));
    logo$: Observable<string> = of('https://cdn.worldvectorlogo.com/logos/google-play-4.svg');
    list$: Observable<Array<{label: string, content: string, image: string}>> =
        of(Array.from({length: 8}).map((_, index) =>
            ({
                label: `Accordion Subject 00${index + 1}`,
                content: `Accordion Description 00${index + 1}`,
                image: index === 0
                    ? 'https://images.wallpaperscraft.com/image/single/bubbles_liquid_water_312589_1280x720.jpg'
                    : index === 1
                        ? 'https://images.wallpaperscraft.com/image/single/circles_pattern_fractal_312382_1280x720.jpg'
                        : 'https://images.wallpaperscraft.com/image/single/fractal_spirals_abstraction_312366_1280x720.jpg'
            })
        ));
    text$: Observable<string[]> = of([
        `This color palette comprises primary and accent colors that can be used for illustration or to develop your brand colors.`,
        `They’ve been designed to work harmoniously with each other.`,
        `The color palette starts with primary colors and fills in the spectrum to create a complete and usable palette for Android, Web, and iOS. Google suggests using the 500 colors as the primary colors in your app and the other colors as accents colors.`,
        `Themes enable consistent app styling through surface shades, shadow depth, and ink opacity.`
    ]);

    fst: boolean = false;
    snd: boolean = false;
    flag: boolean = true;

    constructor(private _dialog: OctopusDialog) {
    }

    open(): void {
        let dialog: OctopusDialog = this._dialog.config({data: {token: 'OCTOPUS_DIALOG_TOKEN'}})
            .open(OctopusTemplateOverlayView);
        dialog.afterOpened().subscribe(console.log);
        dialog.afterClosed().subscribe(console.log);
    }

}
