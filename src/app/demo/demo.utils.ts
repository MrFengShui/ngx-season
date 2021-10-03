export class DemoRouterLinkModel {

    icon?: string;
    description?: string;
    paths?: string[];
    rotate?: number;
    subject?: string;
    text?: string;

}

export const CHART_LIST: DemoRouterLinkModel[] = [
    { icon: 'bar_chart', description: 'The bar chart\'s description is undefined.', paths: ['//octopus', 'chart', 'bar'], subject: 'Bar Chart', text: 'Bar Chart' },
    { icon: 'bubble_chart', description: 'The bubble chart\'s description is undefined.', paths: ['//octopus', 'chart', 'bubble'], subject: 'Bubble Chart', text: 'Bubble Chart' },
    { icon: 'stacked_line_chart', description: 'The line chart\'s description is undefined.', paths: ['//octopus', 'chart', 'line'], subject: 'Line Chart', text: 'Line Chart' },
    { icon: 'pie_chart', description: 'The pie chart\'s description is undefined.', paths: ['/octopus', 'chart', 'pie'], subject: 'Pie Chart', text: 'Pie Chart' },
    { icon: 'radar', description: 'The radar chart\'s description is undefined.', paths: ['/octopus', 'chart', 'radar'], subject: 'Radar Chart', text: 'Radar Chart' },
    { icon: 'scatter_plot', description: 'The scatter chart\'s description is undefined.', paths: ['/octopus', 'chart', 'scatter'], subject: 'Scatter Chart', text: 'Scatter Chart' },
    { icon: 'stacked_bar_chart', description: 'The stack chart\'s description is undefined.', paths: ['/octopus', 'chart', 'stack'], subject: 'Stack Chart', text: 'Stack Chart' },
    { icon: 'waterfall_chart', description: 'The waterfall chart\'s description is undefined.', paths: ['/octopus', 'chart', 'waterfall'], subject: 'Waterfall Chart', text: 'Waterfall Chart' },
    { icon: 'table_chart', description: 'The table chart\'s description is undefined.', paths: ['/octopus', 'chart', 'table'], subject: 'Table Chart', text: 'Table Chart' }
];

export const COMPONENT_LIST: DemoRouterLinkModel[] = [
    { icon: 'account_circle', description: 'The avatar\'s description is undefined.', paths: ['/octopus', 'component', 'avatar'], subject: 'Avatar', text: 'Avatar' },
    { icon: 'badge', description: 'The badge\'s description is undefined.', paths: ['/octopus', 'component', 'badge'], subject: 'Badge', text: 'Badge' },
    { icon: 'home', description: 'The breadcrumb\'s description is undefined.', paths: ['/octopus', 'component', 'breadcrumb'], subject: 'Breadcrumb', text: 'Breadcrumb' },
    { icon: 'smart_button', description: 'The button\'s description is undefined.', paths: ['/octopus', 'component', 'button'], subject: 'Button', text: 'Button' },
    { icon: 'calendar_today', description: 'The calendar\'s description is undefined.', paths: ['/octopus', 'component', 'calendar'], subject: 'Calendar', text: 'Calendar' },
    { icon: 'redeem', description: 'The card\'s description is undefined.', paths: ['/octopus', 'component', 'card'], subject: 'Card', text: 'Card' },
    { icon: 'view_carousel', description: 'The carousel\'s description is undefined.', paths: ['/octopus', 'component', 'carousel'], subject: 'Carousel', text: 'Carousel' },
    { icon: 'memory', description: 'The chip\'s description is undefined.', paths: ['/octopus', 'component', 'chip'], subject: 'Chip', text: 'Chip' },
    { icon: 'details', description: 'The detail\'s description is undefined.', paths: ['/octopus', 'component', 'detail'], subject: 'Detail', text: 'Detail' },
    { icon: 'safety_divider', description: 'The divider\'s description is undefined.', paths: ['/octopus', 'component', 'divider'], subject: 'Divider', text: 'Divider' },
    { icon: 'face', description: 'The icon\'s description is undefined.', paths: ['/octopus', 'component', 'icon'], subject: 'Icon', text: 'Icon' },
    { icon: 'list', description: 'The list\'s description is undefined.', paths: ['/octopus', 'component', 'list'], subject: 'List', text: 'List' },
    { icon: 'pages', description: 'The paginator\'s description is undefined.', paths: ['/octopus', 'component', 'paginator'], subject: 'Paginator', text: 'Paginator' },
    { icon: 'home', description: 'The placeholder\'s description is undefined.', paths: ['/octopus', 'component', 'placeholder'], subject: 'Placeholder', text: 'Placeholder' },
    { icon: 'home', description: 'The progress\'s description is undefined.', paths: ['/octopus', 'component', 'progress'], subject: 'Progress', text: 'Progress' },
    { icon: 'waves', description: 'The ripple\'s description is undefined.', paths: ['/octopus', 'component', 'ripple'], subject: 'Ripple', text: 'Ripple' },
    { icon: 'camera_roll', description: 'The roll\'s description is undefined.', paths: ['/octopus', 'component', 'roll'], subject: 'Roll', text: 'Roll' },
    { icon: 'star', description: 'The score\'s description is undefined.', paths: ['/octopus', 'component', 'score'], subject: 'Score', text: 'Score' },
    { icon: 'swipe', description: 'The slider\'s description is undefined.', paths: ['/octopus', 'component', 'slider'], subject: 'Slider', text: 'Slider' },
    { icon: 'table_view', description: 'The table\'s description is undefined.', paths: ['/octopus', 'component', 'table'], subject: 'Table', text: 'Table' },
    { icon: 'toggle_on', description: 'The toggle\'s description is undefined.', paths: ['/octopus', 'component', 'toggle'], subject: 'Toggle', text: 'Toggle' },
    { icon: 'account_tree', description: 'The tree\'s description is undefined.', paths: ['/octopus', 'component', 'tree'], subject: 'Tree', text: 'Tree' }
];

export const CONTAINER_LIST: DemoRouterLinkModel[] = [
    { icon: 'expand_circle_down', description: 'The expansion\'s description is undefined.', paths: ['/octopus', 'container', 'expansion'], subject: 'Expansion', text: 'Expansion' },
    { icon: 'apps', description: 'The navbar\'s description is undefined.', paths: ['/octopus', 'container', 'navbar'], subject: 'Navbar', text: 'Navbar' },
    { icon: 'home', description: 'The sidenav\'s description is undefined.', paths: ['/octopus', 'container', 'sidenav'], subject: 'Sidenav', text: 'Sidenav' },
    { icon: 'linear_scale', description: 'The stepper\'s description is undefined.', paths: ['/octopus', 'container', 'stepper'], subject: 'Stepper', text: 'Stepper' },
    { icon: 'tab', description: 'The tabbed\'s description is undefined.', paths: ['/octopus', 'container', 'tabbed'], subject: 'Tabbed', text: 'Tabbed' },
    { icon: 'home', description: 'The toolbar\'s description is undefined.', paths: ['/octopus', 'container', 'toolbar'], subject: 'Toolbar', text: 'Toolbar' }
];

export const FORM_LIST: DemoRouterLinkModel[] = [
    { icon: 'check_box', description: 'The checkbox\'s description is undefined.', paths: ['/octopus', 'form', 'checkbox'], subject: 'Checkbox', text: 'Checkbox' },
    { icon: 'password', description: 'The input\'s description is undefined.', paths: ['/octopus', 'form', 'input'], subject: 'Input', text: 'Input' },
    { icon: 'pin', description: 'The number\'s description is undefined.', paths: ['/octopus', 'form', 'number'], subject: 'Number', text: 'Number' },
    { icon: 'radio_button_checked', description: 'The radiobutton\'s description is undefined.', paths: ['/octopus', 'form', 'radio'], subject: 'RadioButton', text: 'RadioButton' },
    { icon: 'colorize', description: 'The picker\'s description is undefined.', paths: ['/octopus', 'form', 'picker'], subject: 'Picker', text: 'Picker' },
    { icon: 'date_range', description: 'The range\'s description is undefined.', paths: ['/octopus', 'form', 'range'], subject: 'Range', text: 'Range' },
    { icon: 'checklist', description: 'The select\'s description is undefined.', paths: ['/octopus', 'form', 'select'], subject: 'Select', text: 'Select' },
    { icon: 'toggle_on', description: 'The switch\'s description is undefined.', paths: ['/octopus', 'form', 'switch'], subject: 'Switch', text: 'Switch' }
];

export const LAYOUT_LIST: DemoRouterLinkModel[] = [
    { icon: 'view_compact', description: 'The border\'s description is undefined.', paths: ['/octopus', 'layout', 'border'], subject: 'Border', text: 'Border' },
    { icon: 'view_module', description: 'The grid\'s description is undefined.', paths: ['/octopus', 'layout', 'grid'], subject: 'Grid', text: 'Grid' },
    { icon: 'view_column', description: 'The hbox\'s description is undefined.', paths: ['/octopus', 'layout', 'hbox'], subject: 'HBox', text: 'HBox' },
    { icon: 'dashboard', description: 'The tile\'s description is undefined.', paths: ['/octopus', 'layout', 'tile'], subject: 'Tile', text: 'Tile' },
    { icon: 'view_column', description: 'The vbox\'s description is undefined.', paths: ['/octopus', 'layout', 'vbox'], subject: 'VBox', rotate: 90, text: 'VBox' }
];

export const POPUP_LIST: DemoRouterLinkModel[] = [
    { icon: 'home', description: 'The dialog\'s description is undefined.', paths: ['/octopus', 'popup', 'dialog'], subject: 'Dialog', text: 'Dialog' },
    { icon: 'home', description: 'The sheet\'s description is undefined.', paths: ['/octopus', 'popup', 'drawer'], subject: 'Drawer', text: 'Drawer' },
    { icon: 'menu', description: 'The menu\'s description is undefined.', paths: ['/octopus', 'popup', 'menu'], subject: 'Menu', text: 'Menu' },
    { icon: 'shield', description: 'The toast\'s description is undefined.', paths: ['/octopus', 'popup', 'toast'], subject: 'Toast', text: 'Toast' },
    { icon: 'pin_drop', description: 'The tooltip\'s description is undefined.', paths: ['/octopus', 'popup', 'tooltip'], subject: 'Tooltip', text: 'Tooltip' }
];