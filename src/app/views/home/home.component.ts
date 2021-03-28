import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSidenavContainer, MatSidenavContent } from "@angular/material/sidenav";
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { filter, map } from "rxjs/operators";

import { SidenavRouterEntity } from "src/app/models/sidenav.model";

import { HomeSidenavService } from "src/app/services/home.service";
import { WidgetsChatServiceComponent } from "src/app/widgets/chat/service.component";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {

    @ViewChild('container', { read: ElementRef, static: true })
    container!: ElementRef<MatSidenavContainer | any>;

    @ViewChild('content', { read: ElementRef, static: true })
    content!: ElementRef<MatSidenavContent | any>;

    checked!: boolean;
    flag!: boolean;
    searchInput!: string;
    height!: number;
    longList!: SidenavRouterEntity[];
    shortList!: SidenavRouterEntity[];

    serviceSub!: Subscription;
    dialogSub!: Subscription;

    constructor(
        private cdr: ChangeDetectorRef,
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private router: Router,
        private sidenavService: HomeSidenavService
    ) {
        this.router.events.pipe(
            filter(value => value instanceof NavigationEnd),
            map(value => this.route)
        ).subscribe(event => {
            const child: ActivatedRouteSnapshot = event.snapshot.children[0];
            const path: string = child.url[0].path;
            this.checked = path === 'audio' || path === 'video' || path === 'article' || path === 'blog' || path === 'gallery';
        })
    }

    ngOnInit() {
        this.flag = true;
        this.searchInput = '';
    }

    ngAfterViewInit() {
        this.serviceSub = this.sidenavService.getNavlink('assets/data/navlink.data.json').subscribe(list => {
            this.longList = list;
            this.shortList = this.formatShortList(list);
        });
    }

    ngAfterViewChecked() {
        const clientHeight = this.container.nativeElement.clientHeight;

        if (clientHeight != this.height) {
            this.height = clientHeight;
            this.cdr.detectChanges();
        }

        this.cdr.markForCheck();
    }

    ngOnDestroy() {
        if (this.serviceSub !== undefined) {
            this.serviceSub.unsubscribe();
        }

        if (this.dialogSub !== undefined) {
            this.dialogSub.unsubscribe();
        }
    }

    private formatShortList(list: SidenavRouterEntity[]): SidenavRouterEntity[] {
        let entities: SidenavRouterEntity[] = [];
        entities.push(list[0]);
        entities.push(new SidenavRouterEntity(true));
        entities.push(list[6]);
        return entities;
    }

    handleScrollTopEvent(event: MouseEvent): void {
        let offset = this.content.nativeElement.scrollTop;

        if (offset > 0) {
            this.content.nativeElement.scrollTop = 0;
        }
    }

    handleScrollBottomEvent(event: MouseEvent): void {
        let offset = this.content.nativeElement.scrollTop;
        let delta = this.content.nativeElement.scrollHeight - this.content.nativeElement.clientHeight;

        if (offset < delta) {
            this.content.nativeElement.scrollTop = delta;
        }
    }

    handleChatServiceEvent(event: MouseEvent): void {
        let cdr: MatDialogRef<WidgetsChatServiceComponent> = this.dialog.open(WidgetsChatServiceComponent, {
            hasBackdrop: false,
            position: {
                bottom: '0',
                right: '0'
            },
            width: '480px'
        });
        cdr.addPanelClass(['popup-dialog']);
        this.dialogSub = cdr.afterClosed().subscribe(flag => console.log('Online Service Closed'));
    }

}