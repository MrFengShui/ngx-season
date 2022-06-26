import {ChangeDetectionStrategy, Component} from "@angular/core";
import {BehaviorSubject, interval, map, Observable, of, Subject} from "rxjs";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'octopus-template-view',
    templateUrl: 'template.component.html'
})
export class OctopusTemplateView {

    flag$: Observable<boolean> = interval(1000).pipe(map(value => value % 2 === 0));
    list$: Observable<Array<{label: string, content: string}>> =
        of(Array.from({length: 8}).map((_, index) =>
            ({label: `Tab Label ${index + 1}`, content: `Tab Content ${index + 1}`})));

    fst: boolean = false;
    snd: boolean = false;

    currIndex: number = 0;
    prevIndex: number = -1;

}
