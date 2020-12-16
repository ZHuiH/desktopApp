
import React from "react"
import {Empty,Table,Tooltip} from "antd"
import {Link} from "react-router-dom"

type imagesInfo={
    content:Array<{[name:string]:string}>
}

class DockerImage extends React.Component<imagesInfo,any>{

    private options(text:any, record :any) {
        let imageInfo={id:record['IMAGE ID'],tag:record['TAG'],name:record['REPOSITORY']}
        return (
            <div className="options">
                <Tooltip title="运行新的容器">
                    <Link to={{pathname:"/docker/container/bulid",state:imageInfo}}>
                        <span style={{marginRight:"5px"}} className="icon-yunhang iconfont edit"/>
                    </Link>
                </Tooltip>
                <Tooltip title="删除镜像">
                    <span  className="icon-shanchu iconfont delete"/>
                </Tooltip>
            </div>
        )
    }
    /**
     * render
     */
    public render() {
        if(this.props.content.length >0){
            return (
                <Table  dataSource={this.props.content}>
                    <Table.Column title="名称" dataIndex="REPOSITORY" align="center"/>
                    <Table.Column title="标签" dataIndex="TAG" align="center"/>
                    <Table.Column title="镜像id" dataIndex="IMAGE ID" align="center"/>
                    <Table.Column title="大小" dataIndex="SIZE" align="center"/>
                    <Table.Column title="创建时间" dataIndex="CREATED" align="center"/>
                    <Table.Column title="操作" key="action" render={this.options} align="center"/>
                </Table>
            );
        }
        return <Empty/>
    }
}

export default DockerImage