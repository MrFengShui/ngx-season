import { Component } from "@angular/core";
import { NGXSeasonAlertColorPalette } from "src/app/utils/palette.utils";

@Component({
    selector: 'ngx-sui-demo-alert-page',
    templateUrl: './alert.component.html'
})
export class DemoAlertPageComponent {

    protected colors: NGXSeasonAlertColorPalette[] = [ 'success', 'warning', 'failure', 'info', 'help' ];
    protected message: string = `《绿色兵团》是一款由日本KONAMI（科乐美）公司推出的任天堂FC（俗称红白机，由日本任天堂公司开发的8位游戏机）游戏，与魂斗罗、赤色要塞、沙罗曼蛇并誉为“四强”，风靡整个八十年代，为诸多80后玩家们所津津乐道。对于初上手的玩家来讲，这个游戏的难度偏大。`;
    protected notice: string = `本站已添加《绿色兵团》，点击右边“下载“按钮下载该游戏`;
    protected subject: string = `绿色兵团`;
    protected description: string = `《绿色兵团》是一款由日本KONAMI（科乐美）公司推出的任天堂FC红白机游戏，发行日期为1987年4月10日。游戏的背景设定在冷战时期，玩家扮演一名特种兵，目标是穿越敌人防线，通过六个关卡，最终炸毁敌方的核武器装置。玩家在游戏中使用的主要武器是一把刺刀，可以与敌人进行近战。游戏的核心玩法包括战斗、潜行和解谜，玩家需要在不同的关卡中利用各种策略和技巧来击败敌人。关卡设计包括雪地、军事基地和丛林等，每个关卡都有其独特的敌人和挑战。游戏不论是人物设定、场景设定以及是任务等等都有着深厚的冷战时代色彩（比如第二关、第四关、第六关敌人的红军毡帽；第一关背景的雪山以及第四关、第五关背雪松，这些都有着鲜明的苏联特色。而最后要摧毁的那座核弹装置，更是折射冷战时代美苏双方争端的焦点——核武器）。游戏中你肩负摧毁敌人秘密武器的使命，随身携带一把刺刀（匕首），深入敌军内部，与敌人周旋作战。正因为具有这个特征，中国大陆很多资深玩家曾冠名该游戏为“拼刀子”。`;
    protected closible: boolean = false;
    protected disabled: boolean = true;
    protected indented: boolean = false;

}
