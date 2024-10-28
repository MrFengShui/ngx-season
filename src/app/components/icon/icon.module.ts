import { NgModule } from "@angular/core";

import { NGX_SEASON_ICONS_REGISTER_TOKEN, NGX_SEASON_ICONS_SIZE_MAP_TOKEN, NGXSeasonIconComponent, NGXSeasonIconRegister } from "./icon.component";
import { CommonModule } from "@angular/common";

const register: NGXSeasonIconRegister = NGXSeasonIconRegister.newInstance()
                .addIcon('moon').addIcon('sun').addIcon('thumbs-up').addIcon('thumbs-down').addIcon('alarm-on').addIcon('alarm-off')
                .addIcon('check').addIcon('plus').addIcon('plus-circle').addIcon('minus').addIcon('minus-circle').addIcon('times').addIcon('times-circle').addIcon('shield-check').addIcon('shield-times')
                .addIcon('avatar').addIcon('administrator').addIcon('assign-user').addIcon('user').addIcon('users')
                .addIcon('alert').addIcon('analytics').addIcon('application').addIcon('applications').addIcon('bank').addIcon('bars').addIcon('close').addIcon('angle').addIcon('angle-double').addIcon('star').addIcon('bookmark').addIcon('favorite').addIcon('home').addIcon('new').addIcon('share')
                .addIcon('success').addIcon('success-standard').addIcon('warning').addIcon('warning-standard').addIcon('failure').addIcon('failure-standard').addIcon('info').addIcon('info-standard');

@NgModule({
    declarations: [ NGXSeasonIconComponent ],
    imports: [ CommonModule ],
    exports: [ NGXSeasonIconComponent ],
    providers: [
        { provide: NGX_SEASON_ICONS_REGISTER_TOKEN, useValue: register },
        { provide: NGX_SEASON_ICONS_SIZE_MAP_TOKEN, useValue: { sm: 16, md: 24, lg: 32, xl: 40, xxl: 48, xxxl: 56 } },
    ]
})
export class NGXSeasonIconModule {}