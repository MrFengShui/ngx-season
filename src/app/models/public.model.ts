export class SimpleMessageModel {

    messageID!: string;
    messageSubject!: string;
    messageCreateTime!: Date;

    constructor(messageID: string, messageSubject: string, messageCreateTime: Date) {
        this.messageID = messageID;
        this.messageSubject = messageSubject;
        this.messageCreateTime = messageCreateTime;
    }

}

export class ComplexMessageModel extends SimpleMessageModel {

    messageContents!: string[];

    constructor(messageID: string, messageSubject: string, messageCreateTime: Date, messageContents: string[]) {
        super(messageID, messageSubject, messageCreateTime);
        this.messageContents = messageContents;
    }

}

export class SimpleImageLinkModel {

    subject!: string;
    source!: string;
    link!: string[];

    constructor(subject: string, source: string, link: string[]) {
        this.subject = subject;
        this.source = source;
        this.link = link;
    }

}

export class SimpleUnitModel {

    avatar!: string;
    name!: string;
    view!: number;
    upload!: Date;
    capture!: string;
    subject!: string;
    link!: string[];

    constructor(avatar: string, name: string, view: number, upload: Date, capture: string, subject: string, link: string[]) {
        this.avatar = avatar;
        this.name = name;
        this.view = view;
        this.upload = upload;
        this.capture = capture;
        this.subject = subject;
        this.link = link;
    }

}

export class SimpleRankUnitModel {

    rankID!: string;
    rankCategory!: string;
    rankCapture!: string;
    rankSubject!: string;
    rankName!: string;
    rankPoint!: number;
    rankCreateTime!: Date;

    constructor(rankID: string, rankCategory: string, rankCapture: string, rankSubject: string, rankName: string, rankPoint: number, rankCreateTime: Date) {
        this.rankID = rankID;
        this.rankCategory = rankCategory;
        this.rankCapture = rankCapture;
        this.rankSubject = rankSubject;
        this.rankName = rankName;
        this.rankPoint = rankPoint;
        this.rankCreateTime = rankCreateTime;
    }

}

export class SimpleRankModel {

    rankAudio!: SimpleRankUnitModel[];
    rankVideo!: SimpleRankUnitModel[];
    rankArticle!: SimpleRankUnitModel[];
    rankGallery!: SimpleRankUnitModel[];

}

export const createMessages = (count: number): SimpleMessageModel[] => {
    let list: SimpleMessageModel[] = [];

    for (let i = 0; i < count; i++) {
        list.push(new SimpleMessageModel('MESSAGE_ID_' + (i + 1), 'Message Subject ' + (i + 1), new Date()));
    }

    return list;
}

export const selectImages = (count: number, min: number, max: number): SimpleImageLinkModel[] => {
    let list: SimpleImageLinkModel[] = [];

    for (let i = 0; i < count; i++) {
        let index: number = Math.floor(Math.random() * (max - min) + min);
        list.push(new SimpleImageLinkModel('Carousel Picture ' + index, 'tests/image/img-8k-' + index + '.jpg', ['/']));
    }

    return list;
}

export const selectUnits = (count: number, min: number, max: number): SimpleUnitModel[] => {
    let list: SimpleUnitModel[] = [];

    for (let i = 0; i < count; i++) {
        let index: number = Math.floor(Math.random() * (max - min) + min);
        let random: number = Math.floor(Math.random() * 100000000);
        list.push(new SimpleUnitModel('assets/images/profile.png', 'Angular', random, new Date('January ' + (i + 1) + ', 2021'),
            'tests/image/img-8k-' + index + '.jpg', 'Carousel Picture ' + index, []));
    }

    return list;
}

export const selectRanks = (count: number, min: number, max: number): SimpleRankModel => {
    const create = (name: string): SimpleRankUnitModel[] => {
        let list: SimpleRankUnitModel[] = [];

        for (let i = 0; i < count; i++) {
            let index: number = Math.floor(Math.random() * (max - min) + min);
            let point: number = (i + 1) * 10 / 12
            let date: Date = new Date();
            list.push(new SimpleRankUnitModel(date.getTime().toString(), name.toLowerCase(), 'tests/image/img-8k-' + index + '.jpg', name + ' Capture ' + index,
                name + ' From ' + (i + 1), parseFloat(point.toFixed(1)), date));
        }

        return list;
    }
    return {
        rankAudio: create('Audio'),
        rankVideo: create('Video'),
        rankArticle: create('Article'),
        rankGallery: create('Gallery')
    };
}
