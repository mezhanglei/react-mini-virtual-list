import React, { Component, useState, useEffect } from 'react';
import "./index.less";
import VirtrualList from '../../../src/index';


const Home: React.FC<any> = (props) => {
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
            <VirtrualList
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
};

export default Home;
