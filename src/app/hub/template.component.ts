import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject} from "@angular/core";
import {interval, map, Observable, of, take} from "rxjs";

import {
    OCTOPUS_DIALOG_DATA,
    OCTOPUS_DRAWER_DATA,
    OctopusDialog,
    OctopusDrawer,
    OctopusToast, OctopusToastType
} from "../overlay/overlay.service";
import {AsyncPipe} from "@angular/common";
import {OctopusMenuCheckRadioItem} from "../menu/menu.component";
import {OctopusFlatTreeNode, OctopusNestTreeNode} from "../tree/tree.component";
import {OctopusTableColumn} from "../table/table.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {OctopusColorPalette} from "../global/enums.utils";

interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

interface CheckBoxTree {

    checked: boolean;
    color: OctopusColorPalette;
    label: string;
    children?: CheckBoxTree[];

}

@Component({
    selector: 'octopus-template-overlay-view',
    template: `
        <!--        <div octo-dialog-head octoMinMax octoClose>Octopus Template Head - {{_dialogData | json}}</div>-->
        <!--        <octo-split-line></octo-split-line>-->
        <!--        <div octo-dialog-body>Octopus Template Body</div>-->
        <!--        <octo-split-line></octo-split-line>-->
        <!--        <div octo-dialog-ctrl>-->
        <!--            <button octo-solid-btn octoColor="success" [octo-dialog-close]="'Submit'">Submit</button>-->
        <!--            <button octo-solid-btn octoColor="failure" [octo-dialog-close]="'Cancel'">Cancel</button>-->
        <!--        </div>-->
        <!--        <octo-split-line></octo-split-line>-->
        <!--        <div octo-dialog-foot>Octopus Template Foot</div>-->
        <!--        <div octo-drawer-header>Octopus Template Header - {{_drawerData | json}}</div>-->
        <!--        <div octo-drawer-content>Octopus Template Content</div>-->
    `
})
export class OctopusTemplateOverlayView {

    constructor(
        @Inject(OCTOPUS_DIALOG_DATA)
        public _dialogData: any,
        @Inject(OCTOPUS_DRAWER_DATA)
        public _drawerData: any
    ) {
    }

}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'octopus-hub-view',
    templateUrl: 'template.component.html'
})
export class OctopusTemplateView {

    flag$: Observable<boolean> = interval(1000).pipe(map(value => value % 2 === 0));
    logo$: Observable<string> = of('https://cdn.worldvectorlogo.com/logos/google-play-4.svg');
    list$: Observable<Array<{ label: string, content: string, image: string }>> =
        of(Array.from({length: 3}).map((_, index) =>
            ({
                label: `Accordion Subject 00${index + 1}`,
                content: `Accordion Description 00${index + 1}`,
                image: index === 0
                    ? 'https://images.wallpaperscraft.com/image/single/bubbles_liquid_water_312589_1280x720.jpg'
                    : index === 1
                        ? 'https://images.wallpaperscraft.com/image/single/circles_pattern_fractal_312382_1280x720.jpg'
                        : 'https://images.wallpaperscraft.com/image/single/fractal_spirals_abstraction_312366_1280x720.jpg'
            })
        ));
    text$: Observable<string[]> = of([
        `This color palette comprises primary and accent colors that can be used for illustration or to develop your brand colors.`,
        `They’ve been designed to work harmoniously with each other.`,
        `The color palette starts with primary colors and fills in the spectrum to create a complete and usable palette for Android, Web, and iOS. Google suggests using the 500 colors as the primary colors in your app and the other colors as accents colors.`,
        `Themes enable consistent app styling through surface shades, shadow depth, and ink opacity.`
    ]);
    progress$: Observable<number> = interval(100).pipe(take(1001), map(value => value * 0.001));

    flag: boolean = true;

    readonly EDIT_FORMAT_FONT_STYLE_MENU_ITEMS: OctopusMenuCheckRadioItem[] = [
        {icon: 'format_bold', text: 'Bold', check: false},
        {icon: 'format_italic', text: 'Italic', check: false}
    ];
    readonly EDIT_FORMAT_FONT_ALIGN_MENU_ITEMS: OctopusMenuCheckRadioItem[] = [
        {icon: 'format_align_left', text: 'Left', check: false},
        {icon: 'format_align_center', text: 'Center', check: false},
        {icon: 'format_align_right', text: 'Right', check: false},
        {icon: 'format_align_justify', text: 'Justify', check: true}
    ];

    readonly TABLE_DATA: PeriodicElement[] = [
        {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
        {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
        {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
        {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
        {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
        {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
        {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
        {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
        {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
        {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
        {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
        {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
        {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
        {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
        {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
        {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
        {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
        {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
        {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
        {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
    ];
    readonly TABLE_COLUMNS: OctopusTableColumn[] = [
        {align: 'right', label: 'Position', props: 'position'},
        {align: 'center', label: 'Name', props: 'name'},
        {align: 'right', label: 'Weight', props: 'weight'},
        {align: 'left', label: 'Symbol', props: 'symbol'}
    ];

    readonly FLAT_TREE_DATA: OctopusFlatTreeNode[] = [
        {expandable: true, level: 0, text: 'Food'},
        {expandable: true, level: 1, text: 'Vegetable'},
        {expandable: false, level: 2, text: 'Broccoli'},
        {expandable: false, level: 2, text: 'Brussels Sprouts'},
        {expandable: true, level: 1, text: 'Meat'},
        {expandable: false, level: 2, text: 'Beef'},
        {expandable: false, level: 2, text: 'Pork'},
        {expandable: false, level: 2, text: 'Lamb'},
        {expandable: false, level: 2, text: 'Chicken'},
        {expandable: true, level: 1, text: 'Fruit'},
        {expandable: false, level: 2, text: 'Apple'},
        {expandable: false, level: 2, text: 'Pear'},
        {expandable: false, level: 2, text: 'Banana'},
        {expandable: false, level: 2, text: 'Melon'},
        {expandable: false, level: 2, text: 'Orange'},
        {expandable: true, level: 0, text: 'Drink'},
        {expandable: false, level: 1, text: 'Juice'},
        {expandable: true, level: 1, text: 'Beverage'},
        {expandable: false, level: 2, text: 'Coca Cola'},
        {expandable: false, level: 2, text: 'Pepsi'},
        {expandable: false, level: 2, text: 'Sprite'},
        {expandable: true, level: 1, text: 'Other'},
        {expandable: false, level: 2, text: 'Milk'},
        {expandable: false, level: 2, text: 'Soy Milk'},
        {expandable: false, level: 2, text: 'Coffee'}
    ];
    readonly NEST_TREE_DATA: OctopusNestTreeNode[] = [
        {
            text: 'Food',
            children: [
                {
                    text: 'Vegetable',
                    children: [{text: 'Broccoli'}, {text: 'Brussels Sprouts'}]
                },
                {
                    text: 'Meat',
                    children: [{text: 'Beef'}, {text: 'Pork'}, {text: 'Lamb'}, {text: 'Chicken'}]
                },
                {
                    text: 'Fruit',
                    children: [{text: 'Apple'}, {text: 'Pear'}, {text: 'Banana'}, {text: 'Melon'}, {text: 'Orange'}]
                }
            ]
        },
        {
            text: 'Drink',
            children: [
                {text: 'Juice'},
                {
                    text: 'Beverage',
                    children: [{text: 'Coca Cola'}, {text: 'Pepsi'}, {text: 'Sprite'}]
                },
                {
                    text: 'Other',
                    children: [{text: 'Milk'}, {text: 'Soy Milk'}, {text: 'Coffee'}]
                }
            ]
        }
    ];
    readonly CHECK_BOX_TREE: CheckBoxTree = {
        checked: false, label: 'Indeterminate', color: 'base',
        children: [
            {checked: false, label: 'Primary Checkbox', color: 'primary'},
            {checked: false, label: 'Accent Checkbox', color: 'accent'},
            {checked: false, label: 'Success Checkbox', color: 'success'},
            {checked: false, label: 'Warning Checkbox', color: 'warning'},
            {checked: false, label: 'Failure Checkbox', color: 'failure'},
        ]
    };

    fstGroup: FormGroup = this._builder.group({
        control: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
    sndGroup: FormGroup = this._builder.group({
        control: new FormControl('', [Validators.required])
    });

    allChecked: boolean = false;
    radioValue: any = 'b';

    constructor(
        private _builder: FormBuilder,
        private _cdr: ChangeDetectorRef,
        private _dialog: OctopusDialog,
        private _drawer: OctopusDrawer,
        private _toast: OctopusToast
    ) {}

    updateAllChecked() {
        this.allChecked = this.CHECK_BOX_TREE.children !== undefined
            && this.CHECK_BOX_TREE.children.every(child => child.checked);
    }

    updateSomeChecked(): boolean {
        return this.CHECK_BOX_TREE.children !== undefined
            && this.CHECK_BOX_TREE.children.filter(child => child.checked).length > 0
            && !this.allChecked;
    }

    setAll(checked: boolean) {
        this.allChecked = checked;

        if (this.CHECK_BOX_TREE.children) {
            this.CHECK_BOX_TREE.children.forEach(child => (child.checked = checked));
        }
    }

    selectMenuRadioItem(item: OctopusMenuCheckRadioItem, list: OctopusMenuCheckRadioItem[]): void {
        list.forEach(item => item.check = false);
        item.check = true;
    }

    delete(index: number): void {
        new AsyncPipe(this._cdr).transform(this.list$)?.splice(index, 1);
    }

    open(): void {
        // this._dialog.config({data: {token: 'OCTOPUS_DIALOG_TOKEN'}})
        //     .open(OctopusTemplateOverlayView);
        // this._drawer.config({data: {token: 'OCTOPUS_DRAWER_TOKEN'}, height: '80vh'})
        //     .open(OctopusTemplateOverlayView)
        let types: OctopusToastType[] = ['success', 'warning', 'failure'];
        this._toast.config({
            data: {
                type: types[Math.floor(Math.random() * types.length)],
                text: 'This color palette comprises primary and accent colors that can be used for illustration or to develop your brand colors. They’ve been designed to work harmoniously with each other. The color palette starts with primary colors and fills in the spectrum to create a complete and usable palette for Android, Web, and iOS. Google suggests using the 500 colors as the primary colors in your app and the other colors as accents colors.'
            }
        }).open();
    }

}
