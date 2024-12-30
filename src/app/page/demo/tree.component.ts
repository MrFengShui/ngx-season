import { Component } from "@angular/core";
import { NGXSeasonTreeControlStyle, NGXSeasonTreeSelectionModel } from "src/app/components/tree/tree.component";

import { NGXSeasonTreeDataSource, NGXSeasonTreeNodeModel } from "src/app/components/tree/tree.utils";
import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";

@Component({
    selector: 'ngx-sui-demo-tree-page',
    templateUrl: './tree.component.html'
})
export class DemoTreePageComponent {

    protected source: NGXSeasonTreeDataSource<any> = new NGXSeasonTreeDataSource([
        {
            id: '1', label: '荤腥',
            children: [
                {
                    id: '1-1', label: '肉类',
                    children: [
                        { id: '1-1-1', label: '猪肉' },
                        { id: '1-1-2', label: '牛肉' },
                        { id: '1-1-3', label: '羊肉' },
                    ]
                },
                {
                    id: '1-2', label: '蛋禽',
                    children: [
                        {
                            id: '1-2-1', label: '蛋类',
                            children: [
                                { id: '1-2-1-1', label: '鸡蛋' },
                                { id: '1-2-1-2', label: '咸蛋' },
                                { id: '1-2-1-3', label: '皮蛋' },
                                { id: '1-2-1-4', label: '鹌鹑蛋' }
                            ]
                        },
                        {
                            id: '1-2-2', label: '蛋类',
                            children: [
                                { id: '1-2-2-1', label: '鸡肉' },
                                { id: '1-2-2-2', label: '鸭肉' },
                                { id: '1-2-2-3', label: '鹅肉' }
                            ]
                        }
                    ]
                },
                {
                    id: '1-3', label: '水产',
                    children: [
                        {
                            id: '1-3-1', label: '鱼类',
                            children: [
                                { id: '1-3-1-1', label: '胖头鱼' },
                                { id: '1-3-1-2', label: '鲤鱼' },
                                { id: '1-3-1-3', label: '草鱼' },
                                { id: '1-3-1-4', label: '带鱼' },
                                { id: '1-3-1-5', label: '沙丁鱼' },
                                { id: '1-3-1-6', label: '三文鱼' },
                            ]
                        },
                        {
                            id: '1-3-2', label: '甲壳类',
                            children: [
                                { id: '1-3-2-1', label: '龙虾' },
                                { id: '1-3-2-2', label: '螃蟹' }
                            ]
                        },
                        {
                            id: '1-3-3', label: '干货类',
                            children: [
                                { id: '1-3-3-1', label: '海带' },
                                { id: '1-3-3-2', label: '海苔' }
                            ]
                        },
                    ]
                }
            ]
        },
        {
            id: '2', label: '素食',
            children: [
                {
                    id: '2-1', label: '豆类',
                    children: [
                        { id: '2-1-1', label: '豆干' },
                        { id: '2-1-2', label: '豆腐' },
                        { id: '2-1-3', label: '千张' }
                    ]
                },
                {
                    id: '2-2', label: '菜类',
                    children: [
                        { id: '2-2-1', label: '白菜' },
                        { id: '2-2-2', label: '菜苔' },
                        { id: '2-2-3', label: '苋菜' },
                        { id: '2-2-4', label: '青江菜' },
                        { id: '2-2-5', label: '花菜' },
                        { id: '2-2-6', label: '西兰花' },
                    ]
                },
                {
                    id: '2-3', label: '果类',
                    children: [
                        { id: '2-3-1', label: '红薯' },
                        { id: '2-3-2', label: '紫薯' },
                        { id: '2-3-3', label: '西红柿' },
                        { id: '2-3-4', label: '茄子' },
                        { id: '2-3-5', label: '丝瓜' },
                        { id: '2-3-6', label: '瓠子' },
                        { id: '2-3-7', label: '土豆' }
                    ]
                },
                {
                    id: '2-4', label: '瓜类',
                    children: [
                        { id: '2-4-1', label: '冬瓜' },
                        { id: '2-4-2', label: '南瓜' }
                    ]
                }
            ]
        },
        {
            id: '3', label: '瓜果',
            children: [
                {
                    id: '3-1', label: '瓜类',
                    children: [
                        { id: '3-1-1', label: '西瓜' },
                        { id: '3-1-2', label: '香瓜' },
                        { id: '3-1-3', label: '哈密瓜' }
                    ]
                },
                {
                    id: '3-2', label: '果类',
                    children: [
                        { id: '3-2-1', label: '苹果' },
                        { id: '3-2-2', label: '梨子' },
                        { id: '3-2-3', label: '香蕉' },
                        { id: '3-2-4', label: '石榴' },
                        { id: '3-2-5', label: '葡萄' },
                        { id: '3-2-6', label: '菠萝' },
                        { id: '3-2-7', label: '草莓' },
                        { id: '3-2-8', label: '桔子' },
                        { id: '3-2-9', label: '橙子' }
                    ]
                }
            ]
        }
    ]);
    protected colors: NGXSeasonColorPalette[] = ['default', 'primary', 'accent', 'success', 'warning', 'failure', 'info', 'help'];
    protected ctrlStyles: NGXSeasonTreeControlStyle[] = ['flat', 'outline', 'solid'];
    protected selection: any;

    protected print(change: NGXSeasonTreeSelectionModel): void {
        console.debug(change);
    }

}
