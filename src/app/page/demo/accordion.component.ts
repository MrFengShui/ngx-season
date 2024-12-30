import { coerceNumberProperty } from "@angular/cdk/coercion";
import { Component } from "@angular/core";

import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";

type AccordionPanelMetainfo = { title: string, subtitle: string, contents: string[], toggled: boolean };

@Component({
    selector: 'ngx-sui-demo-accordion-page',
    templateUrl: './accordion.component.html',
    styles: `
        :host {
            .grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(384px, 1fr));
                grid-auto-flow: row;
            }
        }
    `
})
export class DemoAccordionPageComponent {

    protected list: Array<AccordionPanelMetainfo> = [
        {
            title: '魂斗罗（Contra）', subtitle: '由日本科乐美（Konami）公司于1987年推出的一款射击类单机游戏。',
            contents: [
                `魂斗罗是非常经典的游戏。因为它其中的很多关卡的内容吸收了1979年的美国科幻片《异形》的元素而深入人心。FC上的两部魂斗罗影响了整整一代游戏玩家，在当时与《超级马里奥》齐名，几乎成为FC时代电子游戏的代名词。此外KONAMI于1989年还在日式计算机MSX2上推出了大型游戏机的同名移植版。游戏的英文名叫做Contra，译成日本语就是コントラ而コン，ト，ラ三个词在日语中对应的日文汉字就是“魂斗罗”。“魂斗罗”的含义是“具有优秀战斗能力和素质的人”，它是赋予最强战士的称呼。这段话出现在日本魂斗罗的开场画面之中。因为当年国内几乎都是美版魂斗罗，所以看过这句话的人很少。`,
                `公元2631年，一颗陨石坠落在新西兰附近的Galuga群岛，两年以后，海军总部得到消息说一个叫做“红隼”的武装组织开始把该群岛地区修建成一个发动 异型侵略战争的基地，Contra成员比尔·雷泽Bill Rizer（ビル・ライザー1P）和兰斯·比恩Lance Bean（ランス・ビーン 2P）被送去破坏对方的计划。这次行动获得圆满成功，但是海军部门将有关这次事件的信息作为高度机密，完全未向大众公布。`
            ],
            toggled: false
        },
        {
            title: '赤色要塞（Jackal）', subtitle: '由日本科乐美（Konami）公司于1988年推出的一款动作射击游戏。',
            contents: [
                `当初名为“Jackal”（豺狼部队）的游戏被翻译成“赤色要塞”，是因为同年发售的日本任天堂磁碟机版的名字是“FINAL COMMAND:red fortress”（最终命令:赤色要塞）。于是，“赤色要塞”这个我们耳熟能详的名字就这样被保留下来了，并传入了国内，成为了许许多多人童年时难忘的一段记忆。`,
                `剧情中，玩家的战友被关押在敌方战线，你是他们重获自由的唯一希望。然而，要解救他们，你要面对的火力非常密集。解救敌方大楼里关押的战俘！你需要用豺狼般的凶猛（the ferocity of a wild Jackal）来创造奇迹！解救人质的勇士有：Decker上校、Bob中尉、Quint军士、Grey下士。这是一场让你热血沸腾的战斗！此游戏不仅在红白机平台，在后来的街机平台上也推出了更新的版本，游戏难度更为加大。`,
                `游戏中玩家开着一辆吉普车与敌人作战，可以进行解救人质。游戏过程中，玩家开战车驶入敌方，与敌方作战，遇见牢房，则解救人质，在指定直升机场将人质送到接应直升机。每一关的末尾都要经过一场激烈的战斗才能进入下一关。有多个场景与不同的武器，解救人质或者获取积分宝物时，火力会增强，游戏紧张好玩。赤色要塞是风靡20世纪90年代的一个经典游戏。`
            ],
            toggled: true
        },
        {
            title: '绿色兵团（Green Beret）', subtitle: '由日本科乐美（Konami）公司于1987年推出的一款FC红白机游戏',
            contents: [
                `游戏不论是人物设定、场景设定以及是任务等等都有着深厚的冷战时代色彩（比如第二关、第四关、第六关敌人的红军毡帽；第一关背景的雪山以及第四关、第五关背雪松，这些都有着鲜明的苏联特色。而最后要摧毁的那座核弹装置，更是折射冷战时代美苏双方争端的焦点——核武器）。游戏中你肩负摧毁敌人秘密武器的使命，随身携带一把刺刀（匕首），深入敌军内部，与敌人周旋作战。正因为具有这个特征，中国大陆很多资深玩家曾冠名该游戏为“拼刀子”。`
            ],
            toggled: true
        },
        {
            title: '沙罗曼蛇（Salamendar）', subtitle: '由日本科乐美（Konami）公司于20世纪80年代推出的一款射击游戏',
            contents: [
                `在美丽的格兰迪斯星球上，有一个自古相传的预言：说是在行星1000光年的宇宙中，有一片火海，在火海中栖息着巨大的火龙。当火龙狂舞时，天地将笼罩在一片黑暗中，邪恶将降临格兰迪斯星球。正如预言所述，从火海中飞来的沙罗曼蛇军对格艾帝士星球发动了侵略战争。为了消灭侵略者，格兰迪斯星球上的超时空宇宙巡航机身负重任，向沙罗曼蛇军事基地出击！（美版）`,
                `古拉迪乌斯历6709年。巴库蒂利安星派出了《沙罗曼蛇军团》，开始向美丽的拉迪斯行星发起进攻。面对《沙罗曼蛇军团》的强大攻势，拉迪斯军队显得毫无抵抗能力。拉迪斯的王子亲自率领军队与之对抗，却大败而归。迫不得已，拉迪斯行星向曾经击败过巴库蒂利安的古拉迪乌斯行星发出了求援信号。接到了信号的古拉迪乌斯勇士们，与拉迪斯王子驾驶的战斗机一起，向巴库蒂利安的基地发起了反击。（日版）`,
                `FC（俗称红白机，由日本任天堂公司开发的8位游戏机）游戏，与魂斗罗、赤色要塞、绿色兵团并誉为“四强”，风靡整个八十年代，为诸多80前玩家们所津津乐道。对于初上手的玩家来讲，这个游戏的难度偏大。`,
                `沙罗曼蛇是早期飞行类游戏中的经典之作。游戏中玩家控制一架飞机，与敌人战斗。通过得取能量箱，可改变自己的武器。敌人依关卡提升而变得越发强悍，最后一关是一只守卫敌人核心系统的龙形怪物。击败它，并摧毁敌人的核心系统后，飞行速度会陡然提升，以逃出即将爆炸的星球。途中会遇到大量自动伸展的防御系统拦截，令人眼花缭乱。躲过这一劫，游戏即通关。`
            ],
            toggled: false
        }
    ];
    protected colors: NGXSeasonColorPalette[] = ['default', 'primary', 'accent', 'success', 'warning', 'failure', 'info', 'help'];
    protected selectedIndex: number = 0;
    protected showToggleIcon: boolean = true;

    protected handlePrevNextStepEvent(flag: 'inc' | 'dec'): void {
        if (flag === 'dec') this.selectedIndex = Math.max(this.selectedIndex - 1, 0);

        if (flag === 'inc') this.selectedIndex = Math.min(this.selectedIndex + 1, this.list.length - 1);
    }

    protected handleSelectPanelEvent(index: number): void {
        this.selectedIndex = index;
    }

}
