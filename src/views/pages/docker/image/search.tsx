import React from "react"
import {Tag,Table,Tooltip} from "antd"

type imageSearch={
    reaload:boolean
    content:Array<{[name:string]:string}>
}

class DockerImagesSearch extends React.Component<imageSearch>{
    constructor(props:imageSearch){
        super(props)
    }

    private options() {
        return (
            <div className="options">
                <Tooltip title="添加镜像">
                    <span  className="icon-tianjia iconfont edit"/>
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
                <Table.Column title="操作" key="action" render={this.options} align="center"/>
            </Table>
        )
        // if(this.props.search){
        //     return this.searchResult() 
        // }
        // return <Empty description={<span>没有搜索动作</span>}/>
    }
}

export default DockerImagesSearch