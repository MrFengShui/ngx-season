import {animate, state, style, transition, trigger} from "@angular/animations";
import {Component, HostBinding, Input, OnInit} from "@angular/core";
import {FlatTreeControl, NestedTreeControl} from "@angular/cdk/tree";
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {ArrayDataSource, DataSource} from "@angular/cdk/collections";

export type OctopusFlatTreeNode = {expanded?: boolean, expandable: boolean, level: number, text: string};
export type OctopusNestTreeNode = {children?: OctopusNestTreeNode[], text: string};

@Component({
    animations: [
        trigger('SHOW_HIDE', [
            state('show', style({transform: 'rotate(0deg)'})),
            state('hide', style({transform: 'rotate(-90deg)'})),
            transition('show <=> hide', animate('250ms linear'))
        ])
    ],
    template: ''
})
abstract class OctopusAbstractTree {

    @Input('octoHasIcon')
    get hasIcon() {return this._hasIcon;}
    set hasIcon(_hasIcon: any) {this._hasIcon = coerceBooleanProperty(_hasIcon);}
    private _hasIcon: boolean = false;

    @Input('octoNodeIcon') nodeIcon: string = 'assets/file.png';
    @Input('octoShowIcon') showIcon: string = 'assets/folder-open.png';
    @Input('octoHideIcon') hideIcon: string = 'assets/folder-close.png';

    @HostBinding('class') class: string = 'octo-tree';

}

@Component({
    selector: 'octo-flat-tree',
    template: `
        <cdk-tree [dataSource]="source" [treeControl]="control">
            <cdk-tree-node *cdkTreeNodeDef="let node" cdkTreeNodePadding="" cdkTreeNodePaddingIndent="24"
                           [style.display]="check(node) ? 'flex' : 'none'"
                           class="octo-tree-node sx-25">
                <div style="visibility: hidden;width: 2rem;height: 2rem;"></div>
                <img [src]="nodeIcon" alt="" width="24" height="24" *ngIf="hasIcon">
                <span class="flex-fill">{{node.text}}</span>
            </cdk-tree-node>
            <cdk-tree-node *cdkTreeNodeDef="let node; when: hasChild" cdkTreeNodePadding="" cdkTreeNodePaddingIndent="24"
                           [style.display]="check(node) ? 'flex' : 'none'"
                           class="octo-tree-node sx-25">
                <button octo-btn octoShape="ring" cdkTreeNodeToggle style="width: 2rem;height: 2rem;"
                        [style.visibility]="node.expandable ? 'visible' : 'hidden'"
                        (click)="node.expanded = !node.expanded">
                    <octo-icon [@SHOW_HIDE]="node.expanded ? 'show' : 'hide'">expand_circle_down</octo-icon>
                </button>
                <img [src]="node.expanded ? showIcon : hideIcon" alt="" width="24" height="24" *ngIf="hasIcon">
                <span class="flex-fill">{{node.text}}</span>
            </cdk-tree-node>
        </cdk-tree>
    `
})
export class OctopusFlatTree extends OctopusAbstractTree implements OnInit {

    @Input('octoData') data: OctopusFlatTreeNode[] = [];

    source!: DataSource<OctopusFlatTreeNode>;
    control!: FlatTreeControl<OctopusFlatTreeNode>;

    ngOnInit() {
        this.source = new ArrayDataSource<OctopusFlatTreeNode>(this.data);
        this.control = new FlatTreeControl<OctopusFlatTreeNode>(
            node => node.level,
            node => node.expandable
        );
    }

    hasChild(_: number, node: OctopusFlatTreeNode): boolean {
        return node.expandable;
    }

    getParentNode(node: OctopusFlatTreeNode): OctopusFlatTreeNode | null {
        for (let i = this.data.indexOf(node) - 1; i >= 0; i--) {
            if (this.data[i].level === node.level - 1) {
                return this.data[i];
            }
        }

        return null;
    }

    check(node: OctopusFlatTreeNode) {
        let parent: OctopusFlatTreeNode | null = this.getParentNode(node);

        while (parent) {
            if (!parent.expanded) {
                return false;
            }

            parent = this.getParentNode(parent);
        }

        return true;
    }

}

@Component({
    selector: 'octo-nest-tree',
    template: `
        <cdk-tree [dataSource]="source" [treeControl]="control">
            <cdk-nested-tree-node *cdkTreeNodeDef="let node" class="octo-tree-node sx-25" style="display: flex">
                <div style="visibility: hidden;width: 2rem;height: 2rem;"></div>
                <img [src]="nodeIcon" alt="" width="24" height="24" *ngIf="hasIcon">
                <span>{{node.text}}</span>
            </cdk-nested-tree-node>
            <cdk-nested-tree-node *cdkTreeNodeDef="let node; when: hasChild">
                <div class="octo-tree-node sx-25" style="display: flex">
                    <button octo-btn octoShape="ring" cdkTreeNodeToggle style="width: 2rem;height: 2rem;">
                        <octo-icon [@SHOW_HIDE]="control.isExpanded(node) ? 'show' : 'hide'">expand_circle_down</octo-icon>
                    </button>
                    <img [src]="node.expanded ? showIcon : hideIcon" alt="" width="24" height="24" *ngIf="hasIcon">
                    <span class="flex-fill">{{node.text}}</span>
                </div>
                <div style="box-sizing: border-box;padding-left: 24px;"
                     [style.display]="control.isExpanded(node) ? 'block' : 'none'">
                    <ng-container cdkTreeNodeOutlet></ng-container>
                </div>
            </cdk-nested-tree-node>
        </cdk-tree>
    `
})
export class OctopusNestTree extends OctopusAbstractTree implements OnInit {

    @Input('octoData') data: OctopusNestTreeNode[] = [];

    source!: DataSource<OctopusNestTreeNode>;
    control!: NestedTreeControl<OctopusNestTreeNode>;

    ngOnInit() {
        this.source = new ArrayDataSource<OctopusNestTreeNode>(this.data);
        this.control = new NestedTreeControl<OctopusNestTreeNode>(node => node.children);
    }

    hasChild(_: number, node: OctopusNestTreeNode) {
        return !!node.children && node.children.length > 0;
    }

}
