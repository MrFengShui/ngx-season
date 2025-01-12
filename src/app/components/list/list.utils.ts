import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";

export class NGXSeasonListDataSource<C = unknown> extends DataSource<C> {

    private source$: BehaviorSubject<C[]> = new BehaviorSubject<C[]>([]);

    constructor(_source: C[] | undefined) {
        super();

        if (Array.isArray(_source)) this.source$.next(_source);
    }

    override connect(): Observable<readonly C[]> {
        return this.source$.asObservable();
    }

    override disconnect(): void {
        this.source$.complete();
    }

    update(data: C[]): void {
        this.source$.next(data);
    }

}
