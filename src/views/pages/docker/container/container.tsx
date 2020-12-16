
import React from "react"
import {Empty,Table,Tooltip,Tag} from "antd"

type containerInfo={
    content:Array<{[name:string]:string}>
}

class DockerContainer extends React.Component<containerInfo,any>{

    private options(text:any, record :any) {
        let action=<span style={{marginRight:"5px"}} className="icon-tingzhi iconfont stop"/>
        let title="停止容器"
        if(!text['STATUS'].includes('Up')){
            title="重启重启"
            action=<span style={{marginRight:"5px"}} className="icon-zhongqi iconfont reload"/>
        }
        return (
            <div className="options">
                <Tooltip title={title}>{action}</Tooltip>
                <Tooltip title="删除容器">
                    <span  className="icon-shanchu iconfont delete"/>
                </Tooltip>
            </div>
        )
    }

    private port(port:string, record:any):JSX.Element {
        let tags:Array<JSX.Element>=[]
        port.split(',').forEach((item: string,index:number) => {
            let key=`${record['CONTAINER ID']}-port-${index}`;
            //没有就代表没有映射
            let temp=item.split('->')
            if(temp.length <=1){
                tags.push(<Tag key={key}>{temp[0]}</Tag>) 
            }else{
                tags.push(<Tooltip key={key} title={temp[0]}><Tag color="cyan">{temp[1]}</Tag></Tooltip>) 
            }
        });
        return <div>{tags}</div>
    }

    private status(status:string, record:any):JSX.Element  {
        if(!status.includes('Up')){
            return <Tooltip title={status}><Tag color="red">关闭</Tag></Tooltip>
        }
        return <Tooltip title={status}><Tag color="#87d068">开启</Tag></Tooltip>
    }

    /**
     * render
     */
    public render() {
        if(this.props.content.length >0){
            return(
                <Table  dataSource={this.props.content}>
                    <Table.Column title="容器id" dataIndex="CONTAINER ID" align="center" />
                    <Table.Column title="镜像" dataIndex="IMAGE" align="center"/>
                    <Table.Column title="运行命令" dataIndex="COMMAND" align="center"/>
                    <Table.Column title="创建时间" dataIndex="CREATED" align="center"/>
                    <Table.Column title="状态" dataIndex="STATUS" render={this.status} align="center"/>
                    <Table.Column title="端口" dataIndex="PORTS" render={this.port} align="center"/>
                    <Table.Column title="名称" dataIndex="NAMES"/>
                    <Table.Column title="操作" key="action" render={this.options} align="center"/>
                </Table>
            )
        }
        return <Empty/>
    }
}

export default DockerContainer