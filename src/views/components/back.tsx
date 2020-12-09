import React from "react"
import {RouteComponentProps ,withRouter} from "react-router-dom"

class Back extends React.Component<RouteComponentProps>{
    /**
     * render
     */
    public render():JSX.Element {
        return (
            <div id="back" onClick={this.props.history.goBack}>
                <span className="iconfont icon-back"></span>
            </div>
        )
    }
}

export default withRouter(Back)