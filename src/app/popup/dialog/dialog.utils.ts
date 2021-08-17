export enum OctopusDialogPosition {

    TOP_LEFT = 'top-left', TOP_RIGHT = 'top-right',
    BOTTOM_LEFT = 'bottom-left', BOTTOM_RIGHT = 'bottom-right',
    CENTER_CENTER = 'center-center'

}

export class OctopusDialogBaseConfig {

    hasMask?: boolean;
    maskClass?: string[] | string;
    baseClass?: string[] | string;

}

export class OctopusDialogSizeConfig {

    width?: string | number;
    height?: string | number;
    minWidth?: string | number;
    minHeight?: string | number;
    maxWidth?: string | number;
    maxHeight?: string | number;

}

export class OctopusDialogConfig {

    base?: OctopusDialogBaseConfig;
    position?: OctopusDialogPosition;
    size?: OctopusDialogSizeConfig;

}