import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";

export class NGXSeasonTableDataSource<T = any> extends DataSource<T> {

    set data(data: T[]) {
        if (Array.isArray(data)) {
            this.data$.next(data);
            this._data = this.data$.value;
        }
    }

    get data(): T[] {
        return this._data;
    }

    private _data: T[] = [];

    private data$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

    private filterData: T[] = [];

    constructor(private _initData: T[] = []) {
        super();

        this.data = this._initData;
    }

    override connect(): Observable<T[]> {
        return this.data$.asObservable();
    }

    override disconnect(): void {
        this.data$.complete();
    }

    filter(keyword: string | undefined | null): void {
        if (keyword && keyword.length > 0) {
            if (this.filterData.length > 0) this.filterData.splice(0);

            for (const item of this.data) {
                for (const key in item) {
                    const value = item[key];

                    if (value === undefined || value === null) continue;

                    if (`${value}`.includes(keyword)) {
                        this.filterData.push(item);
                        break;
                    }
                }
            }

            this.data$.next(this.filterData);
            return;
        }

        this.data$.next(this.data);
    }

    paginate(index: number, size: number, total: number): void {
        const start: number = index * size, final: number = Math.min(start + size - 1, total - 1);
        this.filterData.splice(0);
        this.filterData = this.filterData.concat(...this.data.slice(start, final + 1));
        this.data$.next(this.filterData);
    }

}
