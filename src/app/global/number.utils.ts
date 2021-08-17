export const NUMBER_ADAPTOR = (target: number | string): number => {
    if (typeof target === 'string') {
        return Number(target).valueOf();
    } else {
        return target;
    }
}