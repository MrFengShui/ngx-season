import { Component } from "@angular/core";

@Component({
    selector: 'ngx-sui-demo-alert-page',
    templateUrl: './alert.component.html'
})
export class DemoAlertPageComponent {

    protected longText: string = '用于构建 Firefox 扩展的技术在很大程度上与被基于 Chromium 内核的浏览器（例如谷歌 Chrome 浏览器，微软 Edge 浏览器，Opera 浏览器，Vivaldi 浏览器）所支持的扩展 API 所兼容。在大多数情况下，为基于 Chromium 内核浏览器而写的插件只需要少许修改就可以在 Firefox 中运行。';
    protected shortText: string = '扩展或者说是附加组件，拥有可以修改、增强浏览器的能力。用于 Firefox 的扩展，使用跨浏览器的 WebExtensions API 技术来构建。';
    protected subject: string = '浏览器扩展';

}