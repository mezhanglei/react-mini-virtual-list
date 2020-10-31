# react-mini-virtrual-list

English | [中文说明](./README_CN.md)

[![Version](https://img.shields.io/badge/version-1.0.0-green)](https://www.npmjs.com/package/react-mini-virtrual-list)

# Whath is virtrual list And how to use?

Use when you load a large amount of data at once, The theory is to calculate the index items to be rendered according to the set size before rendering the data, and then render the list

### install
```
npm install --save react-mini-virtrual-list
# or
yarn add react-mini-virtrual-list
```

### example
```javascript
import VirtrualList from 'react-mini-virtrual-list';
<VirtrualList
   width="auto"
   // scrollToAlignment="start"
   // scrollToIndex={30}
   scrollOffset={500}
   height={400}
   limit={200}
   dataSource={this.state.dataSource}
   renderItem={this.renderItem}
   onItemsRendered={this.renderOn}
   itemSize={50}
   className="VirtualList"
  />
```

# Feature
- [x] Render within the visual area is supported, and those outside the visual area will be unmounted
- [x] Support for custom rendering data sources
- [x] Supports horizontal and vertical scrolling
- [x] Lightweight and easy to use

## 属性说明

| 名称                          | 类型                  | 默认值                                                         | 描述                                                                                                      |
| ----------------------------- | --------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| estimatedItemSize             | `number`              | 50                                                             | Estimated size of list elements (scroll direction)                                                                                  |
| width和height                 | `number` / `string`   | -                                                              | The size of the visual area of the list (scroll direction)                                                                               |
| limit                         | `number`              | -                                                              | Maximum number of lazy loads                                                  |
| itemSize                      | `number` / `array` / `function` | -                                                    | Height (width) of list elements                                                                              |
| onScroll                      | `function`            | -                                                              | Scroll triggered function              |
| onItemsRendered               | `function`            | -                                                              | The function that is triggered when new data is loaded, `stopIndex` is the start and end indexes of the render |
| overscanCount                 | `number`              | `3`                                                            | Number of pre-loaded elements (three before and three after default)                                                                                         |
| renderItem                    | `function`            | -                                                              | Returns the rendered unit                                                                                          |
| dataSource                    | `Array`               | -                                                              | Customize the data source for rendering                                                                                          |
| scrollOffset                  | `number`              | -                                                              | Sets which location to scroll to                                                                                          |
| scrollToIndex                 | `number`              | -                                                              | To set which data to scroll to, choose between `scrollOffset`                                                                                         |
| scrollToAlignment             | `string`              | `start` / `center` / `end` / `auto`                                                                                                                   | In combination with 'scrollToIndex', specify the location of the index entry in the visible area 'start' starting area 'center' middle area 'end' tail area 'auto' automatically displays the location of 'scrollToIndex'                                                                                          |
| scrollDirection               | `string`              | `vertical` / `horizontal`                                                            | Sets the scrolling direction of the list. Default is' vertical '                                                                                          |

# Contribute
Thanks to the inspiration from React -virtualized and React -tiny- Virtrual list, you can go to support if you want to have more and more complex features!

# TODO-LIST
- [ ] Support typescript!



