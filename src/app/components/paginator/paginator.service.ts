import { coerceNumberProperty } from "@angular/cdk/coercion";
import { Injectable } from "@angular/core";

@Injectable()
export class OctopusPaginatorOption {

    firstLabel: string = 'First Page';
    lastLabel: string = 'Last Page';
    previousLabel: string = 'Previous Page';
    nextLabel: string = 'Next Page';
    optionLabel: string = 'Size Options:';

    formatTotalLabel(index: number | string, size: number | string, length: number | string): string {
        return `${coerceNumberProperty(index) + 1} of ${this.calculatePages(size, length)}`;
    }

    calculatePages(size: number | string, length: number | string): number {
        return Math.ceil(coerceNumberProperty(length) / coerceNumberProperty(size));
    }

}