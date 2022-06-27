import {ChangeDetectionStrategy, Component} from "@angular/core";
import {BehaviorSubject, interval, map, Observable, of, Subject} from "rxjs";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'octopus-template-view',
    templateUrl: 'template.component.html'
})
export class OctopusTemplateView {

    flag$: Observable<boolean> = interval(1000).pipe(map(value => value % 2 === 0));
    list$: Observable<Array<{label: string, content: string, image: string}>> =
        of(Array.from({length: 3}).map((_, index) =>
            ({
                label: `Carousel Subject 00${index + 1}`,
                content: `Carousel Description 00${index + 1}`,
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

}
