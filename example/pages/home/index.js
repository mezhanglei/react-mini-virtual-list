import React, { Component, useState, useEffect } from 'react';
import "./index.less";
import { connect } from "react-redux";
import VirtualList from '../../../src/index';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    static defaultProps = {
        type: '首页'
    }

    componentDidMount() {
        // 生成dataSource数据
        this.setState({
            dataSource: [...new Array(100).keys()]
        });
    }

    renderItem = ({ item, index }) => {
        return (
            <div className="Row" key={index}>
                Row #{item}
            </div>
        );
    };

    renderOn = ({ startIndex, stopIndex }) => {
        // console.log(startIndex, stopIndex);
    }

    render() {
        return (
            <div>
                <div className="home">首页
                </div>
                <VirtualList
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
            </div>
        );
    }
};

export default Home;
