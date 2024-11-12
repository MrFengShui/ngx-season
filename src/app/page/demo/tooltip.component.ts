import { Component } from "@angular/core";

@Component({
    selector: 'ngx-sui-demo-tooltip-page',
    templateUrl: './tooltip.component.html'
})
export class DemoTooltipPageComponent {

    // protected message: string = `在赛博坦星球内战结束约数世纪后，汽车人（Autobot）和霸天虎（Decepticon）分别演化为巨无霸（Maximal）和原始兽（Predacon）。一位与霸天虎领袖同名的原始兽将军——威震天（Megatron）和其他5个原始兽成员偷走了能指出主要能源所在地的金盘，并驾驶飞船（黑暗星舰）追随金盘上的信息，运用超时空跳跃来到金盘指定的时空，威震天（Megatron）希望有足够的能量能使原始兽称霸宇宙，以擎天圣（Optimus Primal）为首的巨无霸科学探索小队接到命令进行拦截。威震天不顾星际法律，强行进行超时空跳跃，双方坠落在史前地球（起初双方都不知道这个星球就是地球）。双方都探测到了这个星球拥有很强的原生能量，但这种能量对他们有害。因为记载中没有提到这些能量，所以他们没有意识到这里是地球。为了抵抗能量的干扰，他们扫描地球生物，并以生物形态为变形形态。而这个星球的能量也导致了威震天的野心进一步膨胀，他开始率众原始兽掠夺能量。为了安全和生存，以擎天圣为首的巨无霸小队展开了反击。`;
    protected message: string = `野兽之战、野兽大战、特种变形勇士（港）、猛兽侠`;
    protected showDelay: number = 1000;
    protected hideDelay: number = 3000;

}