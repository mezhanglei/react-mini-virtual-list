/* Forked from react-virtualized and react-tiny-virtrual-list */
import { ALIGNMENT } from './constants';

export default class SizeAndPositionManager {

    constructor({ limit, dataSource, itemSizeGetter, estimatedItemSize }) {
        this.itemSizeGetter = itemSizeGetter;

        this.limit = Math.min(limit, dataSource?.length || 0);

        this.estimatedItemSize = estimatedItemSize;

        this.itemSizeAndPositionData = {};

        this.lastMeasuredIndex = -1;
    }

    updateConfig({ limit, itemSizeGetter, dataSource, estimatedItemSize }) {
        if (limit != null) {
            this.limit = Math.min(limit, dataSource?.length || 0);
        }

        if (estimatedItemSize != null) {
            this.estimatedItemSize = estimatedItemSize;
        }

        if (itemSizeGetter != null) {
            this.itemSizeGetter = itemSizeGetter;
        }
    }

    getLastMeasuredIndex() {
        return this.lastMeasuredIndex;
    }

    getSizeAndPositionForIndex(index) {
        if (index < 0 || index >= this.limit) {
            // throw Error(
            //     `Requested index ${index} is outside of range 0..${this.limit}`,
            // );
            console.warn(`Requested index ${index} is outside of range [0, ${this.limit}]`);
            return { offset: 0, size: 0 };
        }

        if (index > this.lastMeasuredIndex) {
            const lastMeasuredSizeAndPosition = this.getSizeAndPositionOfLastMeasuredItem();
            let offset =
                lastMeasuredSizeAndPosition.offset + lastMeasuredSizeAndPosition.size;

            for (let i = this.lastMeasuredIndex + 1; i <= index; i++) {
                const size = this.itemSizeGetter(i);

                if (size == null || isNaN(size)) {
                    throw Error(`Invalid size returned for index ${i} of value ${size}`);
                }

                this.itemSizeAndPositionData[i] = {
                    offset,
                    size,
                };

                offset += size;
            }

            this.lastMeasuredIndex = index;
        }

        return this.itemSizeAndPositionData[index];
    }

    getSizeAndPositionOfLastMeasuredItem() {
        return this.lastMeasuredIndex >= 0
            ? this.itemSizeAndPositionData[this.lastMeasuredIndex]
            : { offset: 0, size: 0 };
    }

    getTotalSize() {
        const lastMeasuredSizeAndPosition = this.getSizeAndPositionOfLastMeasuredItem();
        return (
            lastMeasuredSizeAndPosition.offset +
            lastMeasuredSizeAndPosition.size +
            (this.limit - this.lastMeasuredIndex - 1) * this.estimatedItemSize
        );
    }

    getUpdatedScrollForIndex({ align = ALIGNMENT.START, containerSize, currentOffset, targetIndex }) {
        if (containerSize <= 0 || this.limit <= 0) {
            return 0;
        }

        const sizeAndPosition = this.getSizeAndPositionForIndex(targetIndex);
        const maxScroll = sizeAndPosition.offset;
        const minScroll = maxScroll - containerSize + sizeAndPosition.size;

        let expectScroll;

        switch (align) {
            case ALIGNMENT.END:
                expectScroll = minScroll;
                break;
            case ALIGNMENT.CENTER:
                expectScroll = maxScroll - (containerSize - sizeAndPosition.size) / 2;
                break;
            case ALIGNMENT.START:
                expectScroll = maxScroll;
                break;
            default:
                expectScroll = Math.max(minScroll, Math.min(maxScroll, currentOffset));
        }

        const totalSize = this.getTotalSize();

        return Math.max(0, Math.min(totalSize - containerSize, expectScroll));
    }

    getVisibleRange({ containerSize, scrollSize, overscanCount }) {
        const totalSize = this.getTotalSize();

        if (totalSize === 0 || this.limit <= 0) {
            return {};
        }

        const maxOffset = scrollSize + containerSize;
        let start = this.findNearestItem(scrollSize);

        if (typeof start === 'undefined') {
            throw Error(`Invalid scrollSize ${scrollSize} specified`);
        }

        let stop = start;
        scrollSize = this.getSizeAndPositionForIndex(start).size + scrollSize;
        while (scrollSize < maxOffset && stop < this.limit - 1) {
            stop++;
            scrollSize += this.getSizeAndPositionForIndex(stop).size;
        }

        if (overscanCount) {
            start = Math.max(0, start - overscanCount);
            stop = Math.min(stop + overscanCount, this.limit - 1);
        }

        return {
            start,
            stop
        };
    }

    resetItem(index) {
        this.lastMeasuredIndex = Math.min(this.lastMeasuredIndex, index - 1);
    }

    findNearestItem(scrollSize) {
        if (isNaN(scrollSize)) {
            throw Error(`Invalid scrollSize ${scrollSize} specified`);
        }

        scrollSize = Math.max(0, scrollSize);

        const lastMeasuredSizeAndPosition = this.getSizeAndPositionOfLastMeasuredItem();
        const lastMeasuredIndex = Math.max(0, this.lastMeasuredIndex);

        if (lastMeasuredSizeAndPosition.offset >= scrollSize) {
            return this.binarySearch({
                high: lastMeasuredIndex,
                low: 0,
                scrollSize,
            });
        } else {
            return this.exponentialSearch({
                index: lastMeasuredIndex,
                scrollSize,
            });
        }
    }

    binarySearch({ low, high, scrollSize }) {
        let middle = 0;
        let currentOffset = 0;

        while (low <= high) {
            middle = low + Math.floor((high - low) / 2);
            currentOffset = this.getSizeAndPositionForIndex(middle).offset;

            if (currentOffset === scrollSize) {
                return middle;
            } else if (currentOffset < scrollSize) {
                low = middle + 1;
            } else if (currentOffset > scrollSize) {
                high = middle - 1;
            }
        }

        if (low > 0) {
            return low - 1;
        }

        return 0;
    }

    exponentialSearch({ index, scrollSize }) {
        let interval = 1;

        while (
            index < this.limit &&
            this.getSizeAndPositionForIndex(index).offset < scrollSize
        ) {
            index += interval;
            interval *= 2;
        }

        return this.binarySearch({
            high: Math.min(index, this.limit - 1),
            low: Math.floor(index / 2),
            scrollSize,
        });
    }
}
