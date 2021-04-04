
export const detectMouseState = (element: HTMLElement, delay: number, callback: any): void => {
    let task: any = undefined;
    element.onmousemove = () => {
        callback(true);
        clearTimeout(task);
        task = setTimeout(() => callback(false), delay);
    }
}