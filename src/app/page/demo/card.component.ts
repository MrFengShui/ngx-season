import { Component } from "@angular/core";

interface CardMetaInfo {

    avatar: string;
    subject: string;
    description: string;

    image: string;
    video: string;
    frame: string;

    first: string[];
    second: string[];

};

@Component({
    selector: 'ngx-sui-demo-card-page',
    templateUrl: './card.component.html'
})
export class DemoCardPageComponent {

    protected metainfo: CardMetaInfo = {
        avatar: 'assets/test/card-avatar.png', subject: `赤色要塞`, description: `KONAMI出品的FC游戏`,
        image: 'assets/test/card-image.jpg', video: 'assets/test/card-video.mp4',
        frame: '//player.bilibili.com/player.html?isOutside=true&aid=113495869888154&bvid=BV1wpUzYGErk&cid=26800751376&p=1',
        first: [
            `《赤色要塞》（Jackal）是由日本KONAMI公司研发并发行的一款动作射击游戏，于1988年9月在中国大陆发售。`,
            `游戏设定在敌对阵营的严密防线中，玩家扮演勇敢的战士，驾驶吉普车解救被关押的战友，对抗强大的敌军火力。游戏剧情紧张刺激，玩法多样，从丛林基地到核心基地，每一关都充满挑战。除了丰富的关卡设计，游戏还提供了多种武器和升级系统。`,
            `该游戏与《魂斗罗》、《绿色兵团》、《沙罗曼蛇》并誉为“四强”，风靡整个80年代。`
        ],
        second: [
            `当初名为“Jackal”（豺狼部队）的游戏被翻译成“赤色要塞”，是因为同年发售的日本任天堂磁碟机版的名字是“FINAL COMMAND:red fortress”（最终命令:赤色要塞）。于是，“赤色要塞”这个我们耳熟能详的名字就这样被保留下来了，并传入了国内，成为了许许多多人童年时难忘的一段记忆。`,
            `剧情中，玩家的战友被关押在敌方战线，你是他们重获自由的唯一希望。然而，要解救他们，你要面对的火力非常密集。解救敌方大楼里关押的战俘！你需要用豺狼般的凶猛（the ferocity of a wild Jackal）来创造奇迹！解救人质的勇士有：Decker上校、Bob中尉、Quint军士、Grey下士。这是一场让你热血沸腾的战斗！此游戏不仅在红白机平台，在后来的街机平台上也推出了更新的版本，游戏难度更为加大。`,
            `游戏中玩家开着一辆吉普车与敌人作战，可以进行解救人质。游戏过程中，玩家开战车驶入敌方，与敌方作战，遇见牢房，则解救人质，在指定直升机场将人质送到接应直升机。每一关的末尾都要经过一场激烈的战斗才能进入下一关。有多个场景与不同的武器，解救人质或者获取积分宝物时，火力会增强，游戏紧张好玩。赤色要塞是风靡20世纪90年代的一个经典游戏。`
        ]
    };

}
// <iframe src="//player.bilibili.com/player.html?isOutside=true&aid=113495869888154&bvid=BV1wpUzYGErk&cid=26800751376&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="false"></iframe>
// <iframe src="//player.bilibili.com/player.html?isOutside=true&aid=955090413&bvid=BV1uW4y1D7Kh&cid=1170284140&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
