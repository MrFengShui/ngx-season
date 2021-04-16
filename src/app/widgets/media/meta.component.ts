import { Component, HostBinding, Input } from "@angular/core";
import { MediaMetaModel } from "src/app/models/view/media.model";

@Component({
    selector: 'app-widgets-media-meta',
    templateUrl: './meta.component.html'
})
export class WidgetsMediaMetaComponent {

    @Input('model') model: MediaMetaModel | undefined;

    @HostBinding('class') class: string = 'meta';

}