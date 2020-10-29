import React from "react";
import "./app.less";
// 引入路由组件
import RouteComponent from "@/routes/index.js";

// 路由组件
function MyRoutes() {
    return (
        <React.Suspense fallback={null}>
            <RouteComponent />
        </React.Suspense>
    );
}

// 根组件
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        isError: false,
    };
    componentDidMount() {
        this.setState({
            scrollDom: ReactDOM.findDOMNode(this)
        });
    }
    componentWillUnmount() { }

    render() {
        return (
            <div className="app">
                <MyRoutes />
            </div>
        );
    }
}

export default App;
