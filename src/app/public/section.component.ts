import {Component, HostBinding, Input, ViewEncapsulation} from "@angular/core";

export interface OctopusSectionParagraph {

    type: 'normal' | 'highlight';
    text: string;

}

export interface OctopusSectionTable {

    headers: string[];
    colrows: string[][];

}

export interface OctopusSectionEntity {

    heading?: string;
    paragraphs?: OctopusSectionParagraph[][];
    tables?: OctopusSectionTable[];

}

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'octopus-section',
    styleUrls: ['section.component.scss'],
    templateUrl: 'section.component.html'
})
export class OctopusSection {

    @Input('entity') entity!: OctopusSectionEntity;

    @HostBinding('class') class: string = 'octopus-section';

}
