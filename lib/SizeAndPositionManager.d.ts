import { ALIGNMENT } from './utils/types';
export interface ManagerProps {
    limit?: number;
    dataSource: any[];
    itemSizeGetter: (index: number) => number;
    estimatedItemSize: number;
}
export interface SizeAndPositionType {
    offset: number;
    size: number;
}
export interface UpdatedScrollProps {
    align: ALIGNMENT;
    containerSize: number;
    currentOffset: number;
    targetIndex: number;
}
export interface VisibleRangeProps {
    containerSize: number;
    scrollSize: number;
    overscanCount: number;
}
export interface BinarySearchProps {
    low: number;
    high: number;
    scrollSize: number;
}
export interface ExponentialSearchProps {
    index: number;
    scrollSize: number;
}
export default class SizeAndPositionManager {
    limit: number;
    itemSizeGetter: (index: number) => number;
    estimatedItemSize: number;
    itemSizeAndPositionData: {
        [index: number]: SizeAndPositionType;
    };
    lastMeasuredIndex: number;
    defaultSizeAndPosition: SizeAndPositionType;
    constructor({ limit, dataSource, itemSizeGetter, estimatedItemSize }: ManagerProps);
    updateConfig({ limit, itemSizeGetter, dataSource, estimatedItemSize }: ManagerProps): void;
    getLastMeasuredIndex(): number;
    getSizeAndPositionForIndex(index: number): SizeAndPositionType;
    getSizeAndPositionOfLastMeasuredItem(): SizeAndPositionType;
    getTotalSize(): number;
    getUpdatedScrollForIndex({ align, containerSize, currentOffset, targetIndex }: UpdatedScrollProps): number;
    getVisibleRange({ containerSize, scrollSize, overscanCount }: VisibleRangeProps): {
        start?: number;
        stop?: number;
    };
    resetItem(index: number): void;
    findNearestItem(scrollSize: number): number;
    binarySearch({ low, high, scrollSize }: BinarySearchProps): number;
    exponentialSearch({ index, scrollSize }: ExponentialSearchProps): number;
}
