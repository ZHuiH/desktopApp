import React from "react"
import Back from "../../components/back"
import Search from "../../components/search"
import {Tabs} from "antd"
import DockerImage  from "./image/image";
import DockerImagesSearch  from "./image/search";
import DockerContainer  from "./container/container";

enum tabKey{
    image="image",
    container="container",
    search="search"
}

type dockerState={
    container:Array<{[name:string]:string}>
    image:Array<{[name:string]:string}>
    searchImages:Array<{[name:string]:string}>
    searchLoad:boolean
    tabActive:tabKey,
    imageSearch:string
}

class Docker extends React.Component<any,dockerState>{
    constructor(props:any){
        super(props)
        this.state={
            container:[],
            searchImages:[],
            image:[],
            tabActive:tabKey.image,
            imageSearch:"",
            searchLoad:false,
        }
        this.getimage()
        this.getContainer()
    }

    private getimage() {
        window.runCommand('docker','images').then(res=>{
            console.log('image',res)
            this.setState({image:res})
        })
    }

    private getContainer() {
        window.runCommand('docker','ps','-a').then(res=>{
            console.log('pa -a',res)
            this.setState({container:res})
        })
    }
    
    private searchImages(name:string) {
        this.setState({searchLoad:true,tabActive:tabKey.search})
        window.runCommand('docker','search',name).then(res=>{
            console.log('search',res)
            this.setState({searchImages:res,searchLoad:false})
        })
    }

    private tabChange(activeKey: string):void {
        this.setState({tabActive:activeKey as tabKey})
    }

    private topBar():JSX.Element {
        let element:JSX.Element=<span></span>
        switch(this.state.tabActive){
            case tabKey.search:
            case tabKey.image:
                element=<Search 
                            addonAfter="icon-sousuo" 
                            addonBefore="icon-rongqifuwuContainerServi" 
                            search={(s)=>this.searchImages(s)} 
                            placeholder="搜索镜像"
                        />
                break;
        }
        return element
    }

    /**
     * render
     */
    public render() {
        
        return(
            <div>
                <Back afterElement={this.topBar()}/>
                <Tabs size="large"  type="card" activeKey={this.state.tabActive} onTabClick={(activeKey: string, e:any)=>this.tabChange(activeKey)}>

                    <Tabs.TabPane tab="镜像搜索" key={tabKey.search}>
                        <DockerImagesSearch reaload={this.state.searchLoad} content={this.state.searchImages}/>
                    </Tabs.TabPane>

                    <Tabs.TabPane tab="镜像" key={tabKey.image}>
                        <DockerImage content={this.state.image}/>
                    </Tabs.TabPane>

                    <Tabs.TabPane tab="容器" key={tabKey.container}>
                        <DockerContainer content={this.state.container}/>
                    </Tabs.TabPane>

                </Tabs>
            </div>
        )
    }
}

export default Docker