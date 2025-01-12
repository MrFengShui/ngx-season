import { debounceTime, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";

export const fetchFile = (url: string, delay: number = 1000) =>
    fromFetch(url, {})
        .pipe(
            switchMap(response =>
                new Promise<string>(async (resolve, reject) => {
                    if (response.ok) {
                        const blob: Blob = await response.blob();
                        const reader: FileReader = new FileReader();
                        reader.readAsDataURL(blob);
                        reader.onload = event => {
                            const value = event.target?.result;

                            if (typeof value === 'string') resolve(value);
                        }
                    } else {
                        reject(`错误：路径为（${url}）的文件内容无法被读取！！！`);
                    }
                })),
            debounceTime(delay)
        );
