import { AfterViewInit, Component, ElementRef, Inject, Renderer2, TemplateRef, ViewChild, ViewContainerRef } from "@angular/core";

import { NGXSeasonModalContainerComponent } from "src/app/components/modal/modal.component";

import { NGX_SEASON_MODAL_DATA_TOKEN, NGXSeasonModalConfig, NGXSeasonModalRef, NGXSeasonModalService, NGXSeasonModalSize } from "src/app/components/modal/modal.service";

type MetaInfo = { title: string, subtitle: string, contents: string[] };

@Component({
    selector: 'ngx-sui-demo-modal-container',
    template: `
        <div ngx-sui-ModalHeader>
            <ngx-sui-icon iconShape="document" iconSize="xxl"></ngx-sui-icon>
            <div class="flex flex-dir-col ml-50">
                <span class="fs-16 fw-900">{{ _data.title }}</span>
                <span class="fs-12 fw-500">{{ _data.subtitle }}</span>
            </div>
        </div>
        <div ngx-sui-ModalContent ngx-sui-Scrollbar scrollBarAxis="xy-axis" class="gy-100">
            <div *ngFor="let content of _data.contents">{{ content }}</div>
        </div>
        <div ngx-sui-ModalFooter>
            <button ngx-sui-SolidTextButton btnColor="primary" btnIcon="check" (click)="_modalRef.dismiss('confirm')">确定</button>
            <button ngx-sui-SolidTextButton btnColor="accent" btnIcon="times" (click)="_modalRef.dismiss('cancel')">取消</button>
        </div>
    `
})
export class DemoModalContainerComponent extends NGXSeasonModalContainerComponent implements AfterViewInit {

    constructor(
        protected override _element: ElementRef,
        protected override _renderer: Renderer2,

        protected _modalRef: NGXSeasonModalRef,

        @Inject(NGX_SEASON_MODAL_DATA_TOKEN)
        protected _data: MetaInfo
    ) {
        super(_element, _renderer);
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'demo-modal-container');
    }

}

@Component({
    selector: 'ngx-sui-demo-modal-page',
    templateUrl: './modal.component.html'
})
export class DemoModalPageComponent {

    @ViewChild('template', { read: TemplateRef })
    private template: TemplateRef<any> | undefined;

    protected title: string = '变形金刚：超能勇士';
    protected subtitle: string = '别名：野兽之战、野兽大战、特种变形勇士（港）、猛兽侠';
    protected contents: string[] = [
        `在赛博坦星球内战结束约数世纪后，汽车人（Autobot）和霸天虎（Decepticon）分别演化为巨无霸（Maximal）和原始兽（Predacon）。一位与霸天虎领袖同名的原始兽将军——威震天（Megatron）和其他5个原始兽成员偷走了能指出主要能源所在地的金盘，并驾驶飞船（黑暗星舰）追随金盘上的信息，运用超时空跳跃来到金盘指定的时空，威震天（Megatron）希望有足够的能量能使原始兽称霸宇宙，以擎天圣（Optimus Primal）为首的巨无霸科学探索小队接到命令进行拦截。威震天不顾星际法律，强行进行超时空跳跃，双方坠落在史前地球（起初双方都不知道这个星球就是地球）。双方都探测到了这个星球拥有很强的原生能量，但这种能量对他们有害。因为记载中没有提到这些能量，所以他们没有意识到这里是地球。为了抵抗能量的干扰，他们扫描地球生物，并以生物形态为变形形态。而这个星球的能量也导致了威震天的野心进一步膨胀，他开始率众原始兽掠夺能量。为了安全和生存，以擎天圣为首的巨无霸小队展开了反击。`,
        `随着战斗的深入，一些奇异的情况被发现，原来史前地球是外星人——沃克人（Vok）的试验场。外星人抓住了擎天圣，并对他进行了扫描。因为擎天圣是穿越时空来到这里，所以沃克人通过扫描看到了未来发生的事，连宇宙大帝都被他们击败了，于是沃克人心生恐惧，决定摧毁这里。天上的两个月亮之一开始变形，原来这是外星人的终极武器。擎天圣决定登上平衡舱去炸毁外星人的量子武器，但是中了狼蛛和威震天的计，擎天圣和外星人的武器一起被炸得粉碎，从而导致了一场量子风暴。后来，犀牛冒着生命危险将擎天圣的火种拉回，并植入一个空白的原生体，使擎天圣得以复活并成为了金属变体。`,
        `外星人消失了，但危机还没有解除。根据金盘的记载，人类帮助汽车人打败了霸天虎，而原始人类会在某个山谷中出现，生活在峡谷中的原始人就是人类的祖先。为了改变历史（未来），威震天决定消灭这些原始人!但在恐龙勇士（Dinobot）的努力下，原始人逃过了一劫。`,
        `更令人吃惊的还在后面，坠毁于史前地球上的汽车人飞船——方舟（the Ark）被发现了。至此，双方认定这就是史前地球。此时，汽车人还在方舟中沉睡。威震天摧毁了擎天柱（Optimus Prime）的头部，引起了超级时空风暴，企图改变历史。但犀牛和黄豹等人修复了擎天柱，保证了历史的正常发展。`,
        `斗争更复杂化了，Megatron（霸王龙）发现了坠毁在海洋深处的霸天虎/伪装兽战舰——报应号（Nemesis），并企图用这艘战舰摧毁方舟。千钧一发之际，巨无霸中的犀牛驾驶汽车人的救生飞船撞毁了报应号。装载着超时空程序的飞船再次发射了，巨无霸们踏上了回家的路程。而从报应号中脱身的Megatron（霸王龙）被固定在飞船的外面，和巨无霸们一起返回赛博坦星球……`
    ];

    constructor(
        private _vcr: ViewContainerRef,
        private _modal: NGXSeasonModalService
    ) {}

    handleOpenComponentModalEvent(): void {
        this._modal.display(DemoModalContainerComponent, undefined, this._vcr, { title: this.title, subtitle: this.subtitle, contents: this.contents });
    }

    handleOpenTemplateModalEvent(): void {
        if (this.template) this._modal.display(this.template, undefined, this._vcr, { title: this.title, subtitle: this.subtitle, contents: this.contents });
    }

    handleOpenDiffSizeModalEvent(size: NGXSeasonModalSize): void {
        const config: NGXSeasonModalConfig | undefined = this._modal.configBuilder().setupSize(size).build();
        this._modal.display(DemoModalContainerComponent, config, this._vcr, { title: this.title, subtitle: this.subtitle, contents: this.contents });

    }

    handleOpenDraggableModalEvent(select: 'template' | 'component'): void {
        const config: NGXSeasonModalConfig | undefined = this._modal.configBuilder().setupAllowDragDrop(true).build();

        if (select === 'template' && this.template) {
            this._modal.display(this.template, config, this._vcr, { title: this.title, subtitle: this.subtitle, contents: this.contents });
        }

        if (select === 'component') this._modal.display(DemoModalContainerComponent, config, this._vcr, { title: this.title, subtitle: this.subtitle, contents: this.contents });

    }

}
