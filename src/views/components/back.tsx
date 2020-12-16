import React from "react"
import {RouteComponentProps ,withRouter} from "react-router-dom"

interface backProps extends RouteComponentProps{
    title?:string,
    afterElement?:JSX.Element
}

class Back extends React.Component<backProps>{

    private goBack() {
        this.props.history.goBack
    }

    private after():JSX.Element {
        if(this.props.afterElement){
            return this.props.afterElement
        }
        return <span></span> 
    }
    
    /**
     * render
     */
    public render():JSX.Element {
        return (
            <div id="back" className="flex">
                <span className="iconfont icon-back" onClick={this.goBack}></span>
                <div className="flex-item">

                <span key="back-title" style={{lineHeight:"35px",cursor:'pointer'}} onClick={()=>this.goBack}>
                    {this.props.title ? this.props.title : ""}
                </span>

                    {this.after()}
                </div>
            </div>
        )
    }
}

export default withRouter(Back)