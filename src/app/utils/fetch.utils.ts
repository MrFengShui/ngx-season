import { debounceTime, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";

export const fetchFile = (url: string, delay: number = 1000) => fromFetch(url)
    .pipe(
        switchMap(response =>
            new Promise(async (resolve, reject) => {
                if (response.ok) {
                    const blob: Blob = await response.blob();
                    const reader: FileReader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onload = event => {
                        const value = event.target?.result;

                        if (value) resolve(value);
                    }
                } else {
                    reject();
                }
            })),
        debounceTime(delay)
    );
