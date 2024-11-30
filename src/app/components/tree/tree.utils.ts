import { DataSource } from "@angular/cdk/collections";
import { Observable, of } from "rxjs";

export interface NGXSeasonTreeNodeModel<T = any> {

    id: number | string;
    data?: T;
    label: string;
    children?: NGXSeasonTreeNodeModel<T>[];

}

export class NGXSeasonTreeDataSource<T> extends DataSource<NGXSeasonTreeNodeModel<T>> {

    constructor(protected _data: Array<NGXSeasonTreeNodeModel<T>>) {
        super();
    }

    override connect(): Observable<NGXSeasonTreeNodeModel<T>[]> {
        return of(this._data);
    }

    override disconnect(): void {}

}
