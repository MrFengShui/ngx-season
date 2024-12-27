import { SelectionModel } from "@angular/cdk/collections";
import { AfterViewInit, Component } from "@angular/core";

import { NGXSeasonTableDataSource } from "src/app/components/table/table.utils";
import { NGXSeasonColorPalette } from "src/app/utils/_palette.utils";

interface PeriodicElement {

    position?: number;
    name?: string;
    metal: '金属' | '非金属' | { metal: number, nonmetal: number };
    phase: '液态' | '固态' | '气态' | { liquid: number, solid: number, gas: number };
    symbol?: string;
    weight: number;

}

type PeriodicElementKey = keyof PeriodicElement;

const PERIODIC_ELEMENTS: PeriodicElement[] = [
    { position: 1, name: '氢（Hydrogen）', metal: '非金属', phase: '气态', symbol: 'H', weight: 1.008 },
    { position: 2, name: '氦（Helium）', metal: '非金属', phase: '气态', symbol: 'He', weight: 4.003 },
    { position: 3, name: '锂（Lithium）', metal: '金属', phase: '固态', symbol: 'Li', weight: 6.941 },
    { position: 4, name: '铍（Beryllium）', metal: '金属', phase: '固态', symbol: 'Be', weight: 9.012 },
    { position: 5, name: '硼（Boron）', metal: '非金属', phase: '固态', symbol: 'B', weight: 10.811 },
    { position: 6, name: '碳（Carbon）', metal: '非金属', phase: '固态', symbol: 'C', weight: 12.011 },
    { position: 7, name: '氮（Nitrogen）', metal: '非金属', phase: '气态', symbol: 'N', weight: 14.007 },
    { position: 8, name: '氧（Oxygen）', metal: '非金属', phase: '气态', symbol: 'O', weight: 15.999 },
    { position: 9, name: '氟（Fluorine）', metal: '非金属', phase: '气态', symbol: 'F', weight: 18.998 },
    { position: 10, name: '氖（Neon）', metal: '非金属', phase: '气态', symbol: 'Ne', weight: 20.179 },
    { position: 11, name: '钠（Sodium）', metal: '金属', phase: '固态', symbol: 'Na', weight: 22.899 },
    { position: 12, name: '镁（Magnesium）', metal: '金属', phase: '固态', symbol: 'Mg', weight: 24.305 },
    { position: 13, name: '铝（Aluminium）', metal: '金属', phase: '固态', symbol: 'Al', weight: 26.982 },
    { position: 14, name: '硅（Silicon）', metal: '非金属', phase: '固态', symbol: 'Si', weight: 28.085 },
    { position: 15, name: '磷（Phosphorus）', metal: '非金属', phase: '固态', symbol: 'P', weight: 30.974 },
    { position: 16, name: '硫（Sulfur）', metal: '非金属', phase: '固态', symbol: 'S', weight: 32.059 },
    { position: 17, name: '氯（Chlorine）', metal: '非金属', phase: '气态', symbol: 'Cl', weight: 35.449 },
    { position: 18, name: '氩（Argon）', metal: '非金属', phase: '气态', symbol: 'Ar', weight: 39.948 },
    { position: 19, name: '钾（Potassium）', metal: '金属', phase: '固态', symbol: 'K', weight: 39.098 },
    { position: 20, name: '钙（Calcium）', metal: '金属', phase: '固态', symbol: 'Ca', weight: 40.078 },
    { position: 21, name: '钪（Scandium）', metal: '金属', phase: '固态', symbol: 'Sc', weight: 44.956 },
    { position: 22, name: '钛（Titanium）', metal: '金属', phase: '固态', symbol: 'Ti', weight: 47.867 },
    { position: 23, name: '钒（Vanadium）', metal: '金属', phase: '固态', symbol: 'V', weight: 50.942 },
    { position: 24, name: '铬（Chromium）', metal: '金属', phase: '固态', symbol: 'Cr', weight: 51.996 },
    { position: 25, name: '锰（Manganese）', metal: '金属', phase: '固态', symbol: 'Mn', weight: 54.938 },
    { position: 26, name: '铁（Iron）', metal: '金属', phase: '固态', symbol: 'Fe', weight: 55.845 },
    { position: 27, name: '钴（Cobalt）', metal: '金属', phase: '固态', symbol: 'Co', weight: 58.933 },
    { position: 28, name: '镍（Nickel）', metal: '金属', phase: '固态', symbol: 'Ni', weight: 58.693 },
    { position: 29, name: '铜（Copper）', metal: '金属', phase: '固态', symbol: 'Cu', weight: 63.546 },
    { position: 30, name: '锌（Zinc）', metal: '金属', phase: '固态', symbol: 'Zn', weight: 65.381 },
    { position: 31, name: '镓（Gallium）', metal: '金属', phase: '固态', symbol: 'Ga', weight: 69.723 },
    { position: 32, name: '锗（Germanium）', metal: '金属', phase: '固态', symbol: 'Ge', weight: 72.631 },
    { position: 33, name: '砷（Arsenic）', metal: '金属', phase: '固态', symbol: 'As', weight: 74.922 },
    { position: 34, name: '硒（Selenium）', metal: '金属', phase: '固态', symbol: 'Se', weight: 78.971 },
    { position: 35, name: '溴（Bromine）', metal: '非金属', phase: '液态', symbol: 'Br', weight: 79.904 },
    { position: 36, name: '氪（Krypton）', metal: '非金属', phase: '气态', symbol: 'Kr', weight: 83.798 },
    { position: 57, name: '镧（Lanthanum）', metal: '金属', phase: '固态', symbol: 'La', weight: 138.911 },
    { position: 58, name: '铈（Cerium）', metal: '金属', phase: '固态', symbol: 'Ce', weight: 140.121 },
    { position: 59, name: '镨（Praseodymium）', metal: '金属', phase: '固态', symbol: 'Pr', weight: 140.911 },
    { position: 60, name: '钕（Neodymium）', metal: '金属', phase: '固态', symbol: 'Nd', weight: 144.239 },
    { position: 61, name: '钷（Promethium）', metal: '金属', phase: '固态', symbol: 'Pm', weight: 144.999 },
    { position: 62, name: '钐（Samarium）', metal: '金属', phase: '固态', symbol: 'Sm', weight: 150.361 },
    { position: 63, name: '铕（Europium）', metal: '金属', phase: '固态', symbol: 'Eu', weight: 151.961 },
    { position: 64, name: '钆（Gadolinium）', metal: '金属', phase: '固态', symbol: 'Gd', weight: 157.251 },
    { position: 65, name: '铽（Terbium）', metal: '金属', phase: '固态', symbol: 'Tb', weight: 158.931 },
    { position: 66, name: '镝（Dysprosium）', metal: '金属', phase: '固态', symbol: 'Dy', weight: 162.499 },
    { position: 67, name: '钬（Holmium）', metal: '金属', phase: '固态', symbol: 'Ho', weight: 164.931 },
    { position: 68, name: '铒（Erbium）', metal: '金属', phase: '固态', symbol: 'Er', weight: 167.259 },
    { position: 69, name: '铥（Thulium）', metal: '金属', phase: '固态', symbol: 'Tm', weight: 168.931 },
    { position: 70, name: '镱（Ytterbium）', metal: '金属', phase: '固态', symbol: 'Yb', weight: 173.049 },
    { position: 71, name: '镥（Lutetium）', metal: '金属', phase: '固态', symbol: 'Lu', weight: 174.971 },
    { position: 80, name: '汞（Mercury）', metal: '金属', phase: '液态', symbol: 'Hg', weight: 200.589 },
    { position: 89, name: '锕（Actinium）', metal: '金属', phase: '固态', symbol: 'Ac', weight: 226.999 },
    { position: 90, name: '钍（Thorium）', metal: '金属', phase: '固态', symbol: 'Th', weight: 232.041 },
    { position: 91, name: '镤（Protactinium）', metal: '金属', phase: '固态', symbol: 'Pa', weight: 231.041 },
    { position: 92, name: '铀（Uranium）', metal: '金属', phase: '固态', symbol: 'U', weight: 238.031 },
    { position: 93, name: '镎（Neptunium）', metal: '金属', phase: '固态', symbol: 'Np', weight: 236.999 },
    { position: 94, name: '钚（Plutonium）', metal: '金属', phase: '固态', symbol: 'Pu', weight: 243.999 },
    { position: 95, name: '镅（Americium）', metal: '金属', phase: '固态', symbol: 'Am', weight: 242.999 },
    { position: 96, name: '锔（Curium）', metal: '金属', phase: '固态', symbol: 'Cm', weight: 246.999 },
    { position: 97, name: '锫（Berkelium）', metal: '金属', phase: '固态', symbol: 'Bk', weight: 246.999 },
    { position: 98, name: '锎（Californium）', metal: '金属', phase: '固态', symbol: 'Cf', weight: 250.999 },
    { position: 99, name: '锿（Einsteinium）', metal: '金属', phase: '固态', symbol: 'Es', weight: 251.999 },
    { position: 100, name: '镄（Fermium）', metal: '金属', phase: '固态', symbol: 'Fm', weight: 256.999 },
    { position: 101, name: '钔（Mendelevium）', metal: '金属', phase: '固态', symbol: 'Md', weight: 257.999 },
    { position: 102, name: '锘（Nobelium）', metal: '金属', phase: '固态', symbol: 'No', weight: 258.999 },
    { position: 103, name: '铹（Lawrencium）', metal: '金属', phase: '固态', symbol: 'Lr', weight: 265.999 },
];

@Component({
    selector: 'ngx-sui-demo-table-page',
    templateUrl: './table.component.html'
})
export class DemoTablePageComponent implements AfterViewInit {

    protected theadValues: { [key in PeriodicElementKey]: string | boolean } = { position: '位置', name: '名称', metal: '属性', phase: '状态', weight: '重量', symbol: '符号' };
    protected tfootValues: { [key in PeriodicElementKey]: any} = {
        position: undefined, name: undefined,
        metal: { metal: this.calcMetalOrNonmetal(PERIODIC_ELEMENTS, '金属'), nonmetal: this.calcMetalOrNonmetal(PERIODIC_ELEMENTS, '非金属') },
        phase: { liquid: this.calcPhase(PERIODIC_ELEMENTS, '液态'), solid: this.calcPhase(PERIODIC_ELEMENTS, '固态'), gas: this.calcPhase(PERIODIC_ELEMENTS, '气态') },
        symbol: undefined, weight: PERIODIC_ELEMENTS.length === 0 ? 0 : PERIODIC_ELEMENTS.map(item => item.weight).reduce((prevItem, currItem) => prevItem + currItem)
    };
    protected dataSrc: NGXSeasonTableDataSource<PeriodicElement> = new NGXSeasonTableDataSource(PERIODIC_ELEMENTS);
    protected color: NGXSeasonColorPalette = 'primary';

    protected caption: string = '表格———元素周期表';

    protected selection: SelectionModel<PeriodicElement> = new SelectionModel<PeriodicElement>(true, []);

    ngAfterViewInit(): void {
        this.dataSrc.connect().subscribe(list => {
            this.tfootValues.metal = {
                metal: this.calcMetalOrNonmetal(list, '金属'),
                nonmetal: this.calcMetalOrNonmetal(list, '非金属')
            };
            this.tfootValues.phase = {
                liquid: this.calcPhase(list, '液态'),
                solid: this.calcPhase(list, '固态'),
                gas: this.calcPhase(list, '气态')
            };
            this.tfootValues.weight = list.length === 0 ? 0 : list.map(item => item.weight).reduce((prevItem, currItem) => prevItem + currItem)
        });
    }

    protected handleSelectOrDeselectEvent(change: boolean): void {
        this.selection.clear();

        if (change) this.selection.select(...this.dataSrc.data);
    }

    protected listenTableRowSelectedChange(element: PeriodicElement): void {
        if (this.selection.isSelected(element)) this.selection.deselect(element);
        else this.selection.select(element);
    }

    protected isAllChecked(): boolean {
        return this.selection.selected.length === this.dataSrc.data.length;
    }

    protected isIndeterminated(): boolean {
        const length: number = this.selection.selected.length;
        return length > 0 && length < this.dataSrc.data.length;
    }

    private calcMetalOrNonmetal(list: PeriodicElement[], flag: '金属' | '非金属'): number {
        let sum: number = 0;

        for (const item of list) if (item.metal === flag) sum += 1;

        return sum;
    }

    private calcPhase(list: PeriodicElement[], flag: '液态' | '固态' | '气态'): number {
        let sum: number = 0;

        for (const item of list) if (item.phase === flag) sum += 1;

        return sum;
    }

}
