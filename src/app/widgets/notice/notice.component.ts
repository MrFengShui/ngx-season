import { Component, OnInit } from "@angular/core";
import { MatTabChangeEvent } from "@angular/material/tabs";

import { createNoticeData } from "src/app/data/home.data";

import { NoticeEntity } from "src/app/models/notice.model";

@Component({
    selector: 'app-widgets-notice',
    templateUrl: './notice.component.html'
})
export class NoticeComponent implements OnInit {

    count!: number;
    allRead!: boolean;
    audioRead!: boolean;
    videoRead!: boolean;
    articleRead!: boolean;
    blogRead!: boolean;
    galleryRead!: boolean;

    noticeLists!: NoticeEntity;

    ngOnInit() {
        this.allRead = false;
        this.audioRead = false;
        this.videoRead = false;
        this.articleRead = false;
        this.blogRead = false;
        this.galleryRead = false;
        this.noticeLists = createNoticeData(8);
        this.count = this.noticeLists.audio.length + this.noticeLists.video.length
            + this.noticeLists.article.length + this.noticeLists.blog.length + this.noticeLists.gallery.length;
    }

    listenTabChange(change: MatTabChangeEvent): void {
        if (!this.allRead) {
            switch (change.index) {
                case 0:
                    this.audioRead = true;
                    this.count -= this.noticeLists.audio.length;
                    break;
                case 1:
                    this.videoRead = true;
                    this.count -= this.noticeLists.video.length;
                    break;
                case 2:
                    this.articleRead = true;
                    this.count -= this.noticeLists.article.length;
                    break;
                case 3:
                    this.blogRead = true;
                    this.count -= this.noticeLists.blog.length;
                    break;
                case 4:
                    this.galleryRead = true;
                    this.count -= this.noticeLists.gallery.length;
            }

            this.allRead = this.count === 0;
        }
    }

    handleAllReadEvent(event: MouseEvent): void {
        event.stopImmediatePropagation();
        event.stopPropagation();
        this.allRead = true;
        this.audioRead = true;
        this.videoRead = true;
        this.articleRead = true;
        this.blogRead = true;
        this.galleryRead = true;
    }

}