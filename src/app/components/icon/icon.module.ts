import { NgModule } from "@angular/core";

import { NGX_SEASON_ICONS_REGISTER_TOKEN, NGX_SEASON_ICONS_SIZE_MAP_TOKEN, NGXSeasonIconComponent, NGXSeasonIconRegister } from "./icon.component";
import { CommonModule } from "@angular/common";

const register: NGXSeasonIconRegister = NGXSeasonIconRegister.newInstance()
                .addIcon('accessibility-1').addIcon('accessibility-2').addIcon('add-text').addIcon('administrator').addIcon('airplane').addIcon('alarm-off').addIcon('alarm-on').addIcon('alert').addIcon('align-bottom').addIcon('align-center').addIcon('align-left').addIcon('align-left-text').addIcon('align-middle').addIcon('align-right').addIcon('align-right-text').addIcon('align-top').addIcon('analytics').addIcon('angle-double').addIcon('angle').addIcon('animation').addIcon('application').addIcon('applications').addIcon('archive').addIcon('arrow').addIcon('assign-user').addIcon('asterisk').addIcon('atom').addIcon('attachment').addIcon('auto').addIcon('avatar').addIcon('axis-chart')

                .addIcon('backup').addIcon('backup-restore').addIcon('balance').addIcon('ban').addIcon('bank').addIcon('bar-chart').addIcon('bar-code').addIcon('bars').addIcon('battery').addIcon('bell').addIcon('bell-curve').addIcon('beta').addIcon('bicycle').addIcon('bitcoin').addIcon('block').addIcon('blocks-group').addIcon('bluetooth-off').addIcon('bluetooth-on').addIcon('boat').addIcon('bold').addIcon('bolt').addIcon('book').addIcon('bookmark').addIcon('box-plot').addIcon('briefcase').addIcon('bubble-exclamation').addIcon('bug').addIcon('building').addIcon('bullet-list').addIcon('bullseye').addIcon('bundle')

                .addIcon('eye-hide').addIcon('eye-show').addIcon('eye')

                .addIcon('failure-standard').addIcon('failure').addIcon('form')

                .addIcon('grid-view')

                .addIcon('moon').addIcon('sun').addIcon('thumbs-up').addIcon('thumbs-down')
                .addIcon('check').addIcon('plus').addIcon('plus-circle').addIcon('minus').addIcon('minus-circle').addIcon('times').addIcon('times-circle').addIcon('shield').addIcon('shield-check').addIcon('shield-times')
                .addIcon('user').addIcon('users')
                .addIcon('color-palette').addIcon('close').addIcon('cog').addIcon('dashboard').addIcon('star').addIcon('favorite').addIcon('home').addIcon('new').addIcon('share').addIcon('organization').addIcon('terminal').addIcon('wifi').addIcon('world')
                .addIcon('storage').addIcon('caret').addIcon('collapse')
                .addIcon('tree-view')
                .addIcon('search').addIcon('success').addIcon('success-standard')
                
                .addIcon('warning').addIcon('warning-standard').addIcon('info').addIcon('info-standard');

@NgModule({
    declarations: [ NGXSeasonIconComponent ],
    imports: [ CommonModule ],
    exports: [ NGXSeasonIconComponent ],
    providers: [
        { provide: NGX_SEASON_ICONS_REGISTER_TOKEN, useValue: register },
        { provide: NGX_SEASON_ICONS_SIZE_MAP_TOKEN, useValue: { sm: 12, md: 16, lg: 24, xl: 32, xxl: 48, xxxl: 64 } },
    ]
})
export class NGXSeasonIconModule {}