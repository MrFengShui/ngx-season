import { NgModule } from "@angular/core";

import { NGX_SEASON_ICONS_REGISTER_TOKEN, NGX_SEASON_ICONS_SIZE_MAP_TOKEN, NGXSeasonIconComponent, NGXSeasonIconRegister } from "./icon.component";
import { CommonModule } from "@angular/common";

const register: NGXSeasonIconRegister = NGXSeasonIconRegister.newInstance()
                .addIcon('accessibility-1').addIcon('accessibility-2').addIcon('add-text').addIcon('administrator').addIcon('airplane').addIcon('alarm-off').addIcon('alarm-on').addIcon('alert').addIcon('align-bottom').addIcon('align-center').addIcon('align-left').addIcon('align-left-text').addIcon('align-middle').addIcon('align-right').addIcon('align-right-text').addIcon('align-top').addIcon('analytics').addIcon('angle-double').addIcon('angle').addIcon('animation').addIcon('application').addIcon('applications').addIcon('archive').addIcon('arrow').addIcon('assign-user').addIcon('asterisk').addIcon('atom').addIcon('attachment').addIcon('auto').addIcon('avatar').addIcon('axis-chart')

                .addIcon('backup').addIcon('backup-restore').addIcon('balance').addIcon('ban').addIcon('bank').addIcon('bar-chart').addIcon('bar-code').addIcon('bars').addIcon('battery').addIcon('bell').addIcon('bell-curve').addIcon('beta').addIcon('bicycle').addIcon('bitcoin').addIcon('block').addIcon('blocks-group').addIcon('bluetooth-off').addIcon('bluetooth-on').addIcon('boat').addIcon('bold').addIcon('bolt').addIcon('book').addIcon('bookmark').addIcon('box-plot').addIcon('briefcase').addIcon('bubble-exclamation').addIcon('bug').addIcon('building').addIcon('bullet-list').addIcon('bullseye').addIcon('bundle')

                .addIcon('calculator').addIcon('calendar').addIcon('camera').addIcon('campervan').addIcon('cancel').addIcon('capacitor').addIcon('car').addIcon('caret').addIcon('caravan').addIcon('cddvd').addIcon('center-text').addIcon('certificate').addIcon('chat-bubble').addIcon('check-circle').addIcon('check').addIcon('checkbox-list').addIcon('child-arrow').addIcon('cicd').addIcon('circle-arrow').addIcon('circle').addIcon('clipboard').addIcon('clock').addIcon('clone').addIcon('close').addIcon('cloud-chart').addIcon('cloud-network').addIcon('cloud-scale').addIcon('cloud-traffic').addIcon('cloud').addIcon('cluster').addIcon('code').addIcon('cog').addIcon('coin-bag').addIcon('collapse-card').addIcon('collapse').addIcon('color-palette').addIcon('color-picker').addIcon('command').addIcon('compass').addIcon('computer').addIcon('connect').addIcon('container-volume').addIcon('container').addIcon('contract').addIcon('control-lun').addIcon('copy-to-clipboard').addIcon('copy').addIcon('cpu').addIcon('credit-card').addIcon('crosshairs').addIcon('crown').addIcon('cursor-arrow').addIcon('cursor-hand-click').addIcon('cursor-hand-grab').addIcon('cursor-move').addIcon('cursor-hand-open').addIcon('cursor-hand').addIcon('curve-chart')

                .addIcon('dashboard').addIcon('data-cluster').addIcon('date').addIcon('deploy').addIcon('design').addIcon('details').addIcon('devices').addIcon('digital-signature').addIcon('directory').addIcon('disconnect').addIcon('display').addIcon('dna').addIcon('document').addIcon('dollar-bill').addIcon('dollar').addIcon('dot-circle').addIcon('download-cloud').addIcon('download').addIcon('drag-handle-corner').addIcon('drag-handle')

                .addIcon('edit').addIcon('ellipsis-horizontal').addIcon('ellipsis-vertical').addIcon('email').addIcon('employee-group').addIcon('employee').addIcon('eraser').addIcon('euro').addIcon('export').addIcon('eye-hide').addIcon('eye-show').addIcon('eye')

                .addIcon('face-happy').addIcon('face-neutral').addIcon('face-sad').addIcon('factory').addIcon('failure-standard').addIcon('failure').addIcon('favorite').addIcon('file-group').addIcon('file').addIcon('filter-off').addIcon('filter-on').addIcon('firewall').addIcon('flag').addIcon('floppy').addIcon('form')

                .addIcon('grid-view')

                .addIcon('heart-broken').addIcon('heart').addIcon('help-standard').addIcon('home')

                .addIcon('id-badge').addIcon('image-gallery').addIcon('image').addIcon('import').addIcon('info-standard').addIcon('info').addIcon('internet-of-things')

                .addIcon('key').addIcon('keyboard')

                .addIcon('language').addIcon('library').addIcon('list-view').addIcon('list').addIcon('login').addIcon('logout')

                .addIcon('minus').addIcon('minus-circle').addIcon('mobile').addIcon('moon').addIcon('mouse')

                .addIcon('new').addIcon('network-globe').addIcon('no-access')

                .addIcon('organization')

                .addIcon('paperclip').addIcon('pause').addIcon('phone').addIcon('pin').addIcon('play').addIcon('plugin').addIcon('plus-circle').addIcon('plus').addIcon('pound').addIcon('power').addIcon('printer')

                .addIcon('qrcode')

                .addIcon('recycle').addIcon('rewind').addIcon('router').addIcon('ruble').addIcon('rupee')

                .addIcon('savings').addIcon('search').addIcon('server').addIcon('settings').addIcon('share').addIcon('shield-check').addIcon('shield-times').addIcon('shield').addIcon('slider').addIcon('star').addIcon('step-forward').addIcon('stop').addIcon('storage').addIcon('store').addIcon('success-standard').addIcon('success').addIcon('sun').addIcon('switch').addIcon('sync')

                .addIcon('table').addIcon('tablet').addIcon('tag').addIcon('tags').addIcon('target').addIcon('terminal').addIcon('thumbs-up').addIcon('thumbs-down').addIcon('times-circle').addIcon('times').addIcon('tools').addIcon('trash').addIcon('tree-view')

                .addIcon('unlock').addIcon('upload-cloud').addIcon('upload').addIcon('user').addIcon('users')

                .addIcon('video-camera').addIcon('video-gallery').addIcon('volume-down').addIcon('volume-mute').addIcon('volume-up')

                .addIcon('wallet').addIcon('warning-standard').addIcon('warning').addIcon('wifi-off').addIcon('wifi-on').addIcon('world');

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
