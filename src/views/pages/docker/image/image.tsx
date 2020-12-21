
import React from "react"
import {Table,Tooltip} from "antd"
import {Link} from "react-router-dom"

type imagesInfo={
    reload:()=>void
    content:Array<{[name:string]:string}>
}

type imagesInfoState={
    deleting:Set<string>
}

class DockerImage extends React.Component<imagesInfo,imagesInfoState>{
    constructor(props:imagesInfo){
        super(props)
        this.state={
            deleting:new Set
        }
    }

    private delte(id:string) {
        this.state.deleting.add(id)
        this.setState({deleting:this.state.deleting})
        window.runCommand('docker','rmi',id).then(res=>{
            this.props.reload()
        })
    }
    private options(record :any) {
        let imageInfo={id:record['IMAGE ID'],tag:record['TAG'],name:record['REPOSITORY']}
        return (
            <div className="options">
                <Tooltip title="运行新的容器">
                    <Link to={{pathname:"/docker/container/bulid",state:imageInfo}}>
                        <span className="icon-yunhang iconfont edit"/>
                    </Link>
                </Tooltip>
                <Tooltip title="删除镜像">
                    <span  className="icon-shanchu iconfont delete" onClick={()=>this.delte(imageInfo.id)} />
                </Tooltip>
            </div>
        )
    }
    /**
     * render
     */
    public render() {
        return (
            <Table  dataSource={this.props.content} locale={{emptyText:"暂无数据"}}>
                <Table.Column title="名称" dataIndex="REPOSITORY" align="center"/>
                <Table.Column title="标签" dataIndex="TAG" align="center"/>
                <Table.Column title="镜像id" dataIndex="IMAGE ID" align="center"/>
                <Table.Column title="大小" dataIndex="SIZE" align="center"/>
                <Table.Column title="创建时间" dataIndex="CREATED" align="center"/>
                <Table.Column title="操作" key="action" render={(text:any, record :any)=>this.options(record)} align="center"/>
            </Table>
        );
    }
}

export default DockerImage