import React, { CSSProperties } from 'react';
import SizeAndPositionManager from './SizeAndPositionManager';
import { ALIGNMENT, DIRECTION } from "./utils/types";
/**
 * 虚拟列表:
 *    实现原理：在数据渲染之前根据设定的尺寸进行计算需要渲染的索引项，然后开始渲染
 *    适用场景: 一次性加载巨量数据时使用
 *    特点: 1. 暂时只支持可视区域内的渲染,可视区域外的将会被卸载
 *          2. 支持自定义渲染数据
 *          3. 支持横向和竖向的滚动
 */
export interface VirtualListProps {
    className?: string;
    style?: object;
    height?: number;
    width: string;
    scrollDirection: DIRECTION;
    limit?: number;
    dataSource: any[];
    itemSize: number | any[] | ((index: number) => number);
    estimatedItemSize: number;
    scrollOffset?: number;
    scrollToIndex?: number;
    scrollToAlignment: ALIGNMENT;
    overscanCount: number;
    onItemsRendered?: (start: number, end: number) => any;
    onScroll?: (e: Event, offset: number) => any;
    children: any;
}
export interface ListState {
    prevScrollDirection?: DIRECTION;
    prevScrollToIndex?: number | undefined;
    prevScrollOffset?: number | undefined;
    prevScrollToAlignment?: ALIGNMENT;
    prevEstimatedItemSize?: number;
    prevItemSize?: number | any[] | ((index: number) => number);
    prevDataSource?: any[];
    prevLimit?: number | undefined;
    scrollSize: number;
    canSetScroll: boolean;
}
declare class VirtualList extends React.Component<VirtualListProps, ListState> {
    styleCache: CSSProperties;
    wrap: any;
    constructor(props: VirtualListProps);
    static defaultProps: {
        overscanCount: number;
        scrollDirection: DIRECTION;
        scrollToAlignment: ALIGNMENT;
        estimatedItemSize: number;
        width: string;
    };
    itemSizeGetter: (itemSize: number | any[] | ((index: number) => number)) => (index: number) => any;
    manager: SizeAndPositionManager;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: VirtualListProps, prevState: ListState): void;
    static getDerivedStateFromProps(nextProps: VirtualListProps, prevState: ListState): {
        prevLimit: number | undefined;
        prevScrollDirection?: DIRECTION | undefined;
        prevScrollToIndex?: number | undefined;
        prevScrollOffset?: number | undefined;
        prevScrollToAlignment?: ALIGNMENT | undefined;
        prevEstimatedItemSize?: number | undefined;
        prevItemSize?: number | any[] | ((index: number) => number) | undefined;
        prevDataSource?: any[] | undefined;
        scrollSize: number;
        canSetScroll: boolean;
    } | {
        prevDataSource: any[];
        prevScrollDirection?: DIRECTION | undefined;
        prevScrollToIndex?: number | undefined;
        prevScrollOffset?: number | undefined;
        prevScrollToAlignment?: ALIGNMENT | undefined;
        prevEstimatedItemSize?: number | undefined;
        prevItemSize?: number | any[] | ((index: number) => number) | undefined;
        prevLimit?: number | undefined;
        scrollSize: number;
        canSetScroll: boolean;
    } | {
        prevItemSize: number | any[] | ((index: number) => number);
        prevScrollDirection?: DIRECTION | undefined;
        prevScrollToIndex?: number | undefined;
        prevScrollOffset?: number | undefined;
        prevScrollToAlignment?: ALIGNMENT | undefined;
        prevEstimatedItemSize?: number | undefined;
        prevDataSource?: any[] | undefined;
        prevLimit?: number | undefined;
        scrollSize: number;
        canSetScroll: boolean;
    } | {
        prevEstimatedItemSize: number;
        prevScrollDirection?: DIRECTION | undefined;
        prevScrollToIndex?: number | undefined;
        prevScrollOffset?: number | undefined;
        prevScrollToAlignment?: ALIGNMENT | undefined;
        prevItemSize?: number | any[] | ((index: number) => number) | undefined;
        prevDataSource?: any[] | undefined;
        prevLimit?: number | undefined;
        scrollSize: number;
        canSetScroll: boolean;
    } | {
        prevScrollToAlignment: ALIGNMENT;
        prevScrollDirection?: DIRECTION | undefined;
        prevScrollToIndex?: number | undefined;
        prevScrollOffset?: number | undefined;
        prevEstimatedItemSize?: number | undefined;
        prevItemSize?: number | any[] | ((index: number) => number) | undefined;
        prevDataSource?: any[] | undefined;
        prevLimit?: number | undefined;
        scrollSize: number;
        canSetScroll: boolean;
    } | {
        prevScrollOffset: number | undefined;
        prevScrollDirection?: DIRECTION | undefined;
        prevScrollToIndex?: number | undefined;
        prevScrollToAlignment?: ALIGNMENT | undefined;
        prevEstimatedItemSize?: number | undefined;
        prevItemSize?: number | any[] | ((index: number) => number) | undefined;
        prevDataSource?: any[] | undefined;
        prevLimit?: number | undefined;
        scrollSize: number;
        canSetScroll: boolean;
    } | {
        prevScrollToIndex: number | undefined;
        prevScrollDirection?: DIRECTION | undefined;
        prevScrollOffset?: number | undefined;
        prevScrollToAlignment?: ALIGNMENT | undefined;
        prevEstimatedItemSize?: number | undefined;
        prevItemSize?: number | any[] | ((index: number) => number) | undefined;
        prevDataSource?: any[] | undefined;
        prevLimit?: number | undefined;
        scrollSize: number;
        canSetScroll: boolean;
    } | {
        prevScrollDirection: DIRECTION;
        prevScrollToIndex?: number | undefined;
        prevScrollOffset?: number | undefined;
        prevScrollToAlignment?: ALIGNMENT | undefined;
        prevEstimatedItemSize?: number | undefined;
        prevItemSize?: number | any[] | ((index: number) => number) | undefined;
        prevDataSource?: any[] | undefined;
        prevLimit?: number | undefined;
        scrollSize: number;
        canSetScroll: boolean;
    } | null;
    recomputeSizes: (lastMeasure?: number) => void;
    findDOMNode(): any;
    scrollTo: (value: number) => void;
    getScrollForIndex: (index: number) => number;
    handleScroll: (event: Event) => void;
    getNodeScrollOffset: () => any;
    render(): JSX.Element;
}
export default VirtualList;
