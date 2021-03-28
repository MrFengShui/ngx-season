export class LanguageEntity {

    code!: string;
    text!: string;

    constructor(code: string, text: string) {
        this.code = code;
        this.text = text;
    }

}

export class ModeEntity {

    mode!: string;
    text!: string;

    constructor(mode: string, text: string) {
        this.mode = mode;
        this.text = text;
    }

}

export class ThemeEntity {

    name!: string;
    text!: string;

    constructor(name: string, text: string) {
        this.name = name;
        this.text = text;
    }

}