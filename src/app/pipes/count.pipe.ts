import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'count'
})
export class CountPipe implements PipeTransform {

    transform(value: number): string {
        if (value >= 1000 * 1000 * 1000) {
            return Math.floor(value / (1000 * 1000 * 1000)) + 'b';
        }

        if (value >= 1000 * 1000) {
            return Math.floor(value / (1000 * 1000)) + 'm';
        }

        if (value >= 1000) {
            return Math.floor(value / 1000) + 'k';
        }

        return value === undefined ? '' : value.toString();
    }

}