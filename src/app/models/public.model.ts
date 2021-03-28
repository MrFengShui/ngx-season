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