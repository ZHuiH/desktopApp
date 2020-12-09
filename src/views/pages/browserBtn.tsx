import React from "react"

class BrowserBtn extends React.Component{
    private close(){
        window.close()
    }
    /**
     * render
     */
    public render():JSX.Element {
        return (
            <div className="flex browser-btns">
                <div className="flex-item browser-btn-item browser-btn-close" onClick={this.close}>
                    <span className="iconfont icon-close"></span>
                    </div>
                <div className="flex-item  browser-btn-item">
                    <span className="iconfont icon-plus-minus"></span>
                </div>
            </div>
        )
    }
}

export default BrowserBtn