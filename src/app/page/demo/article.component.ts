import { Component } from "@angular/core";

import { NGXSeasonArticleReferenceMetainfo, NGXSeasonArticleWidgetName } from "src/app/components/article/article.component";

interface ArticlePageMetainfo {

    type: NGXSeasonArticleWidgetName;
    text?: string;
    figures?: Array<{ figSrc: string, figAlt: string, caption: string }>;
    list?: NGXSeasonArticleReferenceMetainfo[];

}

@Component({
    selector: 'ngx-sui-demo-article.page',
    templateUrl: './article.component.html'
})
export class DemoArticlePageComponent {

    protected list: Array<ArticlePageMetainfo> = [
        { type: 'title', text: `宇宙大帝` }, { type: 'subtitle', text: `《变形金刚》系列作品的毁灭之神` },
        { type: 'heading', text: `角色简介` },
        {
            type: 'paragraph',
            text: `宇宙大帝（Unicron），科幻IP《变形金刚》系列的反派人物。变形金刚系列中的混沌、毁灭与黑暗之神，变形金刚历史上最强大最可怕的敌人。在1986年上映的动画影片《变形金刚大电影》、日版《雷霆舰队》、《超能链接》、《银河之力》等变形金刚邪神三部曲系列以及真人电影系列的《变形金刚5:最后的骑士》《变形金刚7:超能勇士崛起》中，宇宙大帝都曾作为终极反派现身。`
        },
        {
            type: 'paragraph',
            text: `宇宙大帝是超越时空、超越次元的创世神级存在，代表着“黑暗”、“混沌”与“毁灭”，是混沌之主，毁灭的化身，象征着熵与混沌的终极力量，与变形金刚的创造者，象征“光明”，“秩序”和“创造”的元始天尊是彼此相反的宿敌。其为所有世界、所有时代的最大威胁，象征邪恶的基本宇宙力量，与元始天尊共同构成了无限多元宇宙时空链条的正反两个方面。宇宙大帝本身即等同于混沌和毁灭，是这一概念的具象化存在，其唯一目标就是让所有的宇宙都归为初始的混沌状态。`
        },
        {
            type: 'paragraph',
            text: `关于宇宙大帝的起源有多种说法，在G1动画中其躯体是由至尊太君（Primacron）所创造。`
        },
        { type: 'heading', text: `角色背景` },
        {
            type: 'paragraph',
            text: `关于宇宙大帝的起源有多种说法，在G1动画中其躯体是由至尊太君（Primacron）所创造。有种说法是宇宙大帝作为混沌化身的能量体，原本为善恶合一的整体，后被至尊太君将其善良的部分分离出来造成元始天尊(Primus)，宇宙大帝（Unicron）则成为邪恶的化身，与其弟元始天尊成为宿敌。`
        },
        {
            type: 'paragraph',
            text: `宇宙大帝，是超越时空、超越次元的无限多元宇宙的创世神级存在，毁灭、混沌、黑暗等概念的实体化，是超越永恒的无限多元宇宙的奇点般的存在，无论哪个宇宙中出现的宇宙大帝均为同一人物，是变形金刚系列中最强大、最凶恶的敌人，代表着“黑暗”、“混沌”与“毁灭”，是混沌之主，毁灭的化身，象征着熵与混沌的终极力量，是象征邪恶的基本宇宙力量。宇宙大帝能够在平行宇宙之间任意来往并可对时空造成不可修复的破坏性影响，也是贯穿所有变形金刚系列里所有世界所有时代的最大威胁，被称为“变形金刚史上最凶之敌”（トランスフォーマー史上最凶の敌） ，拥有无限的毁灭力和创造力，是和变形金刚种族创造者——元始天尊同等的毁灭、混沌与暗黑之神，毁灭的掌控者，混沌的具象化，暗之神灵的实体化存在，象征着熵与混沌的终极力量，是最初的混乱之神和至纯的毁灭之力。宇宙大帝是混沌之主，毁灭的化身，象征着熵与混沌的终极力量，宇宙大帝就等于混沌和毁灭这一概念本身，每一次的毁灭都只会使宇宙大帝更加强大，据不完全估计，已知的世界中已有约22.26%的平行无限多元宇宙被宇宙大帝所吞噬，其本体形态已无法探知，据称早已超越了物理法则所能描述的形态，我们能够看到的宇宙大帝的不同实体仅仅是其本体无限分割后分散在不同平行宇宙的投影的一个个载体或者分身。`
        },
        {
            type: 'paragraph',
            text: `宇宙大帝和元始天尊都是多元宇宙的奇点，是独一无二的，也都是唯一的，宇宙大帝只存在于一个宇宙中，他能够在多元宇宙中随意穿梭。而元始天尊同时存在于所有平行宇宙之中。元始天尊和宇宙大帝代表着宇宙中的两种基本概念-善与恶、秩序与混沌-他们的存在是多元宇宙稳定、平衡的必然。宇宙大帝是宇宙中邪恶和混沌的化身，是最强大的存在，曾吞噬过22.56%的多元宇宙。宇宙大帝经常与宇宙中的生命做交易，赋予他们巨大的力量，换取对他们的奴役。这些奴仆有些被完全剥夺了自由意志，有些则是心甘情愿为宇宙大帝服务。宇宙大帝的最终目的是结束一切造物，使宇宙成为虚空。而他也只有一个克星，就是元始天尊的本质，因为作为混沌和无创造的化身，生命的源泉是一种毒药。如果没有元始天尊，宇宙大帝已经毁灭了整个无限多元宇宙。最强大的变形金刚是宇宙大帝和元始天尊，他们是宇宙善与恶、秩序与混沌的化身，代表着宇宙的平衡。`
        },
        {
            type: 'figure',
            figures: [
                { figSrc: 'assets/test/image_011.jpg', figAlt: 'assets/test/image_011.jpg', caption: '插图（一）' },
                { figSrc: 'assets/test/image_015.jpg', figAlt: 'assets/test/image_012.jpg', caption: '插图（二）' },
                { figSrc: 'assets/test/image_013.jpg', figAlt: 'assets/test/image_013.jpg', caption: '插图（三）' }
            ]
        },
        {
            type: 'paragraph',
            text: `在其他版本中也有说是在时间开始之前，宇宙大帝以不定型的混沌能量形态存在着。在大爆炸（Big Bang）创造宇宙之后，混沌这个状态和概念本身获得了形体并产生了知觉，与之相对应的产生了宇宙大帝。他唯一的目标就是毁灭多次元宇宙及其秩序。而秩序的具体体现，就是其兄弟兼宿敌元始天尊和他所变形成的塞伯坦。在元始天尊把塞伯坦星球改造为防御系统并创造变形金刚的同时，宇宙大帝也把自己变形为可怕的移动星球形态。这个黑暗君王为了寻找元始天尊而不停破坏着宇宙，直到某一天他突然停止。`
        },
        {
            type: 'paragraph',
            text: `在早期的美版和英版漫画里受到普遍支持的说法是“神”，宇宙大帝是一个在时空最初就已经存在的混乱，象征毁灭这个概念的本身，一切生命之敌，元祖漫画设定在这个多元宇宙形成之前，还有一个大宇宙。当这个旧的大宇宙被宇宙大帝毁灭之后，只剩下一片完全的空虚，宇宙大帝则进入了沉睡。但是上个宇宙所残留的碎片彼此间发生了反应，而形成了的多元宇宙。为了不让这个多元宇宙被宇宙大帝摧毁，大宇宙的意识创造了元始天尊来保护这个宇宙。而宇宙大帝也因为新的多元宇宙形成，所以醒了过来，开始破坏多元宇宙，直到两人正式碰面开战为止。因此从远古时期开始宇宙大帝与元始天尊便是宿敌，在宇宙诞生之前就已经是敌人并且在某个精神界（隔离于宇宙的“灵之次元”（Astral Plane））中展开永无休止的战争，战斗转移到了物质世界。后来元始天尊在一次战斗中预感到自己无法通过正面战斗直接对抗宇宙大帝，便在宇宙大帝追杀自己的时候将宇宙大帝诱离至现实宇宙的一颗行星上，同时自己也附身于一颗星球，将宇宙大帝与自己分别封印在这两颗星球之中。战争的最后元始天尊封印了宇宙大帝的元神，自己也被封印在一颗行星中，并用力量将它改造为一颗机械星球——塞伯坦，宇宙大帝在这段时间中也做了相同的事情。随着时间的推进，宇宙大帝也渐渐可以操纵星球变化而成的自己的身体，成为了第一个变形金刚，而因为二者之间存在的微妙联系，被元始天尊所附身的星球则出现了由元始天尊所创造的变形金刚，这也是为什么它看起来像是一个巨大的变形金刚，实际上那只是他伟大的精神的容器而已。此外，宇宙大帝是不死的，就像不能杀死毁灭本身一样，神对于他来讲更像是一个敬称而不是某种非常正式的称呼，他唯一的弱点就是领导模块。汽车人曾经观察到宇宙大帝在他们的宇宙之外的活动——他毁灭并吃掉了整整七个宇宙。此外，宇宙大帝的体型是不定的，出场过的本体最小形象相当于地球星核大小，也可以巨大到伸手便触及宇宙的边缘。`
        },
        {
            type: 'paragraph',
            text: `宇宙大帝在《变形金刚官方终极指南》的解释是这样子的：洪荒之初，众神的清晨。被后世称作“救世主”的那个来自于某个异空间的实体。为了探索新生的宇宙（这里的宇宙应该是运用了“平行宇宙（Altiernate Universe）”原理，即所处的宇宙会因为其中的物质的分子水平上的不同的变化而分化出相对应的宇宙），先后创造了两个使者以为先驱：第一个就是宇宙大帝；第二个则是元始天尊。此二人穿梭往来，探索了无数的平行宇宙中，也将无数的尚处在混沌之中的世界带去了文明之光。月光如流水一般照在这一片和那一片叶子上……然而，随着时光的推移，质检跟踪报告记载：宇宙大帝在随后的使用中被证明是个次品。事实上，宇宙大帝内心对力量的渴求让他堕入魔道。两个变形金刚世界的先驱就这样割席分座，继而刀剑相向，同室操戈。这是一场星球级的较量，战场跨越N个时空。战斗中，宇宙大帝根据自己的星球形态变形成机器人形态；而元始天尊虽然也可以变形成机器人形态，但是他似乎“球形爱用”——一个由星球涡轮推动的球，被后世的蓝星人称作“塞伯坦”的那个球。元始天尊创造的十三使徒之一的震天尊，史称“堕落金刚（The Fallen）”，背叛了元始天尊，投入了宇宙大帝麾下。`
        },
        {
            type: 'paragraph',
            text: `宇宙大帝的说法是宇宙大帝是一股在宇宙生成时的原始邪恶力量，带领着黑暗神军与元始天尊所带领的光明神族展开战斗。此外，宇宙大帝本来是一名混沌之神，但他却渐渐的被自己的饥饿所吞噬，于是自称“世界的吞噬者”并且开始破坏宇宙。当其他的混沌之神发现时已经为时已晚。`
        },
        {
            type: 'figure',
            figures: [
                { figSrc: 'assets/test/image_012.jpg', figAlt: 'assets/test/image_012.jpg', caption: '插图（四）' },
                { figSrc: 'assets/test/image_014.jpg', figAlt: 'assets/test/image_014.jpg', caption: '插图（五）' }
            ]
        },
        {
            type: 'paragraph',
            text: `基本上Keeper的说法跟宇宙大帝的说法差不多。不过提到了元始天尊与宇宙大帝的战争一直打到了神明时代的末期。而元始天尊与宇宙大帝分别是两个神族的最后战士，而唯有打败别名"Chaos Bringer"的最后一名黑暗神宇宙大帝，元始天尊才能与其他的神明一样，在众神圣殿（Omniversal Matrix，类似希腊神话的奥林匹斯山或是北欧神话的英灵殿）中享有一席之地。`
        },
        {
            type: 'paragraph',
            text: `现今的官方设定宇宙刚成型的时候，宇宙的原始力量核心，也是秩序与混沌的源头，称为“The One”，因为出于对这新世界的好奇，因此创造了宇宙大帝来探索宇宙，可是宇宙大帝到了后来却成为了破坏神，此时为了阻止宇宙大帝，The One创造了元始天尊来保护宇宙。`
        },
        {
            type: 'paragraph',
            text: `根据2014年出版的领袖之证系列官方设定集《元始天尊圣约》（Covenantof Primus）中记载：造物主的灵运行在宇宙中，它没有名字，因为没有必要。在宇宙诞生了各种各样的生命之后，其觉醒了自我意识，由于没有交流对象，它产生了两个声音、两个人格，即宇宙大帝和元始天尊，由于他们是一体的两面无法分离，在各自具备实体后他们也一直共同游荡。但两个相反的人格却导致本为一体的二神产生了争执并最终引发了战斗。`
        },
        {
            type: 'paragraph',
            text: `宇宙大帝存在的唯一目的就是摧毁所有多元宇宙及其秩序，宇宙大帝不会停止，直到一切都归于混沌和最初的虚无。知晓他存在的生物们创造了各种词汇来代称他：黑暗之心、混沌之主、邪恶之源、永夜之王、虚无之子、万魔之宗、破坏之神……最常用的代称是混沌制造者Chaos Bringer以及行星食者Planet Eater，日版的称号则是星间帝王/星帝。（该称号并非名字，就像破坏大帝·威震天、总司令官·擎天柱一样，更近于一种地位的说明。）（迷友们经常以U球、幽帝来代称。）`
        },
        {
            type: 'paragraph',
            text: `而最近的镜像宇宙中也出现了宇宙大帝，但是此大帝是善良而正义的，和镜像原始天尊也一样是相反的存在。`
        },
        { type: 'heading', text: `角色形态` },
        { type: 'subheading', text: `人形形态` },
        {
            type: 'paragraph',
            text: `宇宙大帝首次出场于大电影，最初观众都认为他只是一个星球，然而即便如此也难掩他那邪恶的气息与恐怖的力量。小说中这个对塞伯坦虎视眈眈的星球设定为和土星大小相同。在行进途中他吞噬了一颗居住着高度发达文明的星球，所有一切美好祥和的景象转瞬间化为齑粉，成为维持着这颗恐怖星球正常运转的养料，而宇宙大帝吞噬了一切后亮起的光环更让人感受到他的无情与邪恶。`
        },
        {
            type: 'paragraph',
            text: `在汽车人与霸天虎们在地球上殊死战斗之后，宇宙大帝探测到了通天晓继承领导模块的一幕，宇宙大帝因此发出了愤怒的咆哮。因此宇宙大帝主动召唤了此时被霸天虎们抛弃后丢出大火车的身负重伤的威震天、惊天雷、闹翻天与机器昆虫们。宇宙大帝以自身可怕的力量迫使处于穷途末路的威震天臣服，随后回收了重伤的威震天并将其改造升级为惊破天，并将其他霸天虎改造为其新的部下——副官狂飙和瘟疫率领的扫荡队。闹翻天/炸弹变成了狂飙、惊天雷变成了瘟疫，炸弹/闹翻天被改造成了狂飙的舰队、弹片和反冲被改造成了扫荡队队员。并给予惊破天一艘新的飞船，命令其为自己摧毁领导模块，同时宇宙大帝也开始向塞伯坦进发，并吞噬了塞伯坦的两颗卫星和上面的汽车人，用自己强大无比的力量一直控制着惊破天等人替自己追杀汽车人。惊破天从通天晓手中夺走领导模块后妄图要挟宇宙大帝，愤怒的宇宙大帝变形了，场面只能用“宏大”来形容。`
        },
        {
            type: 'paragraph',
            text: `变形后，宇宙大帝随即进攻了塞伯坦，包括震荡波、冲锋在内的众多霸天虎战死，惊破天也被宇宙大帝吞下肚子。此时汽车人和垃圾星人也赶来阻止宇宙大帝，热破开着飞船撞瞎了宇宙大帝的一只眼睛，进入宇宙大帝体内救出了被宇宙大帝吞噬的大黄蜂等人。在众人联手在外界对抗宇宙大帝的同时，在宇宙大帝体内，热破最终从被宇宙大帝控制住的惊破天手中夺走了领导模块并借助领导模块的力量进化为补天士打败惊破天，之后打开了领导模块令宇宙大帝的体内多处发生爆炸，并带着汽车人从宇宙大帝的另一只眼睛冲了出去，汽车人离开后宇宙大帝声称汽车人无法毁灭自己的命运，但随即身体发生了大爆炸，头部紧急脱离后进入塞伯坦的轨道，成为塞伯坦的一颗卫星。`
        },
        {
            type: 'figure',
            figures: [
                { figSrc: 'assets/test/image_017.jpg', figAlt: 'assets/test/image_017.jpg', caption: '插图（六）' }
            ]
        },
        {
            type: 'paragraph',
            text: `在《鬼魂作祟》一集中，红蜘蛛借助瘟疫的躯体进入宇宙大帝头部，修复了宇宙大帝脑部的部分电路，恢复了其意识，宇宙大帝要求红蜘蛛完成三项任务：将猛大帅的眼睛偷来作为自己新的眼睛、抓来铁甲龙并把铁甲龙的变形齿轮装到自己脑袋里、将自己的头部链接到塞伯坦让自己拥有新身体，以此为条件答应赐予红蜘蛛新的躯体。但当红蜘蛛拥有新身体后立即背叛了他，头部又被汽车人炸回了塞伯坦轨道。后来惊破天曾去宇宙大帝脑袋里偷取零件，钢索则用宇宙大帝的防御装置的零件制造了计算王，狂飙也曾从宇宙大帝的脑袋里偷走一部分液体来治疗惊破天。`
        },
        {
            type: 'paragraph',
            text: `《至尊太君》一集中，设定宇宙大帝为发明天才至尊太君的最得意之作和改造宇宙的终极武器，但随后背叛至尊太君想要取代他，至尊太君在领导模块的帮助下将他强行锁定为星球形态，并为此不再创造有实体的东西。而在封印宇宙大帝的过程中，至尊太君遗失了领导模块，并因此一度隐退。`
        },
        {
            type: 'paragraph',
            text: `虽然登场集数不多，但宇宙大帝在变形金刚历史上却有着极为重要的地位，这是因为他是G1动画第二、三季的过渡——《变形金刚大电影》的主要反派。而这部电影日后则被评价为划时代的经典。宇宙大帝作为史上最大的变形金刚，其形象设计令人过目不忘。影片中仅有的一次变形也成为变形金刚全剧的经典片段，在随后的2010中也有多集的客串与一集主角剧情，虽然之后的四代日版G1动画中均没有登场，但在事隔多年后的野兽之战中，他仍有客串，足以见其大人气。`
        },
        { type: 'subheading', text: `球形形态` },
        {
            type: 'paragraph',
            text: `星球形态下的宇宙大帝在其球形的每一处都分布着能量导管，围绕星球的环状感应阵列可在0.2公里内进行预警，在星球表面平时分部着大大小小的全机械建筑物，而在战时则可全部变形为武器系统，其全部火力足以摧毁任何想要在不被允许的状态下降落或进入星球的个人、军队或是任何其他不明物体，这让仅在星球形态下宇宙大帝几乎是不可接近的。星球的正面是一对大角，是星球形态下的主要感官装置，也是对目标物进行捕捉的互锁臂，在双角之间是一张“大口”——初级物质入口，初级物质入口是星球形态下最大的能量输出入部位，既能够轻易吸引任何在可及距离内的物体，也能进行发射能瞬间蒸发星球的能力进行攻击。`
        },
        {
            type: 'paragraph',
            text: `当宇宙大帝捕捉到一颗较为大型的目标星球并准备进食时，会首先从口中放射出一种能够削弱星球活力的气体环绕其上，然后再开始将星球牵引至可锁定范围，之后使用大角锁住星球并将其一步步的往口中送入，在初级入口周围分布着鳍状物体，用来进行初次选择和收集。在整个进食期间，任何试图从目标星球逃脱的努力都是无效的，因为即使是最快的飞船在起飞后也会被星帝大口发出的引力所束，一颗类似地球科技水平的行星对于星帝来说根本不需要动用其他武器系统，直接牵引至口部进行吞食。`
        },
        {
            type: 'paragraph',
            text: `在感应阵列环与星球的连接处之下，是星球外壳的分离装置和主要传输齿轮，负责在变形时整个环列和星球外壳部分的调动。进入初级入口之后，是一级生化减压舱和二级物质压缩机，对被吸收物进行二次分类和处理，被判断是食料的物体将被送到消化部位，那里存在着大量消化管和感觉节点，将物质导向能量转换器或处理垃圾的分解液体缸，进过物质转化器和反应引发器的食料最后到达的部分是热量熔炼空间，可将物体精炼为星帝需要的各种元素，剩下的垃圾和不能作为食料的其他物体将进入分解液体缸进行溶解。`
        },
        {
            type: 'paragraph',
            text: `一级生化减压舱的上方，是可伸缩的头部单元即人型形态下的头部，两端是在人型形态下伸出变为头角的天线阵列和能量汇聚器。头部装甲上覆盖的防护罩可保护脑补处理器以及二级/紧急火种核心。星帝内部最核心的部分便是首要神经控制中心，拥有完备的感官中枢神经部件，能够同时处理不可计数的事件。在神经控制中心的主处理器之内，便是宇宙大帝的核心火种。`
        },
        {
            type: 'figure',
            figures: [
                { figSrc: 'assets/test/image_018.jpg', figAlt: 'assets/test/image_018.jpg', caption: '插图（七）' },
            ]
        },
        {
            type: 'paragraph',
            text: `星球表面及内部的非核心部位是完整的抗体系统，虽然只有很少数接近星帝的生物能够幸存，但任何不友好的生命或入侵者试图在星帝身上乱闯时，抗体系统将会启动，已知的抗体系统有触手卷须，能使入侵者昏厥并捕获之，如果该物体被判断无用将直接被撕碎吸收，如有需要将保留并送至其他空间抑或是排出体外；第二类抗体系统是可飞行的AI机械兵，已知的形态有在<微型金刚传说>出场的激光囊，激光囊是根据宇宙大帝捕获的某个宇宙中的迷你金刚——死路进行改造后的量产抗体系统，能够发射麻痹或致命的射线能量；第三类抗体系统是在<领袖之证>中出现的生化机械兽，属于有机体和机械体的高度结合物，既能够进行能量攻击也能够捕获物体并将之粉碎。`
        },
        { type: 'heading', text: `角色形象` },
        {
            type: 'paragraph',
            text: `“宇宙大帝非常可怕。宇宙大帝会……会毁灭宇宙。”——钢丝绳`
        },

        {
            type: 'paragraph',
            text: `在大部分的变形金刚世界观中，宇宙大帝都是死亡与毁灭的象征。相比于其他变形金刚， 宇宙大帝的造型邪气十足。庞大的身躯与狰狞的造型任谁看过一眼都不会将其视作善类。而他的伪装形态也十分具有特色——一颗长着两只角，一圈奇怪的轨道光环与带有粉碎闸门吸收装置的星球。这种诡异的造型也不由得让人想起了克苏鲁神话中的格赫罗斯，可以说，宇宙大帝就是为了破坏与死亡而生。`
        },
        {
            type: 'paragraph',
            text: `吞噬就是宇宙大帝的一切，这个暗黑势力具有明显的特征，一个神一般的球体。它吞噬着路途中的所有东西，从垃圾到整个星球，他很清楚他的行为对星球上的生命体造成的可怕后果，但他毫无悔意。这也是宇宙大帝生存的需要，他从不在意这些。吞噬所有的东西就是为了满足他无法抑制、无法说明的对力量的贪婪。这种贪得无厌的饥饿感让宇宙大帝这个怪物不远万里的横穿太阳系，甚至横穿宇宙、横穿时空。`
        },
        {
            type: 'figure',
            figures: [
                { figSrc: 'assets/test/image_015.jpg', figAlt: 'assets/test/image_015.jpg', caption: '插图（八）' },
                { figSrc: 'assets/test/image_019.jpg', figAlt: 'assets/test/image_019.jpg', caption: '插图（九）' }
            ]
        },
        {
            type: 'paragraph',
            text: `宇宙大帝非常的大，单单他的一个思维处理系统就远远大于一般的生命形态，更不用说他的身体了。宇宙大帝的能力无法估量，其外在表现已经威力无穷了。他拥有星球般的外形，很容易吸取各种东西作为他的美餐，用来提升他的能量级别。在攻击能力方面，宇宙大帝的巨大身体让他势不可挡，他还拥有众多的导弹方阵，以及炸裂星球的武器，连他的思维传感都能让接受到传感的人感到恐慌。因为身体上的无懈可击，宇宙大帝对大部分攻击无动于衷，因此显得很傲慢。`
        },
        {
            type: 'paragraph',
            text: `宇宙大帝是变形金刚系列中最强大、最凶恶的敌人，代表着“黑暗”、“浑沌”与“毁灭”，是混沌之主，毁灭的化身，象征着熵与混沌的终极力量，因此吸引了震天尊的追随。宇宙大帝是超越时空、超越次元的创世神级存在，无论哪个宇宙中出现的宇宙大帝均为同一人物，能够在平行宇宙之间任意来往并可对时空造成不可修复的破坏性影响，也是贯穿所有变形金刚系列里所有世界所有时代的最大威胁，被称为“变形金刚史上最凶之敌”（トランスフォーマー史上最凶の敌）。`
        },
        {
            type: 'paragraph',
            text: `宇宙大帝是变形金刚种族的创造者元始天尊的宿敌，是最初的混乱之神和至纯的毁灭之力，是变形金刚所有宇宙、所有时代的最大威胁，与元始天尊共同构成了多元宇宙时空链条的正反两个方面。宇宙大帝本身即等同于混沌，是这一概念的具象化存在，其唯一目标就是让所有的宇宙都归为最初的混沌状态。每一次的毁灭都只会使宇宙大帝更加强大，据不完全估计，已知的世界中已有约22.26%的平行宇宙被宇宙大帝所吞噬 ，其本体形态已无法探知，据称早已超越了物理形态，我们所看到的宇宙大帝的不同实体仅仅是其本体无限分割后一个个载体或者分身。`
        },
        {
            type: 'paragraph',
            text: `漫画里宇宙大帝的分身常态能达到多元宇宙级，部分状态能达到无限多元宇宙级，乃至波及到全能宇宙，巅峰状态的宇宙大帝被称为能轻松毁灭全能宇宙级的水准，具有无限层无限盒子到超越全能宇宙级的恐怖力量。漫威元祖漫《原始的尖叫》里宇宙大帝吞噬过多元宇宙，吞噬完后进入沉睡状态。之后引来一次多元宇宙大爆炸 ，而宇宙大帝脸接这个大爆炸无伤。IDW宇宙大帝漫画废案里，IDW宇宙的宇宙大帝死后留下的黑洞吞噬了全能宇宙。C版动画银河之力的宇宙大帝死后留下的黑洞也威胁过无限多元宇宙。`
        },
        {
            type: 'paragraph',
            text: `【宇宙大帝(Unicron)是世界(worlds)永无止境的饥饿破坏者，祂的灵魂是万物终结时过热的熵，就像原始天尊(Primus)自己的本质是生命诞生时的温暖气息。祂们是天平上相对的砝码——悬在天平上的是无限的宇宙和万物的浩劫。在原始天尊(Primus)和宇宙大帝(Unicron)漫长的休眠期间，我从赛博坦撤退到时间的伟大海湾中，观察着，等待着我的时机，为我作为战士的职责再次被召唤的那一天做准备。】`
        },
        {
            type: 'paragraph',
            text: `《THE TRANSFORMERS CLASSICS UK》第5期称宇宙大帝是与时间本身一样古老的怪物，是死亡与毁灭的化身。`
        },
        {
            type: 'paragraph',
            text: `《变形金刚百炼为战》手游提到：“很多流(指宇宙流)里的人也认为宇宙大帝只不过是一个用来吓唬原生体(protoforms)的故事......直到他显化(manifests)，吞噬他们的现实(reality)。”这意味着物质宇宙里出现的宇宙大帝只是他的显化形式(manifestion)。`
        },
        {
            type: 'reference', text: `参考资料`,
            list: [
                { date: '2019-09-21', from: '手机搜狐网', link: 'https://baike.baidu.com/reference/69978/533aYdO6cr3_z3kATPbaz_6mYC6VMdmq7bDRU-RzzqIPmGapB4OrSYc69Zk88fooFUSY4887OYVBwLmVD0xN6P4U', text: '灭世邪神宇宙大帝——唯一目标是让所有的宇宙都归为初始状态' },
                { date: '2019-01-30', from: '哔哩哔哩', link: 'https://www.bilibili.com/opus/214608310215327205', text: '最厉害的变形金刚居然是个球？——灭世邪神宇宙大帝' },
            ]
        },
    ];

}

// https://c.wallhere.com/photos/a5/07/Transformers_Transformers_G1_Soundwave-2205799.jpg!d
// https://c.wallhere.com/photos/58/ea/Transformers_Transformers_G1-2205805.jpg!d
// https://c.wallhere.com/photos/34/90/Transformers_G1_Transformers_Earth_Wars_Transformers_Fall_of_Cybertron-2209847.jpg!d
