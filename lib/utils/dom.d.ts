/**
 * 添加事件监听
 * @param el 目标元素
 * @param event 事件名称
 * @param handler 事件函数
 * @param inputOptions 配置
 */
interface InputOptionsType {
    captrue?: boolean;
    once?: boolean;
    passive?: boolean;
}
export declare function addEvent(el: any, event: string, handler: (...rest: any[]) => any, inputOptions?: InputOptionsType): void;
/**
 * 移除事件监听
 * @param el 目标元素
 * @param event 事件名称
 * @param handler 事件函数
 * @param inputOptions 配置
 */
export declare function removeEvent(el: any, event: string, handler: (...rest: any[]) => any, inputOptions?: InputOptionsType): void;
/**
 * 设置滚动距离（兼容写法）
 * @param ele 目标元素
 * @param x 横轴坐标
 * @param y 纵轴坐标
 */
export declare function setScroll(ele: HTMLElement, x: number, y: number): void;
export {};
