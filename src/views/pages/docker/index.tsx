import React from "react"
import Back from "../../components/back"
import Search from "../../components/search"
import {Tabs} from "antd"
import DockerImage  from "./image/image";
import DockerImagesSearch  from "./image/search";
import DockerContainer  from "./container/container";
import DockerNetwork  from "./network/index";
import store from "../../store/index"
import {save} from "../../store/reducers"

enum tabKey{
    image="image",
    container="container",
    search="search",
    network="network"
}

type dockerState={
    container:Array<{[name:string]:string}>
    image:Array<{[name:string]:string}>
    searchImages:Array<{[name:string]:string}>
    network:Array<{[name:string]:string}>
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
            network:[],
            image:[],
            tabActive:tabKey.image,
            imageSearch:"",
            searchLoad:false,
        }
        this.getimage()
        this.getnetwork()
        this.getContainer()
    }
    /**
     * 获取镜像
     */
    private getimage() {
        window.runCommand('docker','images').then(res=>{
            store.dispatch(save('image', res.map((item:any)=>{
                return {
                    id:item['IMAGE ID'],
                    name:item['REPOSITORY'],
                    tag:item['TAG'],
                    size:item['SIZE']
                }
            })))
            this.setState({image:res})
        })
    }
    /**
     * 获取容器列表
     */
    private getContainer() {
        window.runCommand('docker','ps','-a').then(res=>{
            store.dispatch(save('container', res.map((item:any)=>{
                return {
                    id:item['CONTAINER ID'],
                    name:item['NAMES'],
                    image:item['IMAGE'],
                    command:item['COMMAND'],
                    status:item['STATUS'].includes('Up'),
                    ports:item['PORTS'].split(','),
                }
            })))
            this.setState({container:res})
        })
    }
    /**
     * 获取网络列表
     */
    private getnetwork() {
        window.runCommand('docker','network','ls').then(res=>{
            store.dispatch(save('network', res.map((item:any)=>{
                return({
                    id:item['NETWORK ID'],
                    name:item['NAME'],
                    scope:item['SCOPE'],
                    driver:item['DRIVER'],
                })
            })))
            this.setState({network:res})
        })
    }
    /**
     * 搜索镜像
     */
    private searchImages(name:string) {
        this.setState({searchLoad:true,tabActive:tabKey.search})
        window.runCommand('docker','search',name).then(res=>{
            console.log('search',res)
            this.setState({searchImages:res,searchLoad:false})
        })
    }
    /**
     * tab 变更
     */
    private tabChange(activeKey: string):void {
        this.setState({tabActive:activeKey as tabKey})
    }

    private topBar():JSX.Element {
        let element:JSX.Element=<span></span>
        let key=this.state.tabActive;
        switch(key){
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

                    <Tabs.TabPane tab="网络" key={tabKey.network}>
                        <DockerNetwork  content={this.state.network} />
                    </Tabs.TabPane>

                </Tabs>
            </div>
        )
    }
}

export default Docker