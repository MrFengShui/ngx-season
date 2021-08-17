export const BOOLEAN_ADAPTOR = (target: boolean | string): boolean => {
    let flag: boolean;

    if (typeof target === 'string') {
        if (target === 'true') {
            flag = true;
        }

        if (target === 'false') {
            flag = false;
        }
    } else {
        flag = target;
    }

    return flag;
}