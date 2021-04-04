import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'span'
})
export class SpanPipe implements PipeTransform {

    transform(value: number): string {
        for (let i = 5; i >= 1; i--) {
            if (value >= 60 * 60 * 24 * 365.25 * i) {
                return i + ' years ago';
            }
        }

        for (let i = 12; i >= 1; i--) {
            if (value >= 60 * 60 * 24 * 30 * i) {
                return i + ' months ago';
            }
        }

        for (let i = 30; i >= 1; i--) {
            if (value >= 60 * 60 * 24 * i) {
                return i + ' days ago';
            }
        }

        for (let i = 24; i >= 1; i--) {
            if (value >= 60 * 60 * i) {
                return i + ' hours ago';
            }
        }

        for (let i = 59; i >= 1; i--) {
            if (value >= 60 * i) {
                return i + ' minutes ago';
            }
        }

        return value + ' seconds ago ';
    }

}