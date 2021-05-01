# react-mini-virtual-list

[English](./README.md) | 中文说明

[![Version](https://img.shields.io/badge/version-1.0.0-green)](https://www.npmjs.com/package/react-mini-virtual-list)

# 适用场景和原理

当一次性加载大量数据时使用，原理是在呈现数据之前根据设置的大小计算要呈现的索引项，然后在可视区域呈现列表,可视区域外则不会被渲染.
# 为什么要使用该库

如果你想找一个仅仅实现列表大数据渲染的组件,或许这是个不错的选择,提供了简易便利的api, 灵活的控制列表渲染效果.
- [x] 支持视觉区域内的渲染，而视觉区域外的渲染将被卸载
- [x] 支持自定义呈现数据源
- [x] 支持水平和垂直滚动方向的列表
- [x] 自定义预加载余量和加载的位置或索引


### 快速安装
```
npm install --save react-mini-virtual-list
# or
yarn add react-mini-virtual-list

旧的安装包为: react-mini-virtrual-list, 更改了名字
```

### 示例
```javascript
import VirtualList from 'react-mini-virtual-list';

// for example
const Home = () => {

    const [dataSource, setDataSource] = useState([...new Array(100).keys()]);

    const renderOn = (startIndex, stopIndex) => {
        // console.log(startIndex, stopIndex);
    };

    const renderItem = (item: any, index: number) => {
      return (
        <div className="Row" key={index}>
            Row #{item}
        </div>
      );
    };
    
    return (
        <>
            <VirtualList
                width="auto"
                // scrollToAlignment="start"
                // scrollToIndex={30}
                scrollOffset={500}
                height={400}
                limit={200}
                dataSource={dataSource}
                renderItem={renderItem}
                onItemsRendered={renderOn}
                itemSize={50}
                className="VirtualList"
            />
        </>
    );
}

```

## 属性说明

| 名称                          | 类型                  | 默认值                                                         | 描述                                                                                                      |
| ----------------------------- | --------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| estimatedItemSize             | `number`              | 50                                                             | 列表元素估算的大小(滚动方向上的)                                                                                  |
| width和height                 | `number` / `string`   | -                                                              | 列表可视区域的大小(滚动方向上的)                                                                               |
| limit                         | `number`              | -                                                              | 懒加载的最大条数                                                  |
| itemSize                      | `number` / `array` / `function` | -                                                    | 列表元素的高度（宽度）                                                                              |
| onScroll                      | `function`            | -                                                              | 滚动触发的函数              |
| onItemsRendered               | `function`            | -                                                              | 加载新的数据时触发的函数, `stopIndex`为渲染的起始和终点索引 |
| overscanCount                 | `number`              | `3`                                                            | 预加载的元素个数(默认前后各三个)                                                                                          |
| renderItem                    | `function`            | -                                                              | 返回渲染的单元                                                                                          |
| dataSource                    | `Array`               | -                                                              | 自定义渲染的数据源                                                                                          |
| scrollOffset                  | `number`              | -                                                              | 设置滚动到哪个位置                                                                                          |
| scrollToIndex                 | `number`              | -                                                              | 设置滚动到哪一条数据, 与 scrollOffset选其一                                                                                         |
| scrollToAlignment             | `string`              | `start` / `center` / `end` / `auto`                                                                                                                   | 与结合使用`scrollToIndex`, 指定索引项在可见区域的位置 `start`起始区域 `center`中间区域 `end`尾部区域 `auto`自动显示`scrollToIndex`位置所在区域                                                                                          |
| scrollDirection               | `string`              | `vertical` / `horizontal`                                                            | 设置列表的滚动方向, 默认`vertical`                                                                                          |

# Contribute
感谢来自react-virtualized以及react-tiny-virtual-list的灵感, 如果你想拥有更多更复杂的特性,可以前往支持!



