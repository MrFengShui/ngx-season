import { HttpClient, HttpEventType } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subscription } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class VideoPlayerStreamService {

    subscription!: Subscription;

    private mimeCodec: string = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';

    constructor(private http: HttpClient) { }

    open(url: string, player: HTMLVideoElement): void {
        if ('MediaSource' in window && MediaSource.isTypeSupported(this.mimeCodec)) {
            let ms: MediaSource = new MediaSource();
            // ms.onsourceopen = (): any => {
            //     let stream: SourceBuffer = ms.addSourceBuffer(this.mimeCodec);
            //     this.connect(url).then(value => {
            //         stream.onerror = event => console.error(event.currentTarget);
            //         stream.onupdateend = () => {
            //             if (!stream.updating && ms.readyState === 'open') {
            //                 ms.endOfStream();
            //                 player.play();
            //             }
            //             console.log('***', ms.readyState);
            //         }
            //         stream.appendBuffer(value);
            //     });
            // }
            player.src = window.URL.createObjectURL(ms);
        } else {
            console.error('Not Supported');
        }
    }

    private connect(url: string): Promise<ArrayBuffer> {
        let promise: Promise<ArrayBuffer> = new Promise((resolve, reject) =>
            this.subscription = this.http.get(url, {
                headers: {},
                params: {},
                observe: 'events',
                reportProgress: true,
                responseType: 'arraybuffer',
                withCredentials: false
            }).subscribe(events => {
                switch (events.type) {
                    case HttpEventType.DownloadProgress:
                        console.log(events.loaded, events.total, events.type);
                        break;
                    case HttpEventType.Response:
                        resolve(events.body || new ArrayBuffer(0));
                        break;
                }
            }, error => reject(error)));
        return promise;
    }

    close(): void {
        if (this.subscription !== undefined && !this.subscription.closed) {
            this.subscription.unsubscribe();
        }
    }

}