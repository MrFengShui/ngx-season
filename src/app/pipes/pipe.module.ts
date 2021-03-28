import { NgModule } from "@angular/core";

import { DurationPipe } from "./duration.pipe";
import { SizePipe } from "./size.pipe";
import { SpanPipe } from "./span.pipe";

@NgModule({
    declarations: [
        DurationPipe,
        SizePipe,
        SpanPipe
    ],
    exports: [
        DurationPipe,
        SizePipe,
        SpanPipe
    ]
})
export class PipeModule { }