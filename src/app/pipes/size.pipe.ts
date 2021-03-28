import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'size'
})
export class SizePipe implements PipeTransform {

    transform(value: number): string {
        if (value >= 1024 * 1024 * 1024 * 1024) {
            return (value / (1024.0 * 1024.0 * 1024.0 * 1024.0)).toFixed(2) + ' (TB)';
        }

        if (value >= 1024 * 1024 * 1024) {
            return (value / (1024.0 * 1024.0 * 1024.0)).toFixed(2) + ' (GB)';
        }

        if (value >= 1024 * 1024) {
            return (value / (1024.0 * 1024.0)).toFixed(2) + ' (MB)';
        }

        if (value >= 1024) {
            return (value / 1024.0).toFixed(2) + ' (KB)';
        }

        return value === undefined ? '' : value + ' (bytes)';
    }

}