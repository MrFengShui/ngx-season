import { NgModule } from "@angular/core";

import { CountPipe } from "./count.pipe";
import { DurationPipe } from "./duration.pipe";
import { SizePipe } from "./size.pipe";
import { SpanPipe } from "./span.pipe";

@NgModule({
    declarations: [
        CountPipe,
        DurationPipe,
        SizePipe,
        SpanPipe
    ],
    exports: [
        CountPipe,
        DurationPipe,
        SizePipe,
        SpanPipe
    ]
})
export class PipeModule { }