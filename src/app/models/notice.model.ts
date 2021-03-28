export class NoticeUnitEntity {

    title!: string;
    brand!: string;
    span!: number;

    constructor(title: string, brand: string, span: number) {
        this.title = title;
        this.brand = brand;
        this.span = span;
    }

}

export class NoticeEntity {

    audio!: NoticeUnitEntity[];
    video!: NoticeUnitEntity[];
    article!: NoticeUnitEntity[];
    blog!: NoticeUnitEntity[];
    gallery!: NoticeUnitEntity[];

    constructor(audio: NoticeUnitEntity[], video: NoticeUnitEntity[], article: NoticeUnitEntity[], blog: NoticeUnitEntity[], gallery: NoticeUnitEntity[]) {
        this.audio = audio;
        this.video = video;
        this.article = article;
        this.blog = blog;
        this.gallery = gallery;
    }

}