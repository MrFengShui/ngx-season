import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {

    transform(value: number, formatter?: string): string {
        if (formatter === undefined || formatter === null) {
            formatter = '00:00:00';
        }

        let hour: number = 0;
        let minute: number = 0;
        let second: number = 0;
        let temp: number = value;

        if (temp >= 3600) {
            hour = Math.floor(temp / 3600);
            temp = temp % 3600;
        }

        if (temp >= 60) {
            minute = Math.floor(temp / 60);
            temp = temp % 60;
        }

        second = Math.floor(temp);

        switch (formatter) {
            case '00:00:00': return this.format(hour) + ' : ' + this.format(minute) + ' : ' + this.format(second);
            case '00:00': return this.format(hour) + ' : ' + this.format(minute);
            default: return 'NaN';
        }
    }

    private format(value: number): string {
        return (value < 10 ? '0' : '') + value;
    }

}