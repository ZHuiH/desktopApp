import React from 'react';
import {RouteComponentProps } from "react-router-dom"

type menu={
    title:string,
    url?:string,
    icon:string,
    component?: React.Component
}

class Home extends React.Component<RouteComponentProps>{
    
    private menuList:Array<menu>=[{
        title:"docker",
        icon:"icon-Docker",
        url:"/docker"
    },{
        title:"限制应用",
        icon:"icon-xianzhixiaofeiling"
    }]

    constructor(props:RouteComponentProps){
        super(props);
    }

    private createMenu() :Array<JSX.Element>{
        return this.menuList.map((item)=>{
            let className:string=`iconfont ${item.icon} menu-icon`
            let click:()=>void=()=>{
                console.log("???",item.url)
                if(item.url){
                    this.props.history.push(item.url)
                    console.log(this.props.history)
                }
                
            }
            return (
                <div key={item.icon+'_menu'} onClick={click} className="flex-item menu-item">
                    <span className={className}></span>
                    <p>{item.title}</p>
                </div>
            )
        })
    }
    /**
     * render
     */
    public render() {
        let memu= this.createMenu()
        return <div className="menu flex">{memu}</div>
    }
}

export default Home