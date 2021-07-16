import React, { Component, useState, useEffect } from 'react';
import "./index.less";
import VirtualList from '../../../src/index';


const Home: React.FC<any> = (props) => {
    const [dataSource, setDataSource] = useState([...new Array(100).keys()]);

    const renderOn = (startIndex, stopIndex) => {
        // console.log(startIndex, stopIndex);
    };

    const renderItem = (item: any, index: number) => {
        return (
            <div className="Row" style={item?.style} key={index}>
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
                onItemsRendered={renderOn}
                itemSize={100}
                className="VirtualList"
            >
                {
                    dataSource?.map((item, index) => {
                        return renderItem(item, index);
                    })
                }
            </VirtualList>
        </>
    );
};

export default Home;
