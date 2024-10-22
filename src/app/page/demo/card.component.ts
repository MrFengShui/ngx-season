import { Component } from "@angular/core";

@Component({
    selector: 'ngx-sui-demo-card-page',
    templateUrl: './card.component.html'
})
export class DemoCardPageComponent {

    protected avatar: string = 'https://img.phb123.com/uploads/220822/813-220R2102054Y4.jpg';
    protected bgimage: string = 'https://pic.vjshi.com/2022-02-14/a673db4042d64b8a95e46cb533a4d3dc/00001.jpg?x-oss-process=style/watermark';
    protected title: string = '松鼠';
    protected subtitle: string = '松鼠科物种的统称';
    protected paragraphs: string[] = [
        `松鼠（学名：Sciuridae）是松鼠科物种的统称。有63属285种。松鼠的体形细长，后肢更长；前后肢间无皮翼，四肢强健；眼大而明亮，耳朵长，耳尖有一束毛，冬季尤其显著；夏毛一般为黑褐色或赤棕色，冬毛多呈灰色、烟灰色或灰褐色，腹毛为白色；指、趾端有尖锐的钩爪，尾毛多而且蓬松，常朝向背部反卷。松鼠雌性个体比雄性个体稍重一些。因为松鼠的样子像老鼠，而且大多数喜欢啃食松果之类的坚果，习惯生活在树木尤其是松树上，故名。`,
        `松鼠分布遍及南极以外的各大洲（在大洋洲为引入种）。栖息地多种多样，松鼠在白天活动，清晨频繁，视觉和听觉发达，不冬眠，有贮存食物的习性。松鼠是杂食动物，吃多种植物，包括坚果、种子、松球、水果、菌类和绿色植物，也吃昆虫。松鼠1-2月发情，孕期35-40天，1年繁殖2次，一般每胎4-6仔，寿命4-10年。`,
        `松鼠肉可食，有松子的清香味。松鼠身价以毛皮为贵，是狩猎业中重要的资源动物，其毛皮拼制的轻裘，在市场上价值高。松鼠也常被人们养在铁丝转笼中，以供观赏。松鼠在中国传统文化中，招人喜爱，从艺术装饰中就能看出来，最为常见的是葡萄松鼠纹。`,
        `巨松鼠列入《国家重点保护野生动物名录》（2021年）——二级。分布于中国的19种松鼠列入《有重要生态、科学、社会价值的陆生野生动物名录》（2023年）。全部列入《世界自然保护联盟濒危物种红色名录》（IUCN）。`
    ];

}