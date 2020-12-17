import React from "react"
import {Table} from "antd"

type networkInfo={
    content:Array<{[name:string]:string}>
}
class DockerNetwork extends React.Component<networkInfo>{
    /**
     * render
     */
    public render() {
        return (
            <Table dataSource={this.props.content} locale={{emptyText:"暂无数据"}}>
                <Table.Column title="网络id" dataIndex="NETWORK ID" align="center"/>
                <Table.Column title="名称" dataIndex="NAME" align="center"/>
                <Table.Column title="驱动" dataIndex="DRIVER" align="center"/>
                <Table.Column title="范围" dataIndex="SCOPE" align="center"/>
            </Table>
        )
    }
}

export default DockerNetwork