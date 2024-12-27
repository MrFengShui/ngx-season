import { Component } from "@angular/core";

import { NGXSeasonColorPalette } from "src/app/utils/_palette.utils";

@Component({
    selector: 'ngx-sui-demo-search-page',
    templateUrl: './search.component.html',
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
export class DemoSearchPageComponent {

    protected list: Array<{ color: NGXSeasonColorPalette, label: string }> = [
        { color: 'default', label: '默认搜索框' },
        { color: 'primary', label: '主要搜索框' },
        { color: 'accent', label: '强调搜索框' },
        { color: 'success', label: '成功搜索框' },
        { color: 'warning', label: '警告搜索框' },
        { color: 'failure', label: '失败搜索框' },
        { color: 'info', label: '信息搜索框' },
        { color: 'help', label: '帮助搜索框' },
    ];
    protected history: { label: string, clearLabel: string, editLabel: string, emptyLabel: string } = {
        label: '搜索记录', clearLabel: '清空', editLabel: '编辑', emptyLabel: '目前没有搜索记录'
    };
    protected matrix: string[][] = [
        ['麦太保电动工具官方旗舰店', '博世电动工具官方旗舰店', '喜利得电动工具官方旗舰店', '米沃奇电动工具官方旗舰店', '得伟电动工具官方旗舰店', '高壹工机电动工具官方旗舰店', '牧田电动工具官方旗舰店', '威克士电动工具官方旗舰店', '东成电动工具官方旗舰店', '大有电动工具官方旗舰店', '大艺电动工具官方旗舰店'],
        ['欧莱德工具官方旗舰店', '史丹利工具官方旗舰店', '世达工具官方旗舰店', '田岛工具官方旗舰店', '绿林工具官方旗舰店', '宝工工具官方旗舰店'],
        ['华硕官方旗舰店', '技嘉官方旗舰店', '微星官方旗舰店', '英特尔（Intel）官方旗舰店', '超威（AMD）官方旗舰店', '英伟达（NVidia）官方旗舰店', '三星官方旗舰店', 'SK海力士官方旗舰店', '美光官方旗舰店'],
        ['华硕官方旗舰店', '技嘉官方旗舰店', '微星官方旗舰店', '戴尔官方旗舰店', '索尼官方旗舰店', '联想官方旗舰店'],
        ['苹果（Apple）官方旗舰店', '三星（Samsung）官方旗舰店'],
    ];
    protected recommends: string[] = this.matrix.reduce((prevList, currList) => prevList.concat(currList));
    protected keyword: string | undefined;
    protected focused: boolean = false;

}
