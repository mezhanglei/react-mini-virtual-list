# react-mini-virtrual-list

English | [中文说明](./README_CN.md)

[![Version](https://img.shields.io/badge/version-1.0.1-green)](https://www.npmjs.com/package/react-mini-virtrual-list)

# Whath is virtrual list And how to use?

Used when loading a large amount of data at once, the theory is to calculate the index items to render based on the set size before rendering the data, and then render the list in the visual area, outside of which it will not be rendered.

# why choose it
If you're looking for a component that simply renders list data, this might be a good choice, as it provides an easy and convenient API and flexible control over the rendering of lists.
- [x] supports rendering within visual areas, while rendering outside visual areas will be unloaded
- [x] supports custom rendering `dataSources`
- [x] supports lists of horizontal and vertical scrolling directions
- [x] Custom preload margin and load location or index

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

## 属性说明

| name                          | type                  | defaultValue                                                         | description                                                                                                      |
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



