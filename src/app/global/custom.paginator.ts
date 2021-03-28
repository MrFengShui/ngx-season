import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";

@Injectable({
    providedIn: 'root'
})
export class CustomPaginator extends MatPaginatorIntl {

    itemsPerPageLabel: string = 'Items per Page: ';
    firstPageLabel: string = 'first_page';
    lastPageLabel: string = 'last_page';
    previousPageLabel: string = 'previous_page';
    nextPageLabel: string = 'next_page';

    getRangeLabel = (page: number, pageSize: number, length: number): string => {
        if (length === 0 || pageSize === 0) {
            return '0_total_0';
        }

        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;
        return 'From ' + (startIndex + 1) + ' to ' + endIndex + ', Total ' + length + ' Pages';
    }

}