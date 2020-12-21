import React from "react"
import {Tag,Table,Tooltip,Spin} from "antd"

type imageSearch={
    reaload:boolean
    content:Array<{[name:string]:string}>
}

type imageSearchState={
    pull:Set<string>
    exist:Set<string>
}

class DockerImagesSearch extends React.Component<imageSearch,imageSearchState>{
    constructor(props:imageSearch){
        super(props)
        this.state={
            pull:new Set,
            exist:new Set
        }
    }

    private pullImage(name:string) {
        this.state.pull.add(name)
        this.setState({pull:this.state.pull})
        window.runCommand('docker','pull',name).then(res=>{
            this.state.pull.delete(name)
            this.state.exist.add(name)
            this.setState({pull:this.state.pull,exist:this.state.exist})
        })
    }

    private options(record: any) {
        let title="添加镜像"
        let element=<span  className="icon-tianjia iconfont edit" onClick={()=>this.pullImage(record['NAME'])}/>;
        if(this.state.pull.has(record['NAME'])){
            element=<Spin/>;
            title="镜像拉取中"
        }else if(this.state.exist.has(record['NAME'])){
            element=<span className="icon-rongqifuwuContainerServi iconfont reload" />;
            title="镜像已拉取"
        }

        return (
            <div className="options">
                <Tooltip title={title}>
                    {element}
                </Tooltip>
            </div>
        )
    }

    private whether(str:string,record:any) {
        if(str){
            return <Tag color="green">ok</Tag>
        }
        return <Tag color="magenta">no</Tag>
    }

    /**
     * render
     */
    public render() {
        return(
            <Table dataSource={this.props.content} locale={{emptyText:"暂无数据"}} loading={this.props.reaload}>
                <Table.Column title="名称" dataIndex="NAME" align="center"/>
                <Table.Column title="描述" dataIndex="DESCRIPTION" align="center"/>
                <Table.Column title="start" dataIndex="STARS" align="center"/>
                <Table.Column title="official" dataIndex="OFFICIAL" align="center" render={this.whether}/>
                <Table.Column title="automated" dataIndex="AUTOMATED" align="center" render={this.whether}/>
                <Table.Column title="操作" key="action" render={(value: any, record: any)=>this.options(record)} align="center"/>
            </Table>
        )
        // if(this.props.search){
        //     return this.searchResult() 
        // }
        // return <Empty description={<span>没有搜索动作</span>}/>
    }
}

export default DockerImagesSearch