export type OctopusAlignment = 'x' | 'y';

export type OctopusMountPoint = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export type OctopusColorPalette = 'primary' | 'accent' | 'success' | 'warning' | 'failure' | 'base';

export type OctopusFlexAlign = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';

export type OctopusOverflowXY = 'x' | 'y' | 'xy';

export type OctopusOverflowType = 'auto' | 'visible' | 'hidden' | 'clip' | 'scroll';

export type OctopusRatio = '1:1' | '4:3' | '3:4' | '16:9' | '9:16' | '16:10' | '10:16' | '21:9' | '9:21';

export type OctopusShadowBlur = 0 | 1 | 2 | 4 | 8 | 12 | 16;

export type OctopusShape = 'rect' | 'ring';

export type OctopusSidenavMode = 'over' | 'push' | 'side';

export type OctopusSpeed = 'fast' | 'normal' | 'slow';

export type OctopusTextAlign = 'left' | 'center' | 'right';

export type OctopusTabHeaderPosition = 'top' | 'bottom';

export const OCTOPUS_ALIGNMENTS: OctopusAlignment[] = ['x', 'y'];

export const OCTOPUS_COLOR_PALETTES: OctopusColorPalette[] = ['base', 'primary', 'accent', 'success', 'warning', 'failure'];

export const OCTOPUS_OVERFLOW_XYS: OctopusOverflowXY[] = ['x', 'y', 'xy'];

export const OCTOPUS_OVERFLOW_TYPES: OctopusOverflowType[] = ['auto', 'visible', 'hidden', 'clip', 'scroll'];

export const OCTOPUS_SHADOWS: OctopusShadowBlur[] = [0, 1, 2, 4, 8, 12, 16];

export const OCTOPUS_SHAPES: OctopusShape[] = ['rect', 'ring'];

export const OCTOPUS_TEXT_ALIGNMENTS: OctopusTextAlign[] = ['left', 'center', 'right'];

export const OCTOPUS_TAB_HEADER_POSITIONS: OctopusTabHeaderPosition[] = ['top', 'bottom'];
