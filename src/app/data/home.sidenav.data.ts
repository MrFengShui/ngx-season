import { RouterLinkEntity, SidenavRouterEntity } from "../models/sidenav.model";

const PUBLIC_LINKS: RouterLinkEntity[] = [
    { icon: 'headset', name: 'Audio', link: ['/home', 'ahome'] },
    { icon: 'tv', name: 'Video', link: ['/home', 'vhome'] },
    { icon: 'article', name: 'Article', link: ['/home', 'arhome'] },
    { icon: 'edit', name: 'Blog', link: ['/home', 'bhome'] },
    { icon: 'image', name: 'Gallery', link: ['/home', 'ghome'] }
];

const LIBRARY_LINKS: RouterLinkEntity[] = [
    { icon: 'history', name: 'History', link: ['/'] },
    { icon: 'watch_later', name: 'Watch Later', link: ['/'] },
    { icon: 'favorite', name: 'Favorite', link: ['/'] },
    { icon: 'workspaces', name: 'Workspace', link: ['/'] }
];

const PREFERENCE_LINKS: RouterLinkEntity[] = [
    { icon: 'settings', name: 'Settings', link: ['/'] },
    { icon: 'support', name: 'Support', link: ['/'] },
    { icon: 'bug_report', name: 'Bug Report', link: ['/'] },
    { icon: 'feedback', name: 'Feedback', link: ['/'] }
];

export const HOME_SIDENAV_ROUTER_ENTITIES: SidenavRouterEntity[] = [
    new SidenavRouterEntity(false, 'Public', PUBLIC_LINKS),
    new SidenavRouterEntity(true),
    new SidenavRouterEntity(false, 'Library', LIBRARY_LINKS),
    new SidenavRouterEntity(true),
    new SidenavRouterEntity(false, 'Subscription', []),
    new SidenavRouterEntity(true),
    new SidenavRouterEntity(false, 'Preference', PREFERENCE_LINKS)
];

