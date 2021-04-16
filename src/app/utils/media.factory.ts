import { ChatMessageModel } from "../models/support.model";
import { MediaChatModel, MediaPlayViewModel } from "../models/view/media.model";

export class MediaFactory {

    private static instance: MediaFactory;

    createChatMessageModel(role: number, avatar: string): ChatMessageModel {
        return new ChatMessageModel(role, avatar, new Date(), undefined);
    }

    createPlayViewModel(): MediaPlayViewModel {
        return new MediaPlayViewModel(undefined, undefined, new Array(3), undefined);
    }

    static newInstance(): MediaFactory {
        if (this.instance === null || this.instance === undefined) {
            this.instance = new MediaFactory();
        }

        return this.instance;
    }

}