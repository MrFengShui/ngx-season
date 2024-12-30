import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, debounceTime, Observable } from "rxjs";

export type NGXSeasonAccordionSelectionModel = { id: string, pid: string, toggled: boolean };

@Injectable()
export class NGXSeasonAccordionSelectionService implements OnDestroy {

    private selection$: BehaviorSubject<NGXSeasonAccordionSelectionModel> = new BehaviorSubject<NGXSeasonAccordionSelectionModel>({ id: '', pid: '', toggled: false });

    ngOnDestroy(): void {
        this.selection$.complete();
    }

    notify(id: string, pid: string, toggled: boolean): void {
        this.selection$.next({ id, pid, toggled });
    }

    listen(delay: number): Observable<NGXSeasonAccordionSelectionModel> {
        return this.selection$.asObservable().pipe(debounceTime(delay));
    }

}
