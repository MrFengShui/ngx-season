
export class RouterLinkEntity {

    icon!: string;
    name!: string;
    link!: string[];

    constructor(icon: string, name: string, link: string[]) {
        this.icon = icon;
        this.name = name;
        this.link = link;
    }

}

export class SidenavRouterEntity {

    flag!: boolean;
    name?: string;
    list?: RouterLinkEntity[];

    constructor(flag: boolean, name?: string, list?: RouterLinkEntity[]) {
        this.flag = flag;
        this.name = name;
        this.list = list;
    }

}