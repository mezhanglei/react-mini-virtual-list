import * as React from 'react';
import SizeAndPositionManager from './SizeAndPositionManager';
import { isArray } from "../utils/type";
import {
    DIRECTION,
    SCROLL_CHANGE_REASON,
    marginProp,
    oppositeMarginProp,
    positionProp,
    scrollProp,
    sizeProp,
} from './constants';

const STYLE_WRAPPER = {
    overflow: 'auto',
    willChange: 'transform', // 告知浏览器该元素会有哪些变化的方法,提前做好对应的优化准备工作, 但会消耗内存
    WebkitOverflowScrolling: 'touch', // 当手指从触摸屏上移开，会保持一段时间的滚动, 非标准尽量不要用
};

const STYLE_INNER = {
    position: 'relative',
    width: '100%',
    minHeight: '100%',
};

const STYLE_ITEM = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
};

export default class VirtualList extends React.PureComponent {
    static defaultProps = {
        overscanCount: 3,
        scrollDirection: DIRECTION.VERTICAL,
        estimatedItemSize: 50,
        width: '100%',
    };

    itemSizeGetter = (itemSize) => (index) => {
        if (typeof itemSize === 'function') {
            return itemSize(index);
        }
        return Array.isArray(itemSize) ? itemSize[index] : itemSize;
    };

    sizeAndPositionManager = new SizeAndPositionManager({
        limit: this.props.limit,
        dataSource: this.props.dataSource,
        itemSizeGetter: this.itemSizeGetter(this.props.itemSize),
        estimatedItemSize: this.props.estimatedItemSize,
    });

    state = {
        scrollSize:
            this.props.scrollOffset ||
            (this.props.scrollToIndex != null &&
                this.getScrollForIndex(this.props.scrollToIndex)) ||
            0,
        scrollChangeReason: SCROLL_CHANGE_REASON.REQUESTED,
        _self: this
    };

    styleCache = {}

    static getDerivedStateFromProps(nextProps, prevState) {
        const { prevProps, _self } = prevState;
        if (prevProps) {
            const {
                estimatedItemSize,
                limit,
                dataSource,
                itemSize,
                scrollOffset,
                scrollToAlignment,
                scrollToIndex,
            } = prevProps;

            const itemPropsHaveChanged =
                nextProps.limit !== limit ||
                nextProps.dataSource?.toString() != dataSource?.toString() ||
                nextProps.itemSize !== itemSize ||
                nextProps.estimatedItemSize !== estimatedItemSize;

            if (nextProps.itemSize !== itemSize) {
                _self.sizeAndPositionManager.updateConfig({
                    itemSizeGetter: _self.itemSizeGetter(nextProps.itemSize),
                });
            }

            if (
                nextProps.limit !== limit ||
                nextProps.dataSource?.toString() != dataSource?.toString() ||
                nextProps.estimatedItemSize !== estimatedItemSize
            ) {
                _self.sizeAndPositionManager.updateConfig({
                    limit: nextProps.limit,
                    dataSource: nextProps.dataSource,
                    estimatedItemSize: nextProps.estimatedItemSize,
                });
            }

            if (itemPropsHaveChanged) {
                _self.recomputeSizes();
            }

            if (typeof nextProps.scrollOffset === 'number' &&
                (nextProps.scrollToAlignment !== scrollToAlignment || nextProps.scrollOffset !== scrollOffset || itemPropsHaveChanged)) {
                return {
                    scrollSize: nextProps.scrollOffset || 0,
                    scrollChangeReason: SCROLL_CHANGE_REASON.REQUESTED,
                    prevProps: nextProps
                };
            } else if (
                typeof nextProps.scrollToIndex === 'number' &&
                (nextProps.scrollToAlignment !== scrollToAlignment || nextProps.scrollToIndex !== scrollToIndex || itemPropsHaveChanged)
            ) {
                return {
                    scrollSize: _self.getScrollForIndex(
                        nextProps.scrollToIndex,
                        nextProps.scrollToAlignment,
                        nextProps.limit,
                        nextProps.dataSource
                    ),
                    scrollChangeReason: SCROLL_CHANGE_REASON.REQUESTED,
                    prevProps: nextProps
                };
            }
        }
        return {
            prevProps: nextProps
        };
    }

    componentDidMount() {
        this.rootNode.addEventListener('scroll', this.handleScroll, {
            passive: true,
        });

        const { scrollSize } = this.state;
        this.scrollTo(scrollSize);
    }

    componentDidUpdate(prePros, prevState) {
        const { scrollSize, scrollChangeReason } = this.state;
        const { dataSource } = this.props;
        if (
            (prevState.scrollSize !== scrollSize ||
                prePros?.dataSource?.toString() != dataSource?.toString()) &&
            scrollChangeReason === SCROLL_CHANGE_REASON.REQUESTED
        ) {
            this.scrollTo(scrollSize);
        }
    }

    componentWillUnmount() {
        this.rootNode.removeEventListener('scroll', this.handleScroll);
    }

    scrollTo(value) {
        const { scrollDirection } = this.props;

        this.rootNode[scrollProp[scrollDirection]] = value;
    }

    getScrollForIndex(
        index,
        scrollToAlignment = this.props.scrollToAlignment,
        limit = this.props.limit,
        dataSource = this.props.dataSource
    ) {
        const { scrollDirection } = this.props;
        limit = limit > dataSource?.length ? dataSource?.length : limit;
        if (index < 0 || index >= limit) {
            index = 0;
        }

        return this.sizeAndPositionManager.getUpdatedScrollForIndex({
            align: scrollToAlignment,
            containerSize: this.props[sizeProp[scrollDirection]],
            currentOffset: (this.state && this.state.scrollSize) || 0,
            targetIndex: index,
        });
    }

    recomputeSizes(startIndex = 0) {
        this.styleCache = {};
        this.sizeAndPositionManager.resetItem(startIndex);
    }

    handleScroll = (event) => {
        const { onScroll } = this.props;
        const scrollOffset = this.getNodeScrollOffset();

        if (
            scrollOffset < 0 ||
            this.state.scrollSize === scrollOffset ||
            event.target !== this.rootNode
        ) {
            return;
        }

        this.setState({
            scrollSize: scrollOffset,
            scrollChangeReason: SCROLL_CHANGE_REASON.OBSERVED,
        });

        if (typeof onScroll === 'function') {
            onScroll(scrollOffset, event);
        }
    };

    getNodeScrollOffset() {
        const { scrollDirection } = this.props;

        return this.rootNode[scrollProp[scrollDirection]];
    }

    getStyle(index) {
        const style = this.styleCache[index];

        if (style) {
            return style;
        }

        const { scrollDirection } = this.props;
        const {
            size,
            offset,
        } = this.sizeAndPositionManager.getSizeAndPositionForIndex(index);

        return (this.styleCache[index] = {
            ...STYLE_ITEM,
            [sizeProp[scrollDirection]]: size,
            [positionProp[scrollDirection]]: offset,
        });
    }

    render() {
        const {
            overscanCount,
            renderItem,
            dataSource,
            onItemsRendered,
            scrollDirection,
            style,
            width,
            height,
            className
        } = this.props;

        const { start, stop } = this.sizeAndPositionManager.getVisibleRange({
            containerSize: this.props[sizeProp[scrollDirection]] || 0,
            scrollSize: this.state.scrollSize,
            overscanCount,
        });

        const wrapperStyle = { ...STYLE_WRAPPER, ...style, height, width };
        const innerStyle = {
            ...STYLE_INNER,
            [sizeProp[scrollDirection]]: this.sizeAndPositionManager.getTotalSize(),
        };

        if (scrollDirection === DIRECTION.HORIZONTAL) {
            innerStyle.display = 'flex';
        }

        const items = isArray(dataSource) && dataSource.length && dataSource.map((item, index) => {
            if (typeof start !== 'undefined' && typeof stop !== 'undefined') {
                if (index >= start && index <= stop) {
                    const itemComponent = renderItem({
                        item,
                        index
                    });
                    const itemStyle = this.getStyle(index);
                    return React.cloneElement(React.Children.only(itemComponent), {
                        style: { ...itemComponent.props.style, ...itemStyle }
                    });
                }
            }
        }) || [];

        if (typeof start !== 'undefined' && typeof stop !== 'undefined') {
            if (typeof onItemsRendered === 'function') {
                onItemsRendered({
                    startIndex: start,
                    stopIndex: stop,
                });
            }
        }

        return (
            <div ref={node => this.rootNode = node} className={className} style={wrapperStyle}>
                <div style={innerStyle}>{items}</div>
            </div>
        );
    }
}
