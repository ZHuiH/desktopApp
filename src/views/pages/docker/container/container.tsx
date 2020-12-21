
import React from "react"
import {Table,Tooltip,Tag,Spin} from "antd"

type containerInfo={
    content:Array<{[name:string]:string}>
    reload:()=>void
}

type containerState={
    deleting:Set<string>
    restart:Set<string>
    stop:Set<string>
}

class DockerContainer extends React.Component<containerInfo,containerState>{

    constructor(props:containerInfo){
        super(props)
        this.state={
            deleting:new Set,
            stop:new Set,
            restart:new Set
        }
    }

    private delete(id:string) {
        this.state.deleting.add(id)
        this.setState({deleting:this.state.deleting})
        window.runCommand('docker','rm',id).then(res=>{
            this.props.reload()
        })
    }

    private restart(id:string) {
        this.state.restart.add(id)
        this.setState({restart:this.state.restart})
        window.runCommand('docker',id,'restart').then(res=>{
            this.props.reload()
        })
    }

    private stop(id:string) {
        this.state.stop.add(id)
        this.setState({stop:this.state.stop})
        window.runCommand('docker',id,'stop').then(res=>{
            this.props.reload()
        })
    }

    private options(record :any) {
        let id=record['CONTAINER ID']
        let action=<span className="icon-tingzhi iconfont stop" onClick={()=>this.stop(id)}/>
        let title="停止容器"
        if(!record['STATUS'].includes('Up')){
            title="重启重启"
            action=<span  className="icon-zhongqi iconfont reload" onClick={()=>this.restart(id)}/>
        }
        let deleteTitle="删除容器"
        let deleteIcon=<span className="icon-shanchu iconfont delete" onClick={()=>this.delete(id)}/>
        if(this.state.deleting.has(id)){
            deleteTitle="删除中"
            deleteIcon=<Spin/>;
        }
        return (
            <div className="options">
                <Tooltip title={title}>{action}</Tooltip>
                <Tooltip title={deleteTitle}>
                    {deleteIcon}
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
        return(
            <Table  dataSource={this.props.content} locale={{emptyText:"暂无数据"}}>
                <Table.Column title="容器id" dataIndex="CONTAINER ID" align="center" />
                <Table.Column title="镜像" dataIndex="IMAGE" align="center"/>
                <Table.Column title="运行命令" dataIndex="COMMAND" align="center"/>
                <Table.Column title="创建时间" dataIndex="CREATED" align="center"/>
                <Table.Column title="状态" dataIndex="STATUS" render={this.status} align="center"/>
                <Table.Column title="端口" dataIndex="PORTS" render={this.port} align="center"/>
                <Table.Column title="名称" dataIndex="NAMES"/>
                <Table.Column title="操作" key="action" render={(text:any, record :any)=>this.options(record)} align="center"/>
            </Table>
        )
    }
}

export default DockerContainer