import { coerceNumberProperty } from "@angular/cdk/coercion";
import { DOCUMENT } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, NgZone, OnDestroy, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { BehaviorSubject, debounceTime, delayWhen, fromEvent, map, Observable, Subscription } from "rxjs";

import { NGXSeasonSelectionListComponent } from "src/app/components/list/list.component";
import { NGXSeasonListOptionDirective } from "src/app/components/list/list.directive";
import { NGXSeasonListDataSource } from "src/app/components/list/list.utils";

import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";

interface ElectronToolListModel {

    avatar?: string;
    poster?: string;
    subject: string;
    description?: string;
    found?: number;
    nation?: string;
    score?: number;
    children?: ElectronToolListModel[];

}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ngx-sui-demo-list-page',
    templateUrl: './list.component.html',
    styles: `
        :host {
            .grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(384px, 1fr));
                grid-auto-flow: row;
            }

            .mult-line {
                display: -webkit-box;
                overflow: hidden;
                text-align: justify;

                -webkit-box-orient: vertical;
                -webkit-line-clamp: 6;
            }
        }
    `
})
export class DemoListPageComponent implements OnDestroy, AfterViewInit {

    @ViewChildren('option', { read: NGXSeasonListOptionDirective })
    private options: QueryList<NGXSeasonListOptionDirective> | undefined;

    @ViewChild('scoreButton', { read: ElementRef, static: true })
    private scoreButton: ElementRef<HTMLButtonElement> | undefined;

    protected sections: ElectronToolListModel[] = [
        {
            subject: '欧系电动工具',
            children: [
                {
                    avatar: 'https://image.cnpp.cn/upload/images/20230216/17442338870_207x90.gif',
                    poster: 'https://image.maigoo.com/upload/images/20201126/12062359045_750x463.jpg_470_290.jpg',
                    subject: '费斯托电动工具',
                    description: `德国费斯托工具集团是德国极负盛名的专业气动工具、电动工具与木工工具系统的生产商与供应商，主要为轿车、大中巴、火车、地铁、轻轨、工程机械、游艇、飞机等车辆生产与维修企业配套提供表面涂装方面的专用研磨工具系统以及为木工加工、室内装修等企业提供专业的气动工具、电动工具及相应的专业工具系统、集尘系统等。总部位于德国巴符州首府德国的工业重镇——斯图加特东部30公里的温德林根。其产品涉及气动工具、电动工具、木工工具、工具系统、工业包装系统、工业集尘器、中央集尘系统、车间设备等。目前德国费斯托工具集团在全球20多个国家设有子公司，分销商与代理商遍布全球50多个国家，目前全球销售额近4亿欧元。自1925开始，费斯托工具集团在专业工具行业已经积累了80多年的经验，其电动工具与木工工具已经连续七年位列德国专业工具排行榜榜首，是高品质专业工具与工具系统的代名词。德国费斯托工具集团是德国首批荣获 ISO 9001质量认证的少数企业之一，其产品在德国与国际上多次获得大奖，采用先进的材料与工艺，并严格按照质量控制系统来组织与生产，获得了全球多个国家的安全与质量认证诸如：CE、GS、3C、UL、 ISO 9001等。费斯托工具秉承为客户提供先进和实用的产品以及对客户负责的经营哲学，为用户提供专门配套设计的、系统完善的专业解决方案。`,
                    found: 1925, nation: '德国', score: Math.random() * 1.5 + 8.0
                },
                {
                    avatar: 'https://image2.cnpp.cn/upload/images/20210407/09045411093_207x90.gif',
                    poster: 'https://image.cnpp.cn/upload/images/20230812/18084376074_940x580.jpg_470_290.jpg',
                    subject: '麦太保电动工具',
                    description: `metabo麦太保成立于1924年，总部位于德国约廷根，是德国著名的专业电动工具制造商之一。目前麦太保集团拥有2个品牌，22个子公司及全球5个制造基地。麦太保电动工具以优质满誉世界，产品输往100多个国家。其全球性的成功源于几十年的精益求精及对高品质的不懈追求。作为麦太保集团第22个全资子公司，麦太保电动工具（上海）有限公司于2004年在上海成立，先后在北京、广州、武汉、大连设立办事处，销售及售后服务网络覆盖中国主要城市，并积极研发适合中国市场客户需求的新产品，正式矢志于扎根于中国市场。除了提供全系列的专业电动工具及附件外，2007年起，中国市场新增推出专业木工机械和气动工具，满足不同专业用户的各种需求。更令人欣喜和骄傲的是，自2007年1月1日起，麦太保郑重承诺向中国市场的专业用户推出电动工具及木工机械的整机3年质量保修服务。`,
                    found: 1924, nation: '德国', score: Math.random() * 1.5 + 8.0
                },
                {
                    avatar: 'https://image2.cnpp.cn/upload/images/20211117/16185325074_207x90.gif',
                    poster: 'https://image.maigoo.com/upload/images/20211117/16185747333_750x463.jpg_470_290.jpg',
                    subject: '博世电动工具',
                    description: `博世电动工具是全球知名的电动工具及附件生产商，其产品在品质、技术革新及售后服务方面一直保持高标准。现在，博世电动工具的产品主要包括4大类：手持式电动工具，台式电动工具， 测量工具和电动工具附件。博世电动工具(中国)有限公司成立于1995年，总部座落于浙江省杭州市，当时名为杭州博世电动工具有限公司，是博世与杭州汽轮动力集团有限公司以及中国的销售合作伙伴美最时洋行（不来梅）的合资企业。2003年，博世购买了合资伙伴杭州汽轮动力集团在合资企业的股份，成为外商独资企业。同年12月，公司正式更名为博世电动工具（中国）有限公司。为了进一步大量提高产能，新公司搬迁到了新址，位于风景秀丽的钱塘江南岸——杭州国家高新技术产业开发区。 2006年1月, 博世电动工具（中国）有限公司建立了自己的销售、市场推广及售后服务团队。`,
                    found: 1886, nation: '德国', score: Math.random() * 1.5 + 8.0
                },
                {
                    avatar: 'https://image2.cnpp.cn/upload/images/20210602/11575211707_207x90.gif',
                    poster: 'https://image.maigoo.com/upload/images/20210602/11580136994_750x463.jpg_470_290.jpg',
                    subject: '泛音电动工具',
                    description: `FEIN是一家源于德国的国际化企业，是高质量电动工具和配件的代名词，专为工业和手工业领域极其艰巨的工作应用而设计。1867年，Wilhelm Emil Fein创立了这家公司，他发明的手电钻奠定了公司的基石。直至今日，FEIN泛音在德国的生产基地仍在制造电动工具，这家位于 Schwaben（施瓦本）的传统企业在全球工业和手工业界都备受尊崇。FEIN如今拥有七百多项有效知识产权，其中包括约五百项专利和专利申请。FEIN专注于产品和服务，力图帮助客户轻松解决金属加工和处理过程中的难题。这些产品和服务在全球范围内由超过16家子公司和50多家代理商负责销售。所有FEIN电动工具均为金属应用而设计。由于高品质组件的良好结合，它们的特点是经过深思熟虑的整体设计，保证了耐用性和坚固性。FEIN的专家在位于Schwäbisch Gmünd-Bargau的公司总部自行研发和生产电动工具。内部生产率超过90%，这意味着FEIN的“德国制造”。FEIN电动工具在投放市场前都要经过严格的实践测试。您和全球各行各业的许多用户都能从FEIN工具的高技术标准中受益。FEIN不仅为此感到自豪，也确信用户拥有可靠的电动工具，FEIN的产品将伴随他们多年。150多年以来，FEIN泛音始终是全球领先的电动工具制造商。这是因为FEIN泛音严以律己，只研发牢固耐用的电动工具，直至今天仍认真进行产品创新。`,
                    found: 1867, nation: '德国', score: Math.random() * 1.5 + 7.0
                },
                {
                    avatar: 'https://image.cnpp.cn/upload/images/20210422/17060570254_207x90.gif',
                    poster: 'https://image4.cnpp.cn/upload/images/20231109/09115184962_940x580.jpg_470_290.jpg',
                    subject: '喜利得电动工具',
                    description: `喜利得(Hilti)追求高品质产品和创新解决方案，并致力于与客户建立直接的合作关系。在建筑现场服务客户时，喜利得将直接向客户提出多种改进建议。如果存在喜利得无法解决某个现场问题的情况，喜利得也会在后续研发中找到对应的解决方案。喜利得的战略目标是通过市场主导和多元化来创造可持续价值。公司自1941年由尤金（Eugen）和马汀·喜利得（Martin Hilti）兄弟创立以来，一直在进行富有前瞻性的财务规划。所有股份均由马汀•喜利得（Martin Hilti）家族信托持有，这可确保公司的持续性发展。喜利得通过可持续性和创新性解决方案来构建更美好的未来。公司在核心业务领域内外同等重视社会发展与环境责任，积极创造美好未来。除建立具有慈善性质的喜利得基金会外，喜利得也无时无刻将诚信、勇气、团队合作和承诺的企业价值观融入到团队成员、合作伙伴和客户合作中。喜利得（中国）商贸有限公司总部位于上海，在全国有十几个分公司和办事处，有超过400名员工为我们的客户提供专业的服务。`,
                    found: 1941, nation: '列支敦士登', score: Math.random() * 0.5 + 8.0
                }
            ]
        },
        {
            subject: '美系电动工具',
            children: [
                {
                    avatar: 'https://image.cnpp.cn/upload/images/20230209/16014757204_207x90.gif',
                    poster: 'https://image.maigoo.com/upload/images/20220120/18015880408_750x463.jpg_470_290.jpg',
                    subject: '美沃奇电动工具',
                    description: `自1924年成立以来，美沃奇™电动工具在耐用性和性能方面一直不断创新。秉持对用户的坚定承诺，MILWAUKEE™美沃奇™始终努力研发，专注于提供面向工业工具用户的创新型解决方案。无论是M12™、M18™系统采用的红锂电池技术，还是通用耐用的附件和创新型手动工具，MILWAUKEE™美沃奇™始终如一地为用户提供能够提高生产力且耐用性高的创新解决方案。为此，MILWAUKEE™美沃奇™关注与专业技工之间的密切沟通与合作，了解日新月异的工作场所的需求，探索如何提供在不同工作场景下，满足不同实际需求的解决方案，帮助用户实现以更高效、更加智能的方式进行作业。MILWAUKEE™美沃奇™ 深知工业用户注重细节，想用户之所想，注重每个影响显著的微小细节。这种以用户为中心的态度不仅提供了应对作业现场实际挑战的解决方案，同时在所有产品线催生了颠覆性创新动力。`,
                    found: 1924, nation: '美国', score: Math.random() * 1.0 + 8.0
                },
                {
                    avatar: 'https://image4.cnpp.cn/upload/images/20210423/16305542404_207x90.gif',
                    poster: 'https://image3.cnpp.cn/upload/images/20230901/18170440580_940x580.jpg_470_290.jpg',
                    subject: '史丹利电动工具',
                    description: `始于1843，STANLEY史丹利百年来用匠心设计每一件工具，成为行业标准的制定者。它设计的工具专业职业匠人而生，助力每一个工程。Frederick T.Stanley先生1843年于美国康狄涅格州新英格兰地区创立了史丹利工具公司，起初它是一家专门从事铰链和其它门窗五金产品生产的公司。1857年，Henry stanley成立了史丹利量尺与水平尺公司，开始生产水平尺和直角尺。1900年，史丹利量尺与水平尺公司成为世界上大型的木工刨和相关工具生产商。1930年，史丹利量尺与水平尺公司成为世界上大型的木工刨和相关工具生产商。1936年，史丹利生产了自己的首把自制美工刀。1963年，史丹利在康狄涅格州新英格兰建设成了世界大型的手工工具工厂。同年，产品中加入了Power Lock系列卷尺。1999年，史丹利发布了Fatmax系列卷尺以及Fatmax系列防震锤。2015年，发布了史丹利品牌旗下的电动工具。2021年，V20锂电系列上市。STANLEY自2014/15赛季以来，一直是巴塞罗那足球俱乐部的官方合作伙伴，强强联手，为每一场比赛保驾护航。从成立伊始，史丹利就是一家热衷于创造的公司，特别是钢卷尺的诞生，大大改变了人们的工作方式。`,
                    found: 1843, nation: '美国', score: Math.random() * 1.0 + 8.0
                },
                {
                    avatar: 'https://image2.cnpp.cn/upload/images/20221126/10362413820_207x90.gif',
                    poster: 'https://image.cnpp.cn/upload/images/20230708/18032185466_940x580.jpg_470_290.jpg',
                    subject: '得伟电动工具',
                    description: `得伟DeWALT是史丹利百得公司旗下旗舰品牌之一，也是世界上优秀的专业级电动工具品牌。近百年来，得伟DeWALT已经在耐用工业机械的设计、工艺和制造领域享有盛名。1922年，雷蒙德.得伟发明了摇臂锯，数十年来，该产品一直是评价质量与耐久性的标准。从这开始，得伟DeWALT在专业用户中获得了经久不衰的良好声望：坚固耐用、功力强劲、精确度高、性能稳定。这些特性构成了得伟DeWALT的标志。黄/黑色调是得伟DeWALT电动工具和配件的商标标志。如今，凭借长时间的经验和先进的制造技术，这些特征已经融入到了得伟DeWALT多种系列的高性能"便携式"电动工具和配件的各项产品中。如今 得伟DeWALT是电动工具行业的市场主导者，拥有300余款电动工具和800多种电动工具配件。`,
                    found: 1922, nation: '美国', score: Math.random() * 1.0 + 8.0
                },
                {
                    avatar: 'https://image3.cnpp.cn/upload/images/20221126/10362338627_207x90.gif',
                    poster: 'https://image4.cnpp.cn/upload/images/20230727/18050490281_940x580.jpg_470_290.jpg',
                    subject: '百得电动工具',
                    description: `百得Black&Decker是史丹利百得公司旗下旗舰品牌。在全球100多个国家提供销售及市场服务。百得在产品革新、产品质量、产品设计方面都有很高的知名度。总部设在美国马里兰州，由ALONZO DECKER和 DUNCAN S.BLACK共同创立于1910年。经过了近一个世纪的发展，百得已经成为在电动工具、金属配件、家用小电器、管道设备及建筑用产品方面较大的市场占有者及生产商之一。百得在产品革新、产品质量、产品设计方面都有很高的知名度，百得强大的品牌认知度和新产品研发能力在全球范围内享有极高的声誉。2010年3月15日，百得公司与史丹利公司合并组建“史丹利百得公司”。通过此次强强联合，史丹利百得公司将成为世界工具行业更具核心竞争力，更具专业性和信赖性的工业及家用手工具、电动工具、气动工具、存储设备制造商，致力为共同的客户提供更加专业化的产品和服务。`,
                    found: 1910, nation: '美国', score: Math.random() * 1.0 + 8.0
                }
            ]
        },
        {
            subject: '日系电动工具',
            children: [
                {
                    avatar: 'https://image3.cnpp.cn/upload/images/20210527/18141985994_207x90.gif',
                    poster: 'https://image.cnpp.cn/upload/images/20230812/18084333107_940x580.jpg_470_290.jpg',
                    subject: '高壹工机电动工具',
                    description: `工机控股株式会社成立于1948年，前身日立工机株式会社，是日立集团中专门从事电动工具、引擎工具以及生命科学仪器的设计制造商，生产和销售1300种以上电动工具产品并拥有2500多件技术专利。和其它一些有一定规模和行业实力的日立集团子公司一样，工机控股株式会社于1949年5月东京证券主板单独上市（6581）。旗下除了日立（Hitachi）以外，还拥有麦太保（Metabo）、三京（SANKYO）、克拉特（CARAT）、田中（TANAKA）以及闽日（Hitmin）等品牌。由于获得美国著名基金公司KKR的融资收购，日立工机于2017年完成了私有化调整从东证退市，于2018年6月更名为工机控股株式会社，并将于2018年10月开始变更主要产品商标为“HiKOKI”，寓意以高性能、高质量的产品争作世界第一的工机企业。`,
                    found: 1948, nation: '日本', score: Math.random() * 0.5 + 9.0
                },
                {
                    avatar: 'https://image2.cnpp.cn/upload/images/20221126/10362579729_207x90.gif',
                    poster: 'https://image.cnpp.cn/upload/images/20240906/18062516597_940x580.jpg_470_290.jpg',
                    subject: '牧田电动工具',
                    description: `牧田株式会社是目前世界上较大规模专门生产专业电动工具的制造商，总部位于日本国爱知县安城市，创业于1915年先后在日本东京，名古屋证券市场上市，注册资金达242亿日元，整个集团员工超过12000人。主营业务包括电动工具，木工机械，气动工具，家用及园艺用机器等的制造和销售。牧田公司凭着100多年所积累的生产电机---电工工具心脏的丰富经验，率先采用世界上先进的大型电脑进行立体设计研发。同时与时俱进，不断把高科技融入产品中，并以全自动的机械设备生产，严格品质检验和安全测试，始终保持产品的高品质和创新性而闻名于世，深受全球广大用户的喜爱。牧田牌专业电动工具具有噪音小、动力强、性能好、质量稳定、寿命长、机身轻巧、坚固耐用、操作容易、应用广泛、修理方便等特点，是各行各业或DIY人员的至优之选。牧田公司以全球九家独资自置大型生产厂和一家设备先进的综合研究所为巩固基地，配合海外48个国家和地区子公司，推行全球性的生产和销售计划。为了满足世界上不同消费者的需要，牧田公司不断改良、不断创新，开发出的产品累计达1000多种，供190多个国家和地区广泛销售和使用。`,
                    found: 1915, nation: '日本', score: Math.random() * 0.5 + 9.0
                }
            ]
        },
        {
            subject: '国产电动工具',
            children: [
                {
                    avatar: 'https://image.cnpp.cn/upload/images/20230104/18094895686_207x90.gif',
                    poster: 'https://image.maigoo.com/upload/images/20201225/08572017273_750x463.jpg_470_290.jpg',
                    subject: '威克士电动工具',
                    description: `Worx威克士电动工具是宝时得集团针对专业领域用户而创立的电动工具品牌。作为一个专业工具品牌，Worx威克士代表了可靠、专业、持久和实用四种含义。迄今为止，Worx 威克士已经在英国、丹麦、瑞典、挪威、泰国、马来西亚、新加坡、菲律宾、韩国等国家销售并得到专业人士认可和信赖。2007年，宝时得携国际市场取得的成功与荣誉将Worx威克士电动工具品牌引入中国市场，Worx威克士旨在为中国市场的专业人士提供效率高、长寿命、专业品质、性能好的专业电动工具。国际化的品牌形象和领先的产品设计，加上雄厚的生产及技术力量，保证了Worx威克士专业工具中国市场近五年来35%以上的年复合增长。`,
                    found: 1994, nation: '中国', score: Math.random() * 1.5 + 7.5
                },
                {
                    avatar: 'https://image4.cnpp.cn/upload/images/20210506/18171586842_207x90.gif',
                    poster: 'https://image.maigoo.com/upload/images/20210506/18171919388_750x463.jpg_470_290.jpg',
                    subject: '大有电动工具',
                    description: `泉峰是专门从事电动工具、花园工具及相关行业产品的研发、生产、测试、销售和售后服务的全球整体解决方案提供商。凭借先进的研发、测试、制造实力和全球营销、工业设计和售后服务团队，泉峰为客户提供优秀解决方案，赢得客户满意和认可。泉峰的产品在全球65个国家超过30000家连锁商店行销。DEVON（大有）品牌是泉峰控股集团旗下的专业电动工具品牌，2007年泉峰正式面向中国市场推出针对工业及专业领域用户的电动工具品牌——DEVON大有。大有品牌总部泉峰位于江苏南京，在中国大陆拥有两大生产制造基地。汇聚近千名研发技术人员，开发产品服务于不同市场领域。大有坚持按照专业电动工具水平要求自主研发、设计和制造强劲、耐久、安全的电动工具，拥有金工、木工、石工、园林等优势产品线，超百款产品，以满足工业级、专业领域及DIY用户要求。目前，大有已与众多国内外知名企业合作，产品被大量应用于建筑工程、工装家装、设备维护、汽美汽修、园林养护、工矿、造船等专业领域。`,
                    found: 2007, nation: '中国', score: Math.random() * 1.5 + 7.5
                },
                {
                    avatar: 'https://image3.cnpp.cn/upload/images/20220325/18034480471_207x90.gif',
                    poster: 'https://image2.cnpp.cn/upload/images/20230630/17385869852_940x580.jpg_470_290.jpg',
                    subject: '东成电动工具',
                    description: `江苏东成电动工具有限公司，始创于1995年，是国内专业电动工具制造重点骨干企业之一，为中国电器工业协会电动工具分会副理事长单位。公司建有完善的工业生产基地，目前占地面积341800平方米，建筑面积267800平方米；拥有现代化的工业厂房和一流的生产及检测设备；同时拥有一批专业高级工程师，一支中高级管理人员和技术人员队伍；现有员工5000余名。东成公司是国内电动工具行业龙头企业，2022年实现销售额53.39亿元，全年电动工具整机销售2380余万台，入库税收1.80亿元。公司主要生产各类电动工具产品及转子、定子等零配件，产品被广泛应用于建筑装修、家居装潢、石材加工、船舶工业、水利工程等众多领域。东成产品在全国各大中城市均设有特约经销商，并同时出口到东南亚、南亚及中东等60多个国家和地区。`,
                    found: 1995, nation: '中国', score: Math.random() * 1.5 + 7.5
                },
                {
                    avatar: 'https://image3.cnpp.cn/upload/images/20221126/10362415758_207x90.gif',
                    poster: 'https://image.maigoo.com/upload/images/20210111/09472622331_750x463.jpg_470_290.jpg',
                    subject: '锐奇电动工具',
                    description: `锐奇控股股份有限公司创建于2000年，公司致力于高等级电动工具的研发、生产、销售及相关技术服务，全心全力助客户创造更高的工作价值。锐奇主要产品涉及20多个系列、100多个规格，广泛运用于工业制造及大型基础设施建设，为航空航天、船舶、汽车、石化、工程机械、建筑等与国民经济发展密切相关的行业进行配套。多年来，公司的品牌运营和产品品质已获得国内外用户的认可，公司不仅通过了IS09001、2008GB/T19001-2008质量体系认证及国家3C认证，还取得了欧洲CE认证CB成员国IE认证、美国UL认证、澳洲SAA认证等多项国际认证。`,
                    found: 2000, nation: '中国', score: Math.random() * 1.5 + 7.5
                },
                {
                    avatar: 'https://image4.cnpp.cn/upload/images/20211228/15122386555_207x90.gif',
                    poster: 'https://image.maigoo.com/upload/images/20211228/15122932281_750x463.jpg_470_290.jpg',
                    subject: '大艺电动工具',
                    description: `江苏大艺科技股份有限公司坐落于素有“小上海”之称的江苏南通海门区，注册资本10000多万元，是国内先进的专业级锂电电动工具制造商。主要从事电动工具的研发、生产和销售。经过多年发展，公司已形成以锂电电动工具为核心，配套交流电动工具、光电测量工具、气动工具等产品体系。截至目前，公司产品在建筑工程、装修装饰、路桥建设、生产制造、园艺修剪、家庭自用等行业及场景广泛应用。公司现拥有2大生产基地，总占地面积超过100,000平方米，员工数量超过1000人。三大专业研发中心和100多人的高素质研发团队，以及先进的生产线和检测设备。公司集平台开发、产品设计、生产制造、品牌推广、渠道建设于一体，具有全价值链核心竞争力，已通过ISO9001质量管理体系、ISO14001环境管理体系、ISO45001职业健康安全管理体系认证。未来，公司将坚持产品领先，效率驱动，多品牌多业态的全球化经营总体战略，致力成为全球工具行业的领军者，为“中国制造”贡献应有之力。`,
                    found: 2012, nation: '中国', score: Math.random() * 1.5 + 7.5
                },
                {
                    avatar: 'https://image4.cnpp.cn/upload/images/20221126/10362493782_207x90.gif',
                    poster: 'https://image.maigoo.com/upload/images/20210107/18125272834_750x463.jpg_470_290.jpg',
                    subject: '博大电动工具',
                    description: `浙江博大实业有限公司坐落于中国五金之都——浙江永康，创建于1992年，经过艰苦创业、励精图治、不断创新，已逐渐发展成为集科研、制造、销售为一体的专业电动工具生产供应服务商。博大公司产品涵盖了无绳系列、林木加工系列、金属加工系列、建筑道路系列及机电系列等五大系列近三百款产品。公司于1998年通过ISO9001质量体系认证，同时通过了美国UL、德国GS、欧洲CE认证，并拥有了自营出口权，2003年产品获得CCC认证。通过具有性价比竞争优势的产品、完善的销售网络和超出客户期望的服务，博大产品深受行业领导、专家及用户的高度赞同，为博大品牌战略奠定了坚实的基础。发展中的博大将继续秉承“诚信、拼搏、实干、感恩”的核心价值观，以“让每个人都能成为好工匠”为使命，以“致力于打造一流的五金机电工具品牌”为愿景，锐意进取、开拓创新，以脚踏实地、精益求精的精神满足客户需求。`,
                    found: 1992, nation: '中国', score: Math.random() * 1.5 + 7.5
                }
            ]
        }
    ];
    protected list: Array<{ color: NGXSeasonColorPalette, label: string }> = [
        { color: 'default', label: '默认选择列表' },
        { color: 'primary', label: '成功选择列表' },
        { color: 'accent', label: '强调选择列表' },
        { color: 'success', label: '成功选择列表' },
        { color: 'warning', label: '警告选择列表' },
        { color: 'failure', label: '失败选择列表' },
        { color: 'info', label: '信息选择列表' },
        { color: 'help', label: '帮助选择列表' },
    ];
    protected items: ElectronToolListModel[] = this.createItems(this.sections);
    protected currItems: ElectronToolListModel[] = this.items.filter((item, index) => index % 2 === 0);
    protected nextItems: ElectronToolListModel[] = this.items.filter((item, index) => index % 2 === 1);
    protected source: NGXSeasonListDataSource<ElectronToolListModel> = new NGXSeasonListDataSource(this.items);
    protected selection: { multResult: string[], monoResult: string[] } = { multResult: [], monoResult: [] };

    protected items$: BehaviorSubject<ElectronToolListModel[]> = new BehaviorSubject(JSON.parse(JSON.stringify(this.items)));

    private keydownEvent$: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(this._document, 'keydown');
    private keyupEvent$: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(this._document, 'keyup');

    private event$: Subscription = Subscription.EMPTY;

    constructor(
        @Inject(DOCUMENT)
        private _document: Document,
        private _ngZone: NgZone
    ) {}

    ngOnDestroy(): void {
        this.event$.unsubscribe();

        this.items$.complete();
    }

    ngAfterViewInit(): void {
        this._ngZone.runOutsideAngular(() =>
            this.event$ = this.keydownEvent$
                .pipe(
                    map((event: KeyboardEvent) => event.code === 'KeyU' && event.altKey && event.ctrlKey),
                    delayWhen(() => this.keyupEvent$),
                    debounceTime(1000)
                )
                .subscribe(value => { if (value) this.scoreButton?.nativeElement.click(); }));
    }

    protected handleRandomSelectionEvent(): void {
        this.selection.monoResult = Array.from<string>({ length: 1 }).fill(this.items.map(item => item.subject)[Math.floor(Math.random() * this.items.length)]);
        this.selection.multResult = this.items.map(item => Math.random() < 0.5 ? item.subject : '').filter(item => item.length > 0);
    }

    protected listenCheckedOrUncheckedChange(flag: boolean, list: NGXSeasonSelectionListComponent): void {
        flag ? list.selectAll() : list.deselectAll();
    }

    protected listenListItemOrderChange(value: 'ascent' | 'descent' | 'origin'): void {
        if (value === 'ascent') {
            const items: ElectronToolListModel[] = this.items$.value;
            this.items$.next(items.sort((a, b) => coerceNumberProperty(a?.score) - coerceNumberProperty(b?.score)));
        } else if (value === 'descent') {
            const items: ElectronToolListModel[] = this.items$.value;
            this.items$.next(items.sort((a, b) => coerceNumberProperty(b?.score) - coerceNumberProperty(a?.score)));
        } else this.items$.next(JSON.parse(JSON.stringify(this.items)));
    }

    protected handleRefreshElectronToolScoreEvent(): void {
        const items: ElectronToolListModel[] = this.items$.value;

        for (const item of items) {
            if (item.nation === '德国' || item.nation === '列支敦士登') item.score = Math.random() * 1.5 + 8.0;
            else if (item.nation === '美国') item.score = Math.random() * 1.0 + 8.0;
            else if (item.nation === '日本') item.score = Math.random() * 0.5 + 9.0;
            else item.score = Math.random() * 1.5 + 7.5;
        }

        this.items$.next(items);
    }

    protected calcAvarageOfScore(items: ElectronToolListModel[] | null): number {
        if (items) return items.map(item => coerceNumberProperty(item.score)).reduce((prevScore, currScore) => currScore += prevScore) / items.length;

        return 0;
    }

    private createItems(sections: ElectronToolListModel[]): ElectronToolListModel[] {
        const list: ElectronToolListModel[] = [];

        for (const section of sections) {
            if (section.children) {
                for (const child of section.children) {
                    list.push(child);
                }
            }
        }

        return list;
    }

}
