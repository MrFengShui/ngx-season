import { Component } from "@angular/core";
import { NGXSeasonIconName } from "src/app/components/icon/icon.component";

@Component({
    selector: 'ngx-sui-demo-icon-page',
    templateUrl: './icon.component.html',
    styles: `
        :host {
            .wrapper {
                position: relative;

                .toolbar {
                    position: sticky;
                    top: 0;
                    z-index: 10;

                    margin: -1rem -1rem 0 -1rem;
                }

                .grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                    grid-auto-flow: row;

                    a {
                        text-wrap: nowrap
                    }
                }
            }
        }
    `
})
export class DemoIconPageComponent {

    protected list: Array<{ label: string, names: NGXSeasonIconName[] }> = [
        {
            label: '字母A开头',
            names: [
                'accessibility-1', 'accessibility-2', 'add-text', 'administrator', 'airplane', 'alarm-off', 'alarm-on', 'alert', 'align-bottom', 'align-center', 'align-center-text', 'align-justify-text', 'align-left', 'align-left-text', 'align-middle', 'align-right', 'align-right-text', 'align-top', 'analytics', 'angle-double', 'angle', 'animation', 'application', 'applications', 'archive', 'arrow', 'assign-user', 'asterisk', 'auto', 'avatar', 'axis-chart'
            ]
        },
        {
            label: '字母B开头',
            names: [
                'backup', 'backup-restore', 'balance', 'ban', 'bank', 'bar-chart', 'bar-code', 'bars', 'battery', 'bell', 'bell-curve', 'beta', 'bicycle', 'bitcoin', 'block', 'blocks-group', 'bluetooth-off', 'bluetooth-on', 'boat', 'bold', 'bolt', 'book', 'bookmark', 'box-plot', 'briefcase', 'bubble-exclamation', 'bug', 'building', 'bullet-list', 'bullseye', 'bundle'
            ]
        },
        {
            label: '字母C开头',
            names: [
                'calculator', 'calendar', 'camera', 'campervan', 'cancel', 'capacitor', 'car', 'caravan', 'cards-view', 'caret', 'cddvd', 'certificate', 'chat-bubble', 'check-circle', 'check', 'checkbox-list', 'child-arrow', 'cicd', 'circle-arrow', 'circle', 'clipboard', 'clock', 'clone', 'close', 'cloud-chart', 'cloud-network', 'cloud-scale', 'cloud-traffic', 'cloud', 'cluster', 'code', 'cog', 'coin-bag', 'collapse-card', 'collapse', 'color-palette', 'color-picker', 'command', 'compass', 'computer', 'connect', 'container', 'container-volume', 'contract', 'control-lun', 'copy', 'copy-to-clipboard', 'cpu', 'credit-card', 'crosshairs', 'crown', 'cursor-arrow', 'cursor-hand-click', 'cursor-hand-grab', 'cursor-hand-open', 'cursor-hand', 'cursor-move', 'curve-chart'
            ]
        },
        {
            label: '字母D开头',
            names: [
                'dashboard', 'data-cluster', 'date', 'deploy', 'design', 'details', 'devices', 'digital-signature', 'directory', 'disconnect', 'display', 'dna', 'document', 'dollar-bill', 'dollar', 'dot-circle', 'download-cloud', 'download', 'drag-handle-corner', 'drag-handle',
            ]
        },
        {
            label: '字母E开头',
            names: [
                'e-check', 'edit', 'ellipsis-horizontal', 'ellipsis-vertical', 'email', 'employee-group', 'employee', 'eraser', 'euro', 'event', 'expand-card', 'export', 'eye-hide', 'eye-show', 'eye'
            ]
        },
        {
            label: '字母F开头',
            names: [
                'face-happy', 'face-neutral', 'face-sad', 'factory', 'failure-standard', 'failure', 'favorite', 'file-group', 'file', 'filter-off', 'filter-on', 'firewall', 'first-aid-kit', 'fish', 'flag', 'flame', 'flask', 'floppy', 'folder-close', 'folder-open', 'font-size', 'forking', 'form', 'fuel',
            ]
        },
        {
            label: '字母G开头',
            names: [
                'gavel', 'grid-view', 'group'
            ]
        },
        {
            label: '字母H开头',
            names: [
                'hard-disk', 'hard-drive', 'hard-drives', 'hashtag', 'heart-broken', 'heart', 'heat-map', 'help-info', 'help-standard', 'highlighter', 'history', 'home', 'hourglass',
            ]
        },
        {
            label: '字母I开头',
            names: [
                'id-badge', 'image-gallery', 'image', 'import', 'info-standard', 'info', 'internet-of-things'
            ]
        },
        {
            label: '字母K开头',
            names: [
                'keyboard', 'key'
            ]
        },
        {
            label: '字母L开头',
            names: [
                'language', 'layers', 'library', 'lightbulb', 'list-view', 'list', 'login', 'logout'
            ]
        },
        {
            label: '字母M开头',
            names: [
                'map-marker', 'map', 'minus-circle', 'minus', 'mobile', 'moon', 'mouse', 'music-note'
            ]
        },
        {
            label: '字母N开头',
            names: [
                'new', 'network-globe', 'no-access'
            ]
        },
        {
            label: '字母O开头',
            names: [
                'organization'
            ]
        },
        {
            label: '字母P开头',
            names: [
                'paperclip', 'pause', 'peso', 'phone', 'pin', 'play', 'plugin', 'plus-circle', 'plus', 'pound', 'power', 'printer'
            ]
        },
        {
            label: '字母Q开头',
            names: [
                'qrcode'
            ]
        },
        {
            label: '字母R开头',
            names: [
                'recycle', 'redo', 'refresh', 'repeat', 'replay-all', 'replay-one', 'resize-down', 'resize-up', 'rewind', 'router', 'ruble', 'rupee'
            ]
        },
        {
            label: '字母S开头',
            names: [
                'savings', 'search', 'server', 'settings', 'share', 'shield-check', 'shield-times', 'shield', 'slider', 'star', 'step-forward', 'stop', 'storage', 'store', 'success-standard', 'success', 'sun', 'switch', 'sync'
            ]
        },
        {
            label: '字母T开头',
            names: [
                'table', 'tablet', 'tag', 'tags', 'target', 'terminal', 'thumbs-down', 'thumbs-up', 'times-circle', 'times', 'tools', 'trash', 'tree-view'
            ]
        },
        {
            label: '字母U开头',
            names: [
                'undo', 'unlock', 'upload-cloud', 'upload', 'user', 'users'
            ]
        },
        {
            label: '字母V开头',
            names: [
                'video-camera', 'video-gallery', 'volume-down', 'volume-mute', 'volume-up'
            ]
        },
        {
            label: '字母W开头',
            names: [
                'wallet', 'warning-standard', 'warning', 'wifi-off', 'wifi-on', 'window-close', 'window-max', 'window-min', 'window-restore', 'world'
            ]
        },
    ];

    protected iconSolid: boolean = false;

}
