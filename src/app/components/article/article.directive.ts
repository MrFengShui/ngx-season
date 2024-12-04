import { AfterViewInit, Component, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";

@Directive()
export abstract class NGXSeasonArticleWidgetDirective {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

}

@Directive({
    selector: 'h1[ngx-sui-Headline]'
})
export class NGXSeasonArticleHeadlineDirective extends NGXSeasonArticleWidgetDirective implements AfterViewInit {

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'headline');
    }

}

@Directive({
    selector: 'h2[ngx-sui-Title]'
})
export class NGXSeasonArticleTitleDirective extends NGXSeasonArticleWidgetDirective implements AfterViewInit {

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'title-1');
    }

}

@Directive({
    selector: 'h3[ngx-sui-Subtitle]'
})
export class NGXSeasonArticleSubtitleDirective extends NGXSeasonArticleWidgetDirective implements AfterViewInit {

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'subtitle-1');
    }

}

@Directive({
    selector: 'h4[ngx-sui-Heading]'
})
export class NGXSeasonArticleHeadingDirective extends NGXSeasonArticleWidgetDirective implements AfterViewInit {

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'heading');
    }

}

@Directive({
    selector: 'h5[ngx-sui-Subheading]'
})
export class NGXSeasonArticleSubheadingDirective extends NGXSeasonArticleWidgetDirective implements AfterViewInit {

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'subheading');
    }

}

@Directive({
    selector: 'p[ngx-sui-Paragraph]'
})
export class NGXSeasonArticleParaGraphDirective extends NGXSeasonArticleWidgetDirective implements OnChanges, AfterViewInit {

    @Input('paraIndent')
    set indent(indent: string | undefined | null) {
        this._indent = indent || undefined;
    }

    get indent(): string | undefined {
        return this._indent;
    }

    private _indent: string | undefined;

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'indent') this.setupParagraphIndent(changes[name].currentValue);
        }
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'body-1');

        this.setupParagraphIndent(this.indent);
    }

    protected setupParagraphIndent(indent: string | undefined): void {
        this._renderer.setStyle(this._element.nativeElement, 'text-indent', indent);
    }

}
