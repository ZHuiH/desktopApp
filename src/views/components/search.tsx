import React from "react"

interface seachProps{
    search?:(result:string)=>void
    addonAfter?:string
    addonBefore?:string
    placeholder?:string
}

type seachState={
    searchValue:string
}

class Search extends React.Component<seachProps,seachState>{
    constructor(props:seachProps,state:seachState){
        super(props)
        this.state={searchValue:""}
    }
    private toSearch() {
        console.log('search',this.state.searchValue)
        if(this.props.search){
            this.props.search(this.state.searchValue)
        }
    }
    private afterIcon():JSX.Element {
        if(this.props.addonAfter){
            return <span className={`search-icon iconfont ${this.props.addonAfter}`} onClick={()=>this.toSearch()} ></span>
        }
        return <span></span>
    }

    private beforeIcon():JSX.Element {
        if(this.props.addonBefore){
            return <span className={`search-icon iconfont ${this.props.addonBefore}`} ></span>
        }
        return <span></span>
    }

    private keyUp(keyCode:number):void {
        if(keyCode==13){
            this.toSearch()
        }
    }
    /**
     * render
     */
    public render():JSX.Element {
        return (
            <div className="search">
                {this.beforeIcon()}
                <input 
                    type="text" className="search-input" 
                    placeholder={this.props.placeholder ? this.props.placeholder :"请输入"}
                    onChange={(elem)=>this.setState({searchValue:elem.target.value})}
                    onKeyUp={(event)=>this.keyUp(event.keyCode)}
                    />
                {this.afterIcon()}
            </div>
        )
    }
}

export default Search