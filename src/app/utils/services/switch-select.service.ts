import { Injectable } from "@angular/core";
import { BehaviorSubject, debounceTime, Observable, Subject, throttleTime } from "rxjs";

export type NGXSeasonSwitchSelectionIndexModel = { prevIndex: number, currIndex: number, id?: string };
export type NGXSeasonUniqueSelectionIDModel = { id: string, pid: string };

@Injectable()
export class NGXSeasonSwitchSelectionIndexDispatcher {

    private subject$: Subject<NGXSeasonSwitchSelectionIndexModel> = new BehaviorSubject({ prevIndex: -1, currIndex: -1 });

    private model: NGXSeasonSwitchSelectionIndexModel | undefined;

    listen(): Observable<NGXSeasonSwitchSelectionIndexModel> {
        return this.subject$.asObservable().pipe(debounceTime(100));
    }

    notify(prevIndex: number, currIndex: number, id: string): void {
        if (this.model) {
            this.model.prevIndex = prevIndex;
            this.model.currIndex = currIndex;
            this.model.id = id;
        } else {
            this.model = { prevIndex, currIndex, id };
        }

        this.subject$.next(this.model);
    }

}

@Injectable()
export class NGXSeasonUniqueSelectionIDDispatcher {

    private subject$: Subject<NGXSeasonUniqueSelectionIDModel> = new BehaviorSubject({ id: '', pid: '' });

    private model: NGXSeasonUniqueSelectionIDModel | undefined;

    listen(): Observable<NGXSeasonUniqueSelectionIDModel> {
        return this.subject$.asObservable().pipe(debounceTime(100));
    }

    notify(id: string, pid: string): void {
        if (this.model) {
            this.model.id = id;
            this.model.pid = pid;
        } else {
            this.model = { id, pid };
        }

        this.subject$.next(this.model);
    }

}